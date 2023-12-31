import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { eq } from "drizzle-orm";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcrypt";
import db from "@/db";
import { users } from "@/db/schema";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Please enter an email and password");
        }

        if (!credentials.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));

        if (!user.length) {
          throw new Error("Incorrect password or email");
        }

        if (!user[0].hashedPassword) {
          throw new Error(
            "Please use the 'Login with Google' option as you've previously signed up using it"
          );
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user[0].hashedPassword
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password or email");
        }

        return user[0];
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/themes?signin=1",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user, session, trigger, account }: any) => {
      if (trigger === "update") {
        await db
          .update(users)
          .set({
            avatar: session.avatar,
            title: session.title,
            organization: session.organization,
            location: session.location,
          })
          .where(eq(users.id, token.id))
          .then(() => {
            token.avatar = session.avatar;
            token.title = session.title;
            token.organization = session.organization;
            token.location = session.location;
          });
      }

      if (user && account) {
        if (account?.provider === "google") {
          const additionalUserData = await db.query.users.findFirst({
            where: eq(users.email, user.email),
          });

          return {
            ...token,
            id: additionalUserData?.id,
            pupa: additionalUserData?.pupa,
            isActived: additionalUserData?.isActived,
            location: additionalUserData?.location,
            organization: additionalUserData?.organization,
            title: additionalUserData?.title,
            avatar: additionalUserData?.avatar,
            provider: account.provider,
          };
        } else {
          return {
            ...token,
            id: user.id,
            pupa: user.pupa,
            isActived: user.isActived,
            location: user.location,
            organization: user.organization,
            title: user.title,
            avatar: user.avatar,
            provider: account.provider,
          };
        }
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          pupa: token.pupa,
          isActived: token.isActived,
          location: token.location,
          organization: token.organization,
          title: token.title,
          avatar: token.avatar,
          provider: token.provider,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
