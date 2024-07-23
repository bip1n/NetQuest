"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserNavigationbar } from "@/components/UserNavigationbar";
import { Searchbar } from "@/components/Searchbar";
import { FooterContent } from "@/components/Footer";
import { AboutUsPage } from "@/components/AboutUs";
import { FeaturedVenue } from "@/components/FeaturedVenue";
import { FAQ } from "@/components/FAQ";
import { TopRated } from "@/components/TopRated";

interface Venue {
  _id: number;
  venueName: string;
  location: string;
  rating: number;
  price: number;
  profilepic: string;
}
const HomePage = () => {
  return (
    <main className="flex flex-col justify-center">
      <UserNavigationbar/>
      <Searchbar />
      <TopRated/>
      <FeaturedVenue/>
      <AboutUsPage />
      <FAQ />
      <FooterContent />
    </main>
  );
};

export default HomePage;
