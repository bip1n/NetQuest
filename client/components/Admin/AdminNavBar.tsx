"use client";
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
import {Logo} from "@/components/Icons";

const navLinks = [
  { item: "Home", link: "/admin" },
  { item: "Venue Status", link: "/admin/venue-status" },
  { item: "Log Report", link: "/admin/log-report" },
];

export const AdminNavBar = () => {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/admin"
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
                href="/admin"
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
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <ThemeSwitch />
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
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};
