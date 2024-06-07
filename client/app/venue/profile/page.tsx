"use client";

import React, { useState } from "react";
import { Navigationbar } from "@/components/Navigationbar";
import { FooterContent } from "@/components/Footer";
import {Reviews} from "@/components/Reviews"
import { Booking } from "@/components/Booking";
import {VenueInfo} from "@/components/VenueInfo"
import {
  Button,
  Card,
  CardHeader,
  Image,
  CardBody,
  ScrollShadow,
  Link, 
} from "@nextui-org/react";


import { MessageIcon } from "@/components/Icons";

export default function VenueProfile() {


  return (
    <>
      <Navigationbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        

        <Card className="w-full max-w-[100%] md:max-w-[600px] mt-2">
        <Card>
          <VenueInfo/>
        </Card>
        <Card className="m-1">
          <CardBody>
              
                  <span className="flex items-start mb-2 ml-2">
                      <MessageIcon className="w-2 h-6" />
                      <p className="font-semibold text-md ml-2">Reviews</p>
                  </span>
                <Reviews/>
                <Link className="ml-2" href="/venue/reviews">Read More</Link> 
            </CardBody>
        </Card>
        <Card className="m-1">
          <Booking/> 
        </Card>
        
        </Card>
      </div>
      <FooterContent />
    </>
  );
}
