"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Flame,
  MapPin,
  PhoneCall,
  Star,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Booking from "@/components/Booking";

const Venue = () => {
  const { id } = useParams(); 
  const [venue, setVenue] = useState(null);
  const [venueDetails, setVenueDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVenue = async () => {
      if (!id) return;

      try {
        setLoading(true); 
        const response = await fetch(`http://localhost:4000/api/venues/${id}`);
        
        if (!response.ok) throw new Error("Failed to fetch data");

        const responseData = await response.json();
        setVenue(responseData.owner);
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setError("An error occurred while fetching venue data.");
      } finally {
        setLoading(false); 
      }
    };

    fetchVenue();
  }, [id]);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/VenueDetails?owner_id=${id}`);
        
        if (!response.ok) throw new Error("Failed to fetch data");

        const responseData = await response.json();
        setVenueDetails(responseData.amenities);
      } catch (error) {
        console.error("Error fetching venue details:", error);
        setError("An error occurred while fetching venue details.");
      } finally {
        setLoading(false); 
      }
    };

    fetchVenueDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto grid max-w-[70rem] flex-1 auto-rows-max gap-4 mt-8">
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid gap-4 lg:col-span-1 mr-20">
            <Skeleton className="h-100 w-full mb-4 rounded-lg" />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Skeleton className="h-20 mb-2 rounded-lg" />
            <Skeleton className="h-20 mb-2 rounded-lg" />
            <Skeleton className="h-20 mb-2 rounded-lg" />
          </div>
        </div>
      </div>
    );
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
                          <Image
                            src={venue.profilepic}
                            alt="Transaction"
                            layout="intrinsic"
                            width={500}
                            height={300}
                            className="w-full h-full object-cover"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase">{venue.venueName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row mb-2">
                    <MapPin strokeWidth={1.5} size={24} />
                    <div className="ml-2">Balkumari, Lalitpur</div>
                  </div>
                  <div className="flex flex-row mb-2">
                    <Star strokeWidth={1.5} size={24} />
                    <div className="ml-2">[4.5/5]</div>
                  </div>
                  <div className="flex flex-row mb-2">
                    <PhoneCall strokeWidth={1.5} size={24} />
                    <div className="ml-2">+977 9876543210</div>
                  </div>
                  <div className="flex flex-row">
                    <Flame strokeWidth={1.5} size={24} />
                    <div className="ml-2">
                      <div className="flex h-5 items-center space-x-4 text-sm">
                        {venueDetails.map((amenity, index) => (
                          <div key={index} className="px-2 py-1 rounded">
                            {amenity}
                            <Separator orientation="vertical" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Card>
                        <CardContent className="mt-4">
                          <div className="flex space-x-4">
                            <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
                              <CardDescription>@heroKta <br/> <span className="text-default-900">Great venue. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto veniam iure dolore voluptatibus aliquid rerum mollitia quia, pariatur molestias repudiandae! Suscipit vitae maiores debitis dolor aliquid mollitia esse commodi incidunt.</span></CardDescription>
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
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase">Kick Futsal</CardTitle>
                  <Booking venueId={id as string}/>
                </CardHeader>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Venue;
