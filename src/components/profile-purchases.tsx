import { getPurchaseHistory, getUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Button } from "./ui/button";
import { buyPupa } from "@/services/stripe";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { EmptyState } from "./empty-state";
import { ShoppingBag } from "lucide-react";

export default function ProfilePurchases() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: purchases, isLoading: isLoadingPurchases } = useQuery(
    ["user", "purchase-history"],
    getPurchaseHistory
  );
  const { data: user } = useQuery(["user", session?.user.id], () =>
    getUser(session?.user.id as string)
  );

  return (
    <div className="flex w-full xl:w-[55%] h-full flex-col py-4 gap-4 overflow-y-auto px-4 min-h-[300px] min-w-[650px]">
      <div className="flex items-center lg:justify-between">
        <p className="text-base">
          Available Credits:
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
      {isLoadingPurchases ? (
        <div className="flex justify-center items-center flex-1 h-full">
          Loading...
        </div>
      ) : purchases?.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag className="w-6 h-6" />}
          title="You havn't made any purchases yet!"
        />
      ) : (
        purchases?.map((e) => (
          <div
            className="flex items-center text-base border-[0.5px] border-border p-3 px-4 bg-white"
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
        ))
      )}
    </div>
  );
}
