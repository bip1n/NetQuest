"use client";

import React, { useEffect, useState } from "react";
import {UserNavigationbar} from "@/components/UserNavigationbar"
import {FooterContent} from "@/components/Footer"
import Booking from "@/components/Booking"
import { useParams } from "next/navigation";
import { Card, CardHeader} from "@nextui-org/react";


// export default function BookingPage() {

const BookingPage = () => {

  const { id } = useParams(); // Get the dynamic route parameter

  return (
    <>
      <UserNavigationbar />
      <Card>
        <CardHeader><h4 className="font-medium text-lg">Booking</h4></CardHeader>
        <Booking venueId={id as string}/>
      </Card>
     
      <FooterContent />
    </>
  );
}

export default BookingPage;

