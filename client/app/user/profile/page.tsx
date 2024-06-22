import React from 'react'
import {UserNavigationbar} from "@/components/UserNavigationbar"
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
    Link,

 } from '@nextui-org/react';
export default function UserProfile() {
  
    return (
      <>
        <UserNavigationbar />
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
                <Divider/>
                <Divider/>
                <CardHeader className='flex justify-center'>
                    <p className='text-md text-secondary font-normal uppercase'>Profile Details</p>
                </CardHeader>
                <CardBody className="flex flex-col items-center">
                    <div className="w-full flex flex-col items-center">
                    <div className="w-full flex justify-center uppercase">
                        <Input
                        type="text"
                        label="Username"
                        variant="bordered"
                        labelPlacement='outside'
                        defaultValue="Test User"
                        className="max-w-lg"
                        />
                    </div>
                    <div className="mt-4 w-full flex justify-center uppercase">
                        <Input
                        type="text"
                        label="Contact Number"
                        variant="bordered"
                        labelPlacement='outside'
                        defaultValue="9876543210"
                        className="max-w-lg"
                        />
                    </div>
                    <div className="mt-4 w-full flex justify-center uppercase">
                        <Input
                        isReadOnly
                        labelPlacement='outside'
                        type="email"
                        label="Email"
                        variant="bordered"
                        defaultValue="junior@nextui.org"
                        className="max-w-lg"
                        />
                    </div>
                    <div className="mt-4 ml-19">
                      
                    </div>
                    <div className="mt-4 w-full flex justify-center">
                        <Button
                            color="primary" 
                            variant="bordered"
                            radius="lg"
                            className="w-1/2 md:w-1/5"
                            type="submit"
                            > Save Changes
                            </Button>
                    </div>
                    </div>
                </CardBody>
            </Card>
        </div>
        <FooterContent />
      </>
    );
  }
  