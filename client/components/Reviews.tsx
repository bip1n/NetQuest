"use client";
import React from "react";
import { Card, CardBody, CardFooter, CardHeader, Avatar, Button,Link ,Skeleton,Input} from "@nextui-org/react";
import { DoubledownIcon,DoubleupIcon, ClickedDoubledownIcon,ClickedDoubleupIcon } from "./Icons";
export const Reviews = () => {
  return (
    <>
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
                Ekdam jhur. mat ma ni dulo pareko chha..bekkar ko futsal...owner ni thado thado kura garchha #WorstExperience
                </p>
            </CardBody>
        </Card>
       
       {/* Skeleton */}
        <Card className="ml-1.5 mr-1.5 mb-1.5 mt-0">
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Skeleton className="flex rounded-full w-12 h-12"/>               
                </div>
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-3 w-1/5 rounded-lg"/>
                    <Skeleton className="h-3 w-1/5 rounded-lg"/>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small mb-4">
                    <Skeleton className="h-4 w-5/5 rounded-lg"/>
            </CardBody>
        </Card>
    </>   

  );
};
