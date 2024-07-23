"use client";
import { Link } from "@nextui-org/react";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { CircleUser, Menu, Package2, Search,Bell } from "lucide-react";
import { NotificationIcon } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

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
import {Logo} from "@/components/Icons";
import { NotificationModal } from "../NotificationModal";
import Cookies from "js-cookie";

const navLinks = [
  { item: "Home", link: "/venue/dashboard" },
  { item: "Booking", link: "/venue/booking" },
  { item: "History", link: "/venue/history" },
  { item: "Analytics", link: "/venue/analytics" },
];


// Define the UserDetails interface
interface UserDetails {
  username: string;
  avatar: string;
  // Add other properties as needed
}
export const VenueOwnerNavbar = () => {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authChanged, setAuthChanged] = useState(false); // State to track authentication changes
  const [loading, setLoading] = useState(true); // Loading state for user data fetching

    // Function to handle logout
    const handleLogout = () => {
      Cookies.remove('__securedAccess');
      Cookies.remove('__securedRefresh');
      setLoginStatus(false);
      setUserDetails(null);
      setAuthChanged(!authChanged); // Trigger re-render
      // window.location.reload(); // Reload the page after logout
      router.push('/loginasvenue');
    };

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/venue/dashboard"
            className="flex items-center gap-2 text-lg font-semibold md:text-base text-default-900"
          >
            <Logo />
            <span className="sr-only">NetQuest</span>
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
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/venue/dashboard"
                className="flex items-center gap-2 text-lg font-semibold text-default-900"
              >
                <Logo />
                <span className="sr-only">NetQuest</span>
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
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-3 sm:flex-initial">
            <div className="relative">
              <ThemeSwitch /> 
              <NotificationModal/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>username</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Button onClick={() => router.push(`/venue/profile`)} variant="ghost" className="w-full">Profile</Button></DropdownMenuItem>
                  <DropdownMenuItem><Button onClick={() => router.push(`/venue/profile/settings`)} variant="ghost" className="w-full">Settings</Button></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Button onClick={handleLogout} variant="destructive" className="w-full">Logout</Button></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
