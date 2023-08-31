import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { landingMenu } from "@/constants/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LoginDialog } from "./login-dialog";
import Logo from "@/assets/svgs/logo";
import {
  VerificationDialog,
  VerificationDialogProps,
} from "./verification-dialog";
import { RegisterDialog } from "./register-dialog";
import { UserProfileDialog } from "./user-profile-dialog";

const Header = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [loginOpen, setLoginOpen] = useState(false);
  const [singupOpen, setSingupOpen] = useState(false);
  const [userProfileOpen, setUserProfileOpen] = useState(false);

  const [verifyDialogState, setVerifyDialogState] = useState<{
    open: boolean;
    type: VerificationDialogProps["type"];
  }>({
    open: false,
    type: "pleaseVerify",
  });

  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (router.asPath === "/themes?signin=1") {
      setLoginOpen(true);
      router.push("/themes", undefined, { shallow: true });
    } else if (router.asPath === "/themes?signup=1") {
      setSingupOpen(true);
      router.push("/themes", undefined, { shallow: true });
    } else if (router.asPath === "/themes?verify=0&error=invalid") {
      setVerifyDialogState({
        open: true,
        type: "invalid",
      });
    } else if (router.asPath === "/themes?verify=0&error=expired") {
      setVerifyDialogState({
        open: true,
        type: "expired",
      });
    } else if (router.asPath === "/themes?verify=0&error=verified") {
      setVerifyDialogState({
        open: true,
        type: "alreadyVerified",
      });
    } else if (router.asPath === "/themes?verify=1") {
      setVerifyDialogState({ open: true, type: "verified" });
    }
  }, [router]);

  useEffect(() => {
    if (
      status === "authenticated" &&
      !session?.user.isActived &&
      router.asPath === "/themes"
    ) {
      setVerifyDialogState({ open: true, type: "pleaseVerify" });
    }
  }, [status]);

  return (
    <div className="absolute max-w-screen-2xl flex border-b border-border w-full justify-between py-4 px-7 h-[96px]">
      <Link href="/themes" className="flex">
        <Image src="/logo.png" alt="butterfly logo" width={150} height={62} />
        <Logo />
      </Link>

      <ul className="flex items-center gap-8">
        {router.pathname === "/" && (
          <>
            {landingMenu.map((item, index) => (
              <li key={index}>
                <Link
                  className="text-primary-foreground text-lg"
                  href={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <Button className="" onClick={() => router.push("/themes")}>
              Launch
            </Button>
          </>
        )}
        {!isAuthenticated && router.pathname !== "/" ? (
          <div>
            <Button type="button" onClick={() => setLoginOpen(true)}>
              Sign In
            </Button>
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
                      src={session?.user.image}
                      alt="profile image"
                    />
                    <AvatarFallback className="bg-[#ffd069] text-[#23344a]">
                      {session?.user.name?.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {session?.user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session?.user.email}
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
      <LoginDialog
        open={loginOpen}
        setOpen={setLoginOpen}
        setSingupOpen={setSingupOpen}
      />
      <RegisterDialog open={singupOpen} setOpen={setSingupOpen} />
      <VerificationDialog
        open={verifyDialogState.open}
        setVerifyDialogState={setVerifyDialogState}
        type={verifyDialogState.type}
        setLoginOpen={setLoginOpen}
        setUserProfileOpen={setUserProfileOpen}
      />
      <UserProfileDialog open={userProfileOpen} setOpen={setUserProfileOpen} />
    </div>
  );
};

export default Header;
