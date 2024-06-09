"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
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
  Tabs,
  CardFooter,
  Tab,
  Chip
} from "@nextui-org/react";


import { MessageIcon,GalleryIcon,VenueIcon } from "@/components/Icons";
import Slider from "@/components/Slider";

export default function VenueProfile() {
  const router = useRouter();
  return (
    <>
      <Navigationbar />
      <div>
      <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start  justify-between">
       <h4 className="font-semibold uppercase text-medium">Kick Futsal <span className="text-xs ml-2 text-blue-500"> [4.6/5]</span></h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
         isZoomed
          alt="Venue Image"
          // className="object-cover rounded-xl"
          src="https://previews.123rf.com/images/horimatsu/horimatsu1509/horimatsu150900030/45248004-futsal-court-in-a-public-outdoor-park-with-artificial-turf.jpg"
        />
      </CardBody>
    </Card>
        
        {/* <Card className="w-full max-w-[100%] md:max-w-[600px] mt-2">
        <div className="flex w-full flex-col">
        <Tabs aria-label="Options" color="secondary" variant="underlined"
        >
            <Tab  
              key="about"
              title={
                <div className="flex items-center space-x-2">
                   <VenueIcon className="w-6 h-6" />
                  <span>About</span>
                </div>
              }
            >
              <VenueInfo/>
            </Tab>
          <Tab
            key="reviews"
            title={
              <div className="flex items-center space-x-2">
                <MessageIcon className="w-2 h-6" />
                <span>Reviews</span>
              </div>
            }
          >
                <Reviews/>
          </Tab> */}


      <Card className="w-full max-w-[100%] md:max-w-[600px] mt-2">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" color="secondary" variant="underlined">
          <Tab  
            key="about"
            title={
              <div className="flex items-center space-x-2">
                <VenueIcon className="w-6 h-6" />
                <span>About</span>
              </div>
            }
          >

            <VenueInfo id={'66649a5528a8e99bd3f5c849'} />

          </Tab>
          <Tab
            key="reviews"
            title={
              <div className="flex items-center space-x-2">
                <MessageIcon className="w-2 h-6" />
                <span>Reviews</span>
              </div>
            }
          >
            <Reviews />
            <Link href="/venue/reviews" className="ml-3 text-sm "> Read More...</Link>
          </Tab>
          
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                <GalleryIcon/>
                <span>Photos</span>
              </div>
            }
          >
          <Slider/>
          </Tab>
        </Tabs>
    </div>    

        </Card>
      </div>
      
      <FooterContent />
    </>
  );
}
