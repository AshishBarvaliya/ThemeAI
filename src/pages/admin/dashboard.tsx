import { buyPupa, managePurchase } from "@/services/stripe";
import { getThemeById, getThemes, postTheme } from "@/services/theme";
import { toggleThemeLike, toggleThemeSave } from "@/services/toggle";
import { getUser, toggleFollowing } from "@/services/user";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="relative top-24">
      Dashboard
      <button className="m-6" onClick={postTheme}>
        Post Theme
      </button>
      <button className="m-6" onClick={getThemes}>
        Get All Theme
      </button>
      <button
        className="m-6"
        onClick={() => getThemeById("clli96o7z0001t7nk3eom3cjh")}
      >
        Get Theme By Id
      </button>
      <button
        className="m-6"
        onClick={() => getUser("clle7kyd60000t7vgwys43514")}
      >
        Get User
      </button>
      <button
        className="m-6"
        onClick={() => toggleThemeLike("clli96o7z0001t7nk3eom3cjh")}
      >
        Toggle Like
      </button>
      <button
        className="m-6"
        onClick={() => toggleThemeSave("clli96o7z0001t7nk3eom3cjh")}
      >
        Toggle Save
      </button>
      <button className="m-6" onClick={() => buyPupa()}>
        Buy Pupa
      </button>
      <button
        className="m-6"
        onClick={() => {
          if (router.query.session_id) {
            console.log(router.query.session_id);
            managePurchase(router.query.session_id as string);
          }
        }}
      >
        Manage Purchase
      </button>
      <button
        className="m-6"
        onClick={() => toggleFollowing("clli5kos500007ou0ghjzrko9")}
      >
        Toggle Following
      </button>
    </div>
  );
}
