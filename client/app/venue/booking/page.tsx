"use client";

import React, { useState } from "react";
import {UserNavigationbar} from "@/components/UserNavigationbar"
import {FooterContent} from "@/components/Footer"
import {Booking} from "@/components/Booking"
import { Card, CardHeader} from "@nextui-org/react";


export default function BookingPage() {
  
  return (
    <>
      <UserNavigationbar />
      <Card>
        <CardHeader><h4 className="font-medium text-lg">Booking</h4></CardHeader>
        <Booking/>
      </Card>
     
      <FooterContent />
    </>
  );
}
