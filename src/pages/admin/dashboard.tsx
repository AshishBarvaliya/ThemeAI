import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div>
      dashboard <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
