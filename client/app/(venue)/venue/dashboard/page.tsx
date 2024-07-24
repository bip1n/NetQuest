"use client";
import React, { useEffect, useState } from "react";
import { FooterContent } from "@/components/Footer";
import Dashboard from "@/components/VenueOwner/Dashboard";

const ProfilePage = () => {
  return (
    <main className="flex flex-col justify-center p-4">
      <Dashboard/>
    </main>
  );
};

export default ProfilePage;
