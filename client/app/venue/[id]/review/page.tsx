"use client";

import React, { useState } from "react";
import { UserNavigationbar} from "@/components/UserNavigationbar";
import {FooterContent} from "@/components/Footer";
import {Card, CardBody, CardFooter, CardHeader,Avatar,Button,Textarea} from "@nextui-org/react";
import { Reviews } from "@/components/Reviews";

export default function ReviewsPage() {
    const [isFollowed, setIsFollowed] = React.useState(false);
    return (
        <>
            <UserNavigationbar/>
            <div className="flex flex-col items-center justify-center">
                <Card className="w-full max-w-[100%] md:max-w-[800px] mt-4">
                    <CardBody>
                         <Textarea
                        label="Description"
                        placeholder="Enter your description"
                        className="max-w"
                    />
                        <Button className="m-2 w-1/3 md:w-1/5  " color="primary" variant="solid">
                            Add Review
                        </Button>
                    </CardBody>
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
