"use client";

import React, { useState } from "react";
import {Navigationbar} from "@/components/Navigationbar"
import {FooterContent} from "@/components/footer"
import {Booking} from "@/components/Booking"


export default function BookingPage() {
  return (
    <>
      <Navigationbar />
      <Booking/>
      <FooterContent />
    </>
  );
}
