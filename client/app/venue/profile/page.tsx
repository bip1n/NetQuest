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
        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-5">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Add to favourite</p>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src="https://previews.123rf.com/images/horimatsu/horimatsu1509/horimatsu150900030/45248004-futsal-court-in-a-public-outdoor-park-with-artificial-turf.jpg"
          />
          <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
            <div>
            <p className="text-lg text-default uppercase font-bold">KICK FUTSAL</p>
            </div>
            <Chip
              className="text-tiny"
              color="secondary"
              radius="sm"
              size="sm"
              variant="shadow"
             
            >
              [3.4 / 5]
            </Chip>
          </CardFooter>
      </Card>
        
        <Card className="w-full max-w-[100%] md:max-w-[600px] mt-2">
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
