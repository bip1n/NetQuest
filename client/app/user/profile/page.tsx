import React from 'react'
import {Navigationbar} from "@/components/Navigationbar"
import {FooterContent} from "@/components/Footer"
import { 
    Avatar,
    Card,
    CardBody,
    CardHeader,
    Divider,
    CardFooter,
    Image,
    Input,
    Button,

 } from '@nextui-org/react';
export default function UserProfile() {
  
    return (
      <>
        <Navigationbar />
        <div>
        <Card className='md:mx-24 flex flex-col items-center'>
            <CardHeader>
                <p className='text-xl text-secondary font-semibold ml-4'>Profile</p>
            </CardHeader>
            <CardBody className="flex flex-col items-center">
                <div className=" justify-center">
                <Image
                    src="https://res.cloudinary.com/dwc7juq50/image/upload/v1717429705/About/subodh_nfchh8.jpg"
                    width={200}
                    height={200}
                    alt="profile"
                    className="rounded-full"
                />
                <div className="mt-4 w-full flex justify-center">
                        <p className='text-lg text-secondary font-semibold'>Test User  |  9876543210</p>
                </div>
                </div>
            </CardBody>
        </Card>
        <Card className='md:mx-24 flex flex-col items-center'>
            <CardHeader>
                <p className='text-xl text-secondary font-semibold ml-4'>Profile</p>
            </CardHeader>
            <CardBody className="flex flex-col items-center">
                <div className=" justify-center">
                <Image
                    src="https://res.cloudinary.com/dwc7juq50/image/upload/v1717429705/About/subodh_nfchh8.jpg"
                    width={200}
                    height={200}
                    alt="profile"
                    className="rounded-full"
                />
                <div className="mt-4 w-full flex justify-center">
                        <p className='text-lg text-secondary font-semibold'>Test User  |  9876543210</p>
                </div>
                </div>
            </CardBody>
        </Card>
    </div>
        <FooterContent />
      </>
    );
  }
  