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
import { useEffect, useState } from "react";
import { getAllUsers } from "@/services/User";
import { IUsers } from "@/types";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, setIsLoading } = useUser();
  const role = user?.role;

  const [users, setUsers] = useState<IUsers[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log(error);
  console.log(loading);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const usersData = await getAllUsers();
        setUsers(usersData?.data);

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const currentUser = users?.find(
    (item: IUsers) => item.email === user?.userEmail
  );

  const profileImg = currentUser?.profileImage;
  // console.log(profileImg);

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };
  if (isLoading) {
    return <p>loading....</p>;
  }

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
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="size-10 rouded-full ">
                    {profileImg ? (
                      <AvatarImage src={profileImg} />
                    ) : (
                      <AvatarImage src="https://github.com/shadcn.png" />
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border border-gray-400 bg-white mt-2 ">
                  <DropdownMenuLabel className="font-semibold">
                    <div className="flex justify-center flex-col items-center gap-2">
                      <Avatar className="size-10 rouded-full ">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Link href={`/${role}/dashboard`}>
                        <Button className="roudend-full border-0 btn cursor-pointer bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                          {" "}
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <Link href={`/${role}/dashboard`}>
                    <DropdownMenuItem className="hover:bg-gray-200 px-3 py-2 cursor-pointer">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <Link href={`/${role}/bookings`}>
                    <DropdownMenuItem className="hover:bg-gray-200 px-3 py-2 cursor-pointer">
                      Bookings
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="border-b border-gray-400" />
                  <DropdownMenuItem
                    className="hover:bg-gray-200 px-3 py-2 cursor-pointer"
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
                className="roudend-full btn cursor-pointer border-0 bg-gray-300 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ..."
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
