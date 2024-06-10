import React from 'react'
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Searchbar } from "@/components/Searchbar";
import {Navigationbar} from '@/components/Navigationbar';
import { FooterContent } from '@/components/Footer';

interface Props {}

const HomePage = (props: Props) => {
  return (
    <>
    <Navigationbar/>
      <div className="shadow-xl">
      <Searchbar/>
      
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0 py-4 ml-5"> <h4> Top Rated</h4></div>
    <div  className="flex overflow-x-auto h-96 space-x-4">

   
    <Card className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex-shrink-0 py-4 m-2">
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://previews.123rf.com/images/horimatsu/horimatsu1509/horimatsu150900030/45248004-futsal-court-in-a-public-outdoor-park-with-artificial-turf.jpg"
          width={370}
        />
      </CardBody>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Kick Futsal</h4>
        <p className="text-tiny uppercase ">Lalitpur</p>
        <small className="text-default-500">Starting from </small>
      </CardHeader>
    </Card>
    </div>
  </div>
  <FooterContent/>
    </>
  
  )
}

export default HomePage