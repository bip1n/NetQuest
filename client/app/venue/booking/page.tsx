"use client";

import React, { useState } from "react";
import {Navigationbar} from "@/components/Navigationbar"
import {FooterContent} from "@/components/Footer"
import {Booking} from "@/components/Booking"
import { Card, CardHeader} from "@nextui-org/react";


export default function BookingPage() {
  
  return (
    <>
      <Navigationbar />
      <Card>
        <CardHeader><h4 className="font-medium text-lg">Booking</h4></CardHeader>
        <Booking/>
      </Card>
     
      <FooterContent />
    </>
  );
}
