"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {MapPin, Star, PhoneCall, Flame} from "lucide-react"
import Booking from "@/components/Booking"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { ThemeSwitch } from "@/components/ThemeSwitch"
import { UserNavigationbar } from "@/components/UserNavigationbar"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"


interface venue {
  venueName: string;
  rating: number;
  profilepic: string;
  owner: any; // Replace with appropriate type if available
}

const VenuePage = () => {

  const { id } = useParams(); // Get the dynamic route parameter

  const [venue, setVenue] = useState<venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVenue = async () => {
      if (!id) {
        return;
      }
      console.log(id);
      try {
        setLoading(true); // Start loading
        const response = await fetch(`http://localhost:4000/api/venues/${id}`, {
          method: "GET",
        });
        
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || "Failed to fetch data");
        }

        const responseData = await response.json();
        setVenue(responseData.owner);
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setError("An error occurred while fetching venue data.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchVenue();
  }, [id]);

  

  if (loading) {
    return <div>
      <UserNavigationbar />
          <div className="mx-auto grid max-w-[70rem] flex-1 auto-rows-max gap-4 mt-8">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid gap-4 lg:col-span-1 mr-20">
                <Skeleton className="h-100 w-full mb-4  rounded-lg" />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                      <Skeleton className="h-20 mb-2 rounded-lg" />
                      <Skeleton className="h-20 mb-2 rounded-lg" />
                      <Skeleton className="h-20 mb-2 rounded-lg" />
              </div>
            </div>
          </div>
    </div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        
    <UserNavigationbar/>  
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-5 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Carousel className="w-full">
                  <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                          <div className="p-1">
                          <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-4xl font-semibold">{index + 1}</span>
                              </CardContent>
                          </Card>
                          </div>
                      </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div className="grid auto-rows-max items-start gap-2 lg:col-span-3 lg:gap-4">
                <Card  x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle className="uppercase ">{venue.venueName}</CardTitle>
                    <CardContent>
                      <div className="flex flex-row my-2">
                        <div>
                          <MapPin strokeWidth={1.5} size={24}/>
                        </div>
                        <div className="ml-2 ">
                          Balkumari, Lalitpur
                        </div>
                      </div>
                      <div className="flex flex-row mb-2">
                        <div>
                          <Star strokeWidth={1.5} size={24}/>
                        </div>
                        <div className="ml-2">
                          [4.5/5]
                        </div>
                      </div>
                      <div className="flex flex-row mb-2">
                        <div>
                          <PhoneCall strokeWidth={1.5} size={24}/>
                        </div>
                        <div className="ml-2">
                          +977 9876543210
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div>
                          <Flame strokeWidth={1.5} size={24}/>
                        </div>
                        <div className="ml-2">
                        <div className="flex h-5 items-center space-x-4 text-sm">
                            <div>Blog</div>
                            <Separator />
                            <div>Docs</div>
                            <Separator />
                            <div>Source</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </CardHeader>
                  
                </Card>
                <Card  x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                      <p>Reviews</p>
                  </CardHeader>
                  <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Card>
                            <CardContent className="mt-4">
                              <div className="flex items-center space-x-4">
                              <Avatar >
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div className="space-y-2">
                                <CardDescription>@heroKta <br/> <span className="text-default-900">Great</span></CardDescription>
                              </div>
                            </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardContent className="mt-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-4">
                                  <Skeleton className="h-12 w-12 rounded-full" />
                                  <div className="space-y-2">
                                    <Skeleton className="h-4 w-[100px]" />
                                    <Skeleton className="h-4 w-[400px]" />
                                  </div>
                                </div>
                            </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-5 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-2 lg:col-span-5 lg:gap-4">
                <Card  x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle className="uppercase ">Kick Futsal</CardTitle>
                      {/* <Booking venueId={id as string}/> */}
                    </CardHeader>
                </Card>
              </div>
            </div>
        </main>
      </div>
    </div>
  )
}

export default VenuePage