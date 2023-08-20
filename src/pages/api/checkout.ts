import stripe from "@/config/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "@/config/db";

const priceId = process.env.STRIPE_PRICE_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    let stripeCustomerId = "";
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        stripeCustomerId: true,
      },
    });
    if (user?.stripeCustomerId) {
      stripeCustomerId = user?.stripeCustomerId;
    } else {
      try {
        const customer = await stripe.customers.create({
          email: session.user.email,
          metadata: {
            userId: session.user.id,
          },
        });

        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            stripeCustomerId: customer.id,
          },
          select: {
            id: true,
            name: true,
            email: true,
            stripeCustomerId: true,
          },
        });
        stripeCustomerId = customer.id;
      } catch (error) {
        res.status(500).json({ error: "Failed to create customer" });
      }
    }

    try {
      const stripeSession = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          userId: session.user.id,
        },
        customer: stripeCustomerId,
        mode: "payment",
        success_url:
          "http://localhost:3000/admin/dashboard?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:3000/admin/dashboard",
      });

      res.status(200).json({ url: stripeSession.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
}
