"use client";

import React, { useState } from "react";
import { Navigationbar} from "@/components/navbar";
import {FooterContent} from "@/components/footer";
import {Card, CardBody, CardFooter, CardHeader,Avatar,Button} from "@nextui-org/react";


export default function ReviewsPage() {
    const [isFollowed, setIsFollowed] = React.useState(false);
  return (
   <>
        <Navigationbar/>

        <Card className="m-2">
                <Card className="max-w-[420px] m-4">
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                        <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                        <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small font-semibold leading-none text-default-600">Shyame Dai</h4>
                            <h5 className="text-small tracking-tight text-default-400">@herosam</h5>
                        </div>
                        </div>
                        
                    </CardHeader>
                    <CardBody className="px-3 py-0 text-small">
                        <p>
                            Ekdam jhur futsal. mat ma ni dulo pareko chha..bekkar ko futsal...owner ni thado thado kura garchha
                        </p>
                        <span className="pt-2">
                        #WorstExperience 
                        </span>
                    </CardBody>
                    <CardFooter className="gap-3">
                        <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">97</p>
                        <p className=" text-default-400 text-small">Agree</p>
                        </div>
                        <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">42</p>
                        <p className="text-default-400 text-small">Disagree</p>

                      


                        </div>
                    </CardFooter>
        
                    <Button
                    className={isFollowed ? "bg-transparent text-foreground border-default-200 justify-end"  : ""}
                    color="primary"
                    radius="full"
                    size="sm"
                    variant={isFollowed ? "bordered" : "solid"}
                    onPress={() => setIsFollowed(!isFollowed)}
                    >
                    {isFollowed ? "Unfollow" : "Reply"}
                    </Button>
            </Card>

            
        </Card>

        <FooterContent/>
   
   </>
  );
}
