"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import {
  Flame,
  MapPin,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Cookies from "js-cookie";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import Booking from "@/components/Booking";
import { Spinner } from "@nextui-org/react";

const Venue = () => {
  const [token, setToken] = useState('');
  const [venueDetails, setVenueDetails] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/venuedetails?owner_id=${venueId}`);
        if (!response.ok) {
          setError("Error fetching venue details");
        }
        const data: VenueDetails = await response.json();
        setVenueDetails(data);
      } catch (error) {
        setError("Failed to fetch venue details");
        console.error("Failed to fetch venue details:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching venue details
      }
    };

    fetchVenueDetails();
  }, [venueId]); // Fetch venue details whenever venueId changes

  if (loading) {
    return <Spinner />; // Show a loading spinner while fetching data
  }

  if (!venueDetails) {
    return <div>No venue details available</div>; // Show a message if no venue details are available
  }

  const { phone, address, amenities, startingPrice,venueName } = venueDetails;

  useEffect(() => {
    const fetchToken = () => {
      const tokenFromCookie = Cookies.get('__securedAccess');
      if (tokenFromCookie) {
        setToken(tokenFromCookie);
      }
    };

    fetchToken();
  }, []);

  if (loading) {
    return <div>
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                  <Carousel className="w-[80%]">
                  <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index}>
                         
                          <Card>
                              <CardContent className="flex aspect-square items-center justify-center p-4">
                              <span className="text-4xl font-semibold">{index + 1}</span>
                              </CardContent>
                          </Card>
                      </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                {/* </Card> */}
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle className="uppercase">{venue.venueName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="flex flex-row mb-2">
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
                            <Separator orientation="vertical" />
                            <div>Docs</div>
                            <Separator  orientation="vertical"/>
                            <div>Source</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Card>
                            <CardContent className="mt-4">
                              <div className="flex space-x-4">
                              <Avatar >
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div className="space-y-2">
                                <CardDescription>@heroKta <br/> <span className="text-default-900">Great Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto veniam iure dolore voluptatibus aliquid rerum mollitia quia, pariatur molestias repudiandae! Suscipit vitae maiores debitis dolor aliquid mollitia esse commodi incidunt.</span></CardDescription>
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
                      <Booking venueId={id as string}/>
                    </CardHeader>
                </Card>
              </div>
            </div>
        </main>
       </div>
     </div>
  )
}

export default Venue