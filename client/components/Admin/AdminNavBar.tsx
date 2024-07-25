"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Link } from "@nextui-org/react";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/Icons";
import { DESTRUCTION } from "dns";
import Cookies from "js-cookie";

const navLinks = [
  { item: "Home", link: "/admin" },
  { item: "Venue Status", link: "/admin/venue-status" },
  { item: "Log Report", link: "/admin/log-report" },
];

interface UserDetails {
  username: string;
  avatar: string;
  // Add other properties as needed
}

export const AdminNavBar = () => {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const [authChanged, setAuthChanged] = useState(false); // State to track authentication changes
  const [loading, setLoading] = useState(true); // Loading state for user data fetching


  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = Cookies.get("__securedAccess");
      if (token) {
        try {
          const response = await fetch("http://localhost:4000/api/NavDetails", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            setError(errorResponse.error);
          } else {
            const responseData = await response.json();
            setUserDetails(responseData.user);
            setLoginStatus(true);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, [authChanged]); // Add authChanged to the dependency array


    // Function to handle login state change
    const handleLoginStateChange = () => {
      setAuthChanged(!authChanged); // Toggle the authChanged state
    };
  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove("__securedAccess");
    Cookies.remove("__securedRefresh");
    setLoginStatus(false);
    setAuthChanged(!authChanged); 
    router.push("/");
  };

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-xl font-bold md:text-base text-default-900 mr-8 text-nowrap"
            > <Logo />
             <p >NetQuest - ADMIN</p>
          </Link>
          {navLinks.map((navLink) => (
            <Link
              key={navLink.item}
              href={navLink.link}
              className="whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
            >
              {navLink.item}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-lG font-bold md:text-base text-default-900 mr-8 text-nowrap"
                > <Logo />
                <p >NetQuest - ADMIN</p>
              </Link>
              {navLinks.map((navLink) => (
                <Link
                  key={navLink.item}
                  href={navLink.link}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {navLink.item}
                </Link>
              ))}
              <Link
                className="flex items-center gap-1 text-current"
                href="/team"
                title="nextui.org homepage"
              >
                <p className="text-primary">Team Inferno</p>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <ThemeSwitch className="mx-4" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <span className="text-danger-500 uppercase">Username</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Button
                      variant={"destructive"}
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
