"use client";
import React, { useState } from "react";
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
import SigninModel from "./Signinmodel";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Button } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Logo } from "@/components/Icons";


  const loginStatus = false;
  // const [isLogin, setIsLoginTrue] = useState(false); 
  // setIsLoginTrue (loginStatus);


export const Navigationbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  

  return (
    <NextUINavbar maxWidth="xl" position="sticky" shouldHideOnScroll>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={handleMenuToggle}
        />
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">NetQuest</p>
          </NextLink>
        </NavbarBrand>

        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarMenu className={isMenuOpen ? "max-h-[10vh]" : "max-h-0"}>
        {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>   
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
                 </NextLink>
                </NavbarItem>
        ))}
      </NavbarMenu>

      {loginStatus ?
        <NavbarContent as="div" justify="end">
        <ThemeSwitch />
        
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold ">Ram Bahadur</p>
            </DropdownItem>
            <DropdownItem href="/venue/profile" key="settings">Profile Settings</DropdownItem>
            <DropdownItem key="team_settings">Bookings</DropdownItem>
            <DropdownItem key="analytics" >Notifications</DropdownItem>
            <DropdownItem key="system" >Saved</DropdownItem>
            <DropdownItem key="logout" color="danger">Log Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
       : 
       <NavbarContent as="div" justify="end">
          <ThemeSwitch />
          <SigninModel /> 
        </NavbarContent>}
      
    </NextUINavbar>
  );
};
