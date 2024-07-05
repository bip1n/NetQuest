"use client";

import React, { useEffect, useState } from "react";
import {UserNavigationbar} from "@/components/UserNavigationbar"
import {FooterContent} from "@/components/Footer"
import Booking from "@/components/Booking"
import { useParams } from "next/navigation";
import { Card, CardHeader} from "@nextui-org/react";
import Cookies from "js-cookie"; // Import Cookies library
import { useRouter } from "next/navigation";



// export default function BookingPage() {

const BookingPage = () => {

  const { id } = useParams(); // Get the dynamic route parameter
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track login status
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = Cookies.get("__securedAccess");
      if (token) {
        try {
          const response = await fetch("http://localhost:4000/api/isUserLoggedIn", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            router.push(`/venue/${id}`)
          } else {
            console.log("User is logged in")
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error fetching user login status:", error);
        }
      }else{
        console.log("User is not logged in")
        router.push(`/venue/${id}`)
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to fetch login status only once


  return (
    <>
      <UserNavigationbar />
      {isLoggedIn ? (
      <Card>
        <CardHeader><h4 className="font-medium text-lg">Booking</h4></CardHeader>
        <Booking venueId={id as string}/>
      </Card>
       ) : (
        <div></div>
      )}
     
      <FooterContent />
    </>
  );
}

export default BookingPage;

