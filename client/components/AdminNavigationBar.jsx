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


  const isAdmin = true;
  // const [isLogin, setIsLoginTrue] = useState(false); 
  // setIsLoginTrue (loginStatus);


export const AdminNavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  

  return (
    <NextUINavbar maxWidth="xl" position="sticky" shouldHideOnScroll>

        <NavbarBrand className="justify-start">
            <Logo />
            <p className="font-bold text-inherit">ADMIN DASHBOARD</p>
        </NavbarBrand>
    
      {isAdmin ?
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
            <DropdownItem href="/venue/profile" key="settings">Profile</DropdownItem>
            <DropdownItem key="team_settings">Bookings</DropdownItem>
            <DropdownItem key="analytics" >Notifications</DropdownItem>
            <DropdownItem key="system" href="/venue/profile/setting">Settings</DropdownItem>
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
