import stripe from "@/config/stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import db from "@/db";
import { users as usersSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

const priceId = process.env.STRIPE_PRICE_ID;
const url = process.env.NEXTAUTH_URL;

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
    const user = await db.query.users.findFirst({
      where: eq(usersSchema.id, session.user.id),
      columns: {
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

        await db
          .update(usersSchema)
          .set({
            stripeCustomerId: customer.id,
          })
          .where(eq(usersSchema.id, session.user.id));

        stripeCustomerId = customer.id;
      } catch (error) {
        return res.status(500).json({ error: "Failed to create customer" });
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
        success_url: `${url}/api/manage-purchases?session={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/themes`,
      });

      res.status(200).json({ url: stripeSession.url });
    } catch (error) {
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
