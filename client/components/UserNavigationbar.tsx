"use client";
import React, { useState, useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import SigninModel from "./UserSignin";
import { NotificationModal } from "./NotificationModal";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Logo } from "@/components/Icons";
import Cookies from "js-cookie";

// Define the UserDetails interface
interface UserDetails {
  username: string;
  avatar: string;
  // Add other properties as needed
}

export const UserNavigationbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    };

    fetchUserDetails();
  }, []);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">NetQuest</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu className={isMenuOpen ? "max-h-[10vh]" : "max-h-0"}>
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarMenu>

      <NavbarContent as="div" justify="end">
        <ThemeSwitch />
        {loginStatus && userDetails ? (
          <>
            <NotificationModal />
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={userDetails.username}
                  size="sm"
                  src={userDetails.avatar}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userDetails.username}</p>
                </DropdownItem>
                <DropdownItem href="/user/profile" key="settings">Profile</DropdownItem>
                <DropdownItem key="team_settings" href="/user/booking">Booking</DropdownItem>
                <DropdownItem key="analytics">Notifications</DropdownItem>
                <DropdownItem key="system" href="/venue/profile/setting">
                  Change Password
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <SigninModel />
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};
