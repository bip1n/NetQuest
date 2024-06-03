"use client";

import React, { useState } from "react";
import {Navigationbar} from "@/components/navbar"
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
