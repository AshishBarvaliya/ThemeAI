import { getThemeById, getThemes, postTheme } from "@/services/theme";
import { toggleThemeLike, toggleThemeSave } from "@/services/toggle";
import { getUser } from "@/services/user";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="mt-40">
      Dashboard
      <button className="m-6" onClick={() => signOut()}>
        Sign Out
      </button>
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
        onClick={() =>
          toggleThemeLike(
            "clle7kyd60000t7vgwys43514",
            "clli96o7z0001t7nk3eom3cjh"
          )
        }
      >
        Toggle Like
      </button>
      <button
        className="m-6"
        onClick={() =>
          toggleThemeSave(
            "clle7kyd60000t7vgwys43514",
            "clli96o7z0001t7nk3eom3cjh"
          )
        }
      >
        Toggle Save
      </button>
    </div>
  );
}
