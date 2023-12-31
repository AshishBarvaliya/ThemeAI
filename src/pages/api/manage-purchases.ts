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
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sessionId = req.query.session as string;

  if (!sessionId) {
    return res.redirect("/themes?payment=0&error=invalid_session");
  }

  const existingSession = await db.query.purchases.findFirst({
    where: eq(purchasesSchema.stripeSessionId, sessionId),
  });

  if (existingSession) {
    return res.redirect("/themes?payment=0&error=session_exists");
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.redirect("/themes?payment=0&error=invalid_session");
    }
    if (!session.metadata?.userId) {
      return res.redirect("/themes?payment=0&error=invalid_session");
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
      return res.redirect("/themes?payment=1");
    } else {
      return res.redirect("/themes?payment=0&error=server");
    }
  } catch (error) {
    return res.redirect("/themes?payment=0&error=server");
  }
}
