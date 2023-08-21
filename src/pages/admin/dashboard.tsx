import { buyPupa, managePurchase } from "@/services/stripe";
import { getThemeById, getThemes, postTheme } from "@/services/theme";
import { toggleThemeLike, toggleThemeSave } from "@/services/toggle";
import { getUser, toggleFollowing } from "@/services/user";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="backdrop-blur-2xl bg-white/40 min-h-screen">
      <div className="relative top-24 2xl:max-w-screen-2xl max-w-screen-xl mx-auto flex">
        <div className="basis-1/6 ">sidebar</div>
        <div className="basis-5/6">
          Dashboard
          <button onClick={postTheme}>Post Theme</button>
          <button onClick={getThemes}>Get All Theme</button>
          <button onClick={() => getThemeById("clli96o7z0001t7nk3eom3cjh")}>
            Get Theme By Id
          </button>
          <button onClick={() => getUser("clle7kyd60000t7vgwys43514")}>
            Get User
          </button>
          <button onClick={() => toggleThemeLike("clli96o7z0001t7nk3eom3cjh")}>
            Toggle Like
          </button>
          <button onClick={() => toggleThemeSave("clli96o7z0001t7nk3eom3cjh")}>
            Toggle Save
          </button>
          <button onClick={() => buyPupa()}>Buy Pupa</button>
          <button
            onClick={() => {
              if (router.query.session_id) {
                console.log(router.query.session_id);
                managePurchase(router.query.session_id as string);
              }
            }}
          >
            Manage Purchase
          </button>
          <button onClick={() => toggleFollowing("clli5kos500007ou0ghjzrko9")}>
            Toggle Following
          </button>
        </div>
      </div>
    </div>
  );
}
