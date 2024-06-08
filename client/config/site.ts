export type SiteConfig = typeof siteConfig;
import { ThemeSwitch } from "@/components/ThemeSwitch";
export const siteConfig = {
  name: "NetQuest",
  description: "Effortless Futsal Reservations: Book Quickly, Play Passionately.",
  navItems: [
    {
      label: "Home",
      href: "/user/home",
    },
    {
      label: "Futsals",
      href: "/user/futsal",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/venue/profile",
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
