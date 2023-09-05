import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name?: string;
      email: string;
      image?: string;
      id: string;
      pupa: number;
      isActived?: Date;
      location?: string;
      title?: string;
      organization?: string;
      avatar?: string;
    };
    expires: string;
  }
}
