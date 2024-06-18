"use client"
import React from 'react'
import { Card, CardHeader, CardBody, Image, Skeleton,CardFooter,Button } from "@nextui-org/react";
import { Searchbar } from "@/components/Searchbar";
import {Navigationbar} from '@/components/Navigationbar';
import { FooterContent } from '@/components/Footer';
import { useRouter } from "next/navigation";
interface Props {}

const HomePage = (props: Props) => {
  const router = useRouter();

  return (
    <>
    <Navigationbar/>
    <Searchbar/>
    <Card className='mt-4'>
      <CardHeader> <p className='text-xl text-secondary font-semibold ml-4'> Top Rated</p></CardHeader>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
      <Card> 
      <CardBody>
        <Image
         isBlurred
         height={"100%"}
         width={"100%"}
          src="https://previews.123rf.com/images/horimatsu/horimatsu1509/horimatsu150900030/45248004-futsal-court-in-a-public-outdoor-park-with-artificial-turf.jpg"
        />
      </CardBody>
      <CardFooter className="pb-0 pt-2 px-4 flex flex-col items-start">
        <h4 className="font-semibold text-large uppercase">Kick Futsal <span><small className="text-primary-500 mb-2 text-tiny">[4.7/5]</small></span></h4>
        
        <div className="w-full flex items-center justify-between mb-2">
          <div>
            <p className="text-default-600 text-small">Balkumari, Lalitpur</p>
            <p className="text-default-600 text-small">Starting from <span className='text-success'> Rs.1050</span></p>
          </div>
        
          <Button
            color="primary"
            radius="full"
            size="sm"
            variant="solid"
            onClick={() => router.push("/venue/profile")}
          >
            Book Now
          </Button>
        </div>
      </CardFooter>

    </Card>

    <Card >
      <CardBody >
        <Skeleton className="flex rounded-lg w-full h-full"/> 
      </CardBody>
      <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
          <Skeleton className="h-5 mb-2 w-full rounded-lg"/>
          <Skeleton className="h-4 mb-2 w-full rounded-lg"/>
          <Skeleton className="h-4 mb-2 w-full rounded-lg"/>
      </CardFooter>
    </Card>

    <Card >
      <CardBody >
          <Skeleton className="flex rounded-lg w-full h-full"/> 
      </CardBody>
      <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
          <Skeleton className="h-5 mb-2 w-full rounded-lg"/>
          <Skeleton className="h-4 mb-2 w-full rounded-lg"/>
          <Skeleton className="h-4 mb-2 w-full rounded-lg"/>
      </CardFooter>
    </Card>
    </div>
    </Card>
    <FooterContent/>
    </>
  )
}

export default HomePage