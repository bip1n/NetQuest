"use client";

import React, { useState } from "react";
import {Navigationbar} from "@/components/Navigationbar"
import {FooterContent} from "@/components/footer"
import {BookingTable} from "@/components/BookingTable"


export default function BookingPage() {
  return (
    <>
      <Navigationbar />
      <BookingTable/>
      <FooterContent />
    </>
  );
}
