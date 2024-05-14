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

export function UserButton({ user }: { user: User }) {
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
          <form
            action={async () => {
              "use server";
              await signOut({ redirect: false });
              redirect(`${process.env.AUTH_OKTA_SIGNOUT_URL}`);
            }}
          >
            <button type="submit" className="flex w-full items-center">
              <LogOut className="mr-2 size-4" /> Sign Out
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
