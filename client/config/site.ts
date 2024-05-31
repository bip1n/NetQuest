export type SiteConfig = typeof siteConfig;
import { ThemeSwitch } from "@/components/theme-switch";
export const siteConfig = {
  name: "NetQuest",
  description: "Effortless Futsal Reservations: Book Quickly, Play Passionately.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Futsals",
      href: "/allfutsal",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Notification",
      href: "/help-feedback",
    },
    {
      label: "Booking",
      href: "/blog",
    },
    {
      label: "Bookmark",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "#",
    twitter: "#",
    docs: "#",
    discord: "#",
    sponsor: "#",
  },
};
