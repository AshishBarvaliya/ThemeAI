import { getPurchaseHistory, getUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Button } from "./ui/button";
import { buyPupa } from "@/services/stripe";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function ProfilePurchases() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: purchases } = useQuery(
    ["user", "purchase-history"],
    getPurchaseHistory
  );
  const { data: user } = useQuery(["user", session?.user.id], () =>
    getUser(session?.user.id as string)
  );

  return (
    <div className="flex w-[55%] flex-col py-4 gap-4 overflow-y-auto px-4">
      <div className="flex items-center justify-between">
        <p className="text-md">
          Available prompts:
          <span className="font-bold px-1">{user?.pupa || 0}</span>
        </p>
        <Button
          size={"md"}
          onClick={() => {
            buyPupa().then(({ url }) => {
              router.push(url);
            });
          }}
        >
          Buy more
        </Button>
      </div>
      {purchases?.map((e) => (
        <div
          className="flex items-center text-md border-[0.5px] border-border p-3 px-4 bg-white"
          key={e.id}
        >
          A purchase of
          <span className="text-primary-foreground font-bold px-1">
            {e.pupa}
          </span>
          promts was made on
          <span className="text-secondary-foreground px-1">
            {moment().format("MMMM Do YYYY, h:mm a")}
          </span>
        </div>
      ))}
    </div>
  );
}
