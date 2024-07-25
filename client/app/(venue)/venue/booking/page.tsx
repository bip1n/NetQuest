"use client";

import React, { useState } from "react";
import {UserNavigationbar} from "@/components/UserNavigationbar"
import {FooterContent} from "@/components/Footer"
import {BookingTable} from "@/components/BookingTable"
import { Card, CardBody, CardHeader} from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { Router } from "next/router";
import Link from "next/link";


export default function BookingSettingsPage() {
  
  return (
    <>
      <Card>
        <BookingTable />
      </Card>
    </>
  );
}
