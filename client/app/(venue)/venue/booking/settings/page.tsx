"use client";

import React, { useState } from "react";
import {UserNavigationbar} from "@/components/UserNavigationbar"
import {FooterContent} from "@/components/Footer"
import {BookingTable} from "@/components/BookingTable"
import { Card, CardBody, CardHeader} from "@nextui-org/react";


export default function BookingSettingsPage() {
  
  return (
    <>
      <Card>
        <BookingTable/>
      </Card>
    </>
  );
}
