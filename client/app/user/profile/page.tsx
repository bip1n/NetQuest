"use client"

import React, { useState, useEffect } from 'react'
import { UserNavigationbar } from "@/components/UserNavigationbar"
import { FooterContent } from "@/components/Footer"
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
import Cookies from "js-cookie";

// Define the UserProfile interface
interface UserProfile {
  profilepic: string;
  username: string;
  phone: string;
  email: string;
}

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = Cookies.get("__securedAccess");
      if (token) {
        try {
          const response = await fetch("http://localhost:4000/api/userprofile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            setError(errorResponse.error);
          } else {
            const responseData = await response.json();
            // console.log('responseData:', responseData);
            setUserDetails(responseData.user);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <UserNavigationbar />
      {userDetails ? (
        <div>
          <Card className='md:mx-24 flex flex-col items-center'>
            <CardHeader>
              <p className='text-xl text-secondary font-semibold ml-4'>Profile</p>
            </CardHeader>
            <CardBody className="flex flex-col items-center">
              <div className="justify-center">
                <Image
                  src={userDetails.profilepic}
                  width={200}
                  height={200}
                  alt="profile"
                  className="rounded-full"
                />
                <div className="mt-4 w-full flex justify-center">
                  <p className='text-lg text-secondary font-semibold'>{userDetails.username}  |  {userDetails.phone}</p>
                </div>
              </div>
            </CardBody>
            <Divider />
            <Divider />
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
                    defaultValue={userDetails.username}
                    className="max-w-lg"
                  />
                </div>
                <div className="mt-4 w-full flex justify-center uppercase">
                  <Input
                    type="text"
                    label="Contact Number"
                    variant="bordered"
                    labelPlacement='outside'
                    defaultValue={userDetails.phone}
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
                    defaultValue={userDetails.email}
                    className="max-w-lg"
                  />
                </div>
                <div className="mt-4 ml-19"></div>
                <div className="mt-4 w-full flex justify-center">
                  <Button
                    color="primary"
                    variant="bordered"
                    radius="lg"
                    className="w-1/2 md:w-1/5"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <FooterContent />
    </>
  );
}
