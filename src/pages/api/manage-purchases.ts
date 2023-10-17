import stripe from "@/config/stripe";
import db from "@/db";
import {
  purchases as purchasesSchema,
  users as usersSchema,
} from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const N_PUPA = process.env.PUPU_PER_PURCHASE || "0";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: "Session not found" });
  }

  const existingSession = await db.query.purchases.findFirst({
    where: eq(purchasesSchema.stripeSessionId, sessionId),
  });

  if (existingSession) {
    return res.status(400).json({ error: "Session already exists" });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      res.status(400).json({ error: "Session not found" });
      return;
    }
    if (!session.metadata?.userId) {
      res.status(400).json({ error: "Customer not found" });
      return;
    }

    await db.insert(purchasesSchema).values({
      id: createId(),
      stripeSessionId: session.id,
      stripeCustomerId: session.customer as string,
      userId: session.metadata?.userId,
      pupa: Number(N_PUPA),
    });

    const currentUser = await db.query.users.findFirst({
      where: eq(usersSchema.id, session.metadata?.userId),
      columns: {
        pupa: true,
      },
    });

    if (currentUser) {
      await db
        .update(usersSchema)
        .set({
          pupa: Number(currentUser.pupa) + Number(N_PUPA),
        })
        .where(eq(usersSchema.id, session.metadata?.userId));
    }

    res.status(200).send("Purchase saved successfully");
  } catch (error) {
    return res.status(500).json({ error: "Failed to save purchase" });
  }
}
