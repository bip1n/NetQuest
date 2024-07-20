"use client";
import { Link } from "@nextui-org/react";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { CircleUser, Menu, Package2, Search,Bell } from "lucide-react";
import { NotificationIcon } from "@/components/Icons";
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
import {Logo} from "@/components/Icons";
import { NotificationModal } from "../NotificationModal";

const navLinks = [
  { item: "Home", link: "/[id]" },
  { item: "Bookings", link: "/venue/bookings" },
  { item: "History", link: "/venue/history" },
  { item: "Analytics", link: "/venue/analytics" },
];

export const VenueOwnerNavbar = () => {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/#"
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
                href="/#"
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
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Notifications</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
