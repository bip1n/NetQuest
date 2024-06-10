"use client";
import React from "react";
import { Card, CardBody, CardFooter, CardHeader, Avatar, Button,Link } from "@nextui-org/react";
import { DoubledownIcon,DoubleupIcon, ClickedDoubledownIcon,ClickedDoubleupIcon } from "./Icons";
export const Reviews = () => {
  return (
    <>
         <Card className="ml-1.5 mr-1.5 mb-1.5 mt-0">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src="https://qph.cf2.quoracdn.net/main-qimg-ed060e28837ac92bae6fff6f068eee04-lq" />
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">Neeya</h4>
                    <h5 className="text-small tracking-tight text-default-400">@cuteniya</h5>
                </div>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small">
                <p className="text-wrap text-left ">
                    good 🥳❤️
                </p>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                <ClickedDoubleupIcon/>
                <p className="font-semibold text-default-400 text-small">9</p>
                </div>
                <div className="flex gap-1">
                <DoubledownIcon/>
                <p className="font-semibold text-default-400 text-small">2</p>
                </div>
            </CardFooter>
        </Card>
     
        <Card className="ml-1.5 mr-1.5 mb-1.5 mt-0">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src="https://media.tenor.com/62eQoDlRyhIAAAAM/crying-meme.gif" />
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">David</h4>
                    <h5 className="text-small tracking-tight text-default-400">@davidon</h5>
                </div>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small">
                <p className="text-wrap text-left ">
                Ekdam jhur futsal. mat ma ni dulo pareko chha..bekkar ko futsal...owner ni thado thado kura garchha #WorstExperience
                </p>
            </CardBody>
            <CardFooter className="gap-3">
                <div className="flex gap-1">
                
                <DoubleupIcon/>
                <p className="font-semibold text-default-400 text-small">1</p>
                </div>
                <div className="flex gap-1">
                
                <ClickedDoubledownIcon/>
                <p className="font-semibold text-default-400 text-small">8</p>
                </div>
            </CardFooter>
        </Card>
      </>
  );
};
