import avatarPlaceholder from "@/assets/images/avatar_placeholder.png";
import { LogOut, Settings } from "lucide-react";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";

interface UserButtonProps {
  user: User;
}

export function UserButton({ user }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="flex-none rounded-full">
          <Image
            src={user.image || avatarPlaceholder}
            alt="User profile picture"
            width={50}
            height={50}
            className="aspect-square rounded-full bg-background object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name || "User"}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          {/* TODO: Show this only for admins */}
          {/* <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <Lock className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          {/* Client-side
          <button
            className="flex w-full items-center"
            onClick={() => {
              signOut({
                redirect: false,
              });
              redirect(
                `${process.env.NEXT_PUBLIC_AUTH_OKTA_ISSUER}/login/signout?fromURI=${process.env.NEXT_PUBLIC_SITE_URL}`
              );
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </button> */}
          {/* Server-side */}
          <form
            action={async () => {
              "use server";
              await signOut({
                redirect: false,
              }).then(() => {
                redirect(
                  `${process.env.NEXT_PUBLIC_AUTH_OKTA_ISSUER}/login/signout?fromURI=${process.env.NEXT_PUBLIC_SITE_URL}`
                );
              });
            }}
          >
            <button type="submit" className="flex w-full items-center">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
