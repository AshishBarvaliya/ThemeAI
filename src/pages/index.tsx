import { signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <p>Hi {session?.user?.email}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </main>
  );
}
