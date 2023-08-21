import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { authorisedMenu, menu } from "@/constants/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "@/hooks/useToast";
import Google from "@/assets/icons/Google";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
  const router = useRouter();

  const session = useSession();
  console.log(session);

  const { addToast } = useToast();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        addToast({
          title: callback.error,
          type: "error",
        });
      }

      if (callback?.ok && !callback?.error) {
        addToast({
          title: "Logged in successfully!",
          type: "success",
        });
        router.push("/admin/dashboard");
      }
    });
  };

  return (
    <div className="absolute flex z-10 2xl:max-w-screen-2xl max-w-screen-xl mx-auto w-full top-0 justify-between left-1/2 -translate-x-1/2 py-4">
      <Link href="/">
        <Image src="/logo.svg" alt="butterfly logo" width={150} height={100} />
      </Link>

      <ul className="flex items-center gap-8">
        {menu.map((item, index) => (
          <li key={index}>
            <Link className="text-[#23344a]" href={item.path}>
              {item.label}
            </Link>
          </li>
        ))}

        {router.pathname === "/" && (
          <Button
            className="bg-[#ffd069] text-[#23344a"
            onClick={() => router.push("/admin/dashboard")}
          >
            Launch
          </Button>
        )}

        {session.status === "unauthenticated" && router.pathname !== "/" ? (
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="rounded-lg bg-[#ffd069] hover:bg-[#23344a] hover:text-[#ffd069] text-[#23344a] px-3 py-2"
                >
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent className="p-10 rounded-lg">
                <DialogHeader>
                  <DialogTitle>Sign In</DialogTitle>
                  <DialogDescription>
                    Don`t have an account?{" "}
                    <Link href="" className="underline text-[#23344a]">
                      Create an account
                    </Link>
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <form onSubmit={loginUser}>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={data.email}
                        placeholder="Username"
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        required
                        className="outline-none block w-full rounded-t-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[#ffd069] sm:text-sm sm:leading-6 px-5 py-2"
                      />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={data.password}
                        placeholder="Password"
                        onChange={(e) =>
                          setData({ ...data, password: e.target.value })
                        }
                        className="outline-none block w-full rounded-b-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[#ffd069] sm:text-sm sm:leading-6 px-5 py-2"
                      />
                    </div>
                    <Link
                      href=""
                      className="underline my-4 block text-[#23344a]"
                    >
                      Forgot Password?
                    </Link>
                    <div>
                      <Button
                        type="submit"
                        className="flex w-full justify-center rounded-lg  px-3 py-2 text-sm font-semibold leading-6 "
                      >
                        Sign in
                      </Button>
                    </div>
                  </form>
                  <div className="flex items-center gap-3 my-6 justify-between">
                    <Separator className="w-full shrink" />
                    OR
                    <Separator className="w-full shrink" />
                  </div>
                  <button
                    onClick={() => signIn("google")}
                    className="flex w-full justify-between items-center rounded-lg py-2 text-sm font-semibold leading-6 text-[#23344a] ring-1 ring-inset ring-gray-300 px-5"
                  >
                    <Google className="flex flex-0 flex-grow-0 flex-shrink-0 flex-auto" />{" "}
                    <span className="flex-1 text-center">
                      Continue with Google
                    </span>
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          router.pathname !== "/" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8 ">
                    <AvatarImage
                      src={session.data?.user.image}
                      alt="profile image"
                    />
                    <AvatarFallback className="bg-[#ffd069] text-[#23344a]">
                      {session.data?.user.name?.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session.data?.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.data?.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        )}
      </ul>
    </div>
  );
};

export default Header;
