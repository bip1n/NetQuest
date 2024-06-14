"use client";

import React, { useState } from "react";
import {Navigationbar} from "@/components/Navigationbar"
import {FooterContent} from "@/components/Footer"
import {BookingTable} from "@/components/BookingTable"
import { Card, CardBody, CardHeader} from "@nextui-org/react";


export default function BookingSettingsPage() {
  
  return (
    <>
      <Navigationbar />
      <Card>
        <BookingTable/>
      </Card>
      <FooterContent />
    </>
  );
}
