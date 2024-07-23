"use client";
import React, { useEffect, useState } from "react";
import { FooterContent } from "@/components/Footer";
import Dashboard from "@/components/VenueOwner/Dashboard";
import { SalesChart } from "@/components/VenueOwner/SalesChart";

const AnalyticsPage = () => {
  return (
    <main className="flex flex-col justify-center p-4">
      <SalesChart/>
    </main>
  );
};

export default AnalyticsPage;
