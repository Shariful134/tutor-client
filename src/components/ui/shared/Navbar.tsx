"use client";
import tutorlin from "@/app/assest/images/tutorlin-logo.png";

import { LogOut } from "lucide-react";
import { Button } from "../button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/authService";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constant";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading } = useUser();
  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };
  return (
    <header className="border-b bg-gray-200 border-gray-300 w-full fixed z-1">
      <div className="container flex justify-between  items-center h-16 px-10 mx-auto">
        <h1 className="text-2xl font-black flex items-center">
          <Image
            src={tutorlin}
            width={100}
            height={100}
            alt="tutorlink"
          ></Image>
        </h1>
        {/* <div className="max-w-md flex-grow">
          <input
            type="text"
            placeholder="Search for products"
            className=" w-full max-w-6xl rounded-full border border-gray-400 px-5 py-2"
          />
        </div> */}
        <nav className="flex gap-4 items-center">
          <Link
            className={
              pathname == "/" ? "text-purple-600 underline" : "text-black"
            }
            href="/"
          >
            Home
          </Link>
          <Link
            className={
              pathname == "/tutors" ? "text-purple-600 underline" : "text-black"
            }
            href="/tutors"
          >
            Tutors
          </Link>
          <Link
            className={
              pathname == "/contact"
                ? "text-purple-600 underline"
                : "text-black"
            }
            href="/contact"
          >
            Contuct
          </Link>
          <Link
            className={
              pathname == "/about" ? "text-purple-600 underline" : "text-black"
            }
            href="/about"
          >
            About
          </Link>

          {user ? (
            <>
              <Link href={"create-shop"}>
                <Button
                  variant="outline"
                  className="rounded-full border border-gray-300  hover:bg-gray-400"
                >
                  Create Shop
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="size-10 rouded-full ">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border border-gray-400 bg-white mt-2">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-gray-200 px-3 py-2">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 px-3 py-2">
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gray-200 px-3 py-2">
                    My Shop
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="border-b border-gray-400" />
                  <DropdownMenuItem
                    className="hover:bg-gray-200 px-3 py-2"
                    onClick={handleLogOut}
                  >
                    <LogOut /> LogOut
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href={"/login"}>
              <Button
                variant="outline"
                className="roudend-full border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
              >
                SignIn
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
