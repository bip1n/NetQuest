"use client";

import React, { useState } from "react";
import { Navigationbar} from "@/components/Navigationbar";
import {FooterContent} from "@/components/Footer";
import {Card, CardBody, CardFooter, CardHeader,Avatar,Button} from "@nextui-org/react";
import { Reviews } from "@/components/Reviews";

export default function ReviewsPage() {
    const [isFollowed, setIsFollowed] = React.useState(false);
  return (
   <>
        <Navigationbar/>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Card  className="w-full max-w-[100%] md:max-w-[800px] mt-4">
                <CardBody>
                    <h4 className="font-medium text-lg">Reviews</h4>
                </CardBody>
                <Reviews/>
            </Card>
        </div>
        <FooterContent/>
  </>
  );
}
