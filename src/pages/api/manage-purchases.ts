import { prisma } from "@/config/db";
import stripe from "@/config/stripe";
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

  const existingSession = await prisma.purchase.findMany({
    where: { stripeSessionId: sessionId },
  });

  if (existingSession.length > 0) {
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

    const user = await prisma.user.findUnique({
      where: { id: session.metadata?.userId },
      select: {
        id: true,
        pupa: true,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Not a valid prisma user not found" });
    }

    await prisma.purchase.create({
      data: {
        stripeSessionId: session.id,
        stripeCustomerId: session.customer as string,
        userId: session.metadata?.userId,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        pupa: user.pupa + parseInt(N_PUPA),
      },
    });

    res.status(200).send("Purchase saved successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save purchase" });
  }
}
