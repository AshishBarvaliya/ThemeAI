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
      isActived?: boolean;
      location?: string;
      title?: string;
      organization?: string;
      avatar?: string;
      provider?: string;
    };
    expires: string;
  }
}
