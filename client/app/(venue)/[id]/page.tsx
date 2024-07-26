"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowUpRight,
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
import { Skeleton } from "@/components/ui/skeleton";
import Booking from "@/components/Booking";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const Venue = () => {
  const { id } = useParams(); 
  const [venue, setVenue] = useState(null);
  const [venueDetails, setVenueDetails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchVenueData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        
        const [venueRes, venueDetailsRes, reviewsRes] = await Promise.all([
          fetch(`http://localhost:4000/api/venues/${id}`),
          fetch(`http://localhost:4000/api/VenueDetails?owner_id=${id}`),
          fetch(`http://localhost:4000/api/getReviews/${id}`)
        ]);

        if (!venueRes.ok || !venueDetailsRes.ok || !reviewsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const venueData = await venueRes.json();
        const venueDetailsData = await venueDetailsRes.json();
        const reviewsData = await reviewsRes.json();
        setVenue(venueData.owner);
        setVenueDetails(venueDetailsData.amenities);
        setReviews(reviewsData.reviews.slice(0, 2));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching venue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenueData();
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
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-4">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-2">
              <Carousel className="w-[94%]">
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
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-4">
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
                    <div className="ml-2">{venue.ratings}</div>
                  </div>
                  <div className="flex flex-row mb-2">
                    <PhoneCall strokeWidth={1.5} size={24} />
                    <div className="ml-2">+977 {venue.phone}</div>
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
                  <div className="flex flex-row justify-between">
                      <div>
                        <CardTitle>Reviews</CardTitle>
                      </div>
                      <div>
                        <Button variant="outline" asChild size="sm" className="ml-auto gap-1">
                          <Link href="`/${venue._id}`">
                            View All
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <>
                      <Skeleton className="flex rounded-full w-12 h-12" />
                      <Skeleton className="h-3 w-1/5 rounded-lg" />
                      <Skeleton className="h-3 w-1/5 rounded-lg" />
                      <Skeleton className="h-4 w-5/5 rounded-lg" />
                      <br/>
                      <Skeleton className="flex rounded-full w-12 h-12" />
                      <Skeleton className="h-3 w-1/5 rounded-lg" />
                      <Skeleton className="h-3 w-1/5 rounded-lg" />
                      <Skeleton className="h-4 w-5/5 rounded-lg" />
                      <br/>
                    </>
                  ) : (
                    <div className="grid gap-6">
                      
                      {reviews.map((review, index) => (
                        <div key={index} className="grid gap-3">
                          <Card>
                            <CardContent className="mt-4">
                              <div className="flex space-x-4">
                                <Avatar>
                                  <AvatarImage src={review.user.profilepic} alt={review.user.username} />
                                  <AvatarFallback>{review.user.username}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                  <CardDescription>
                                    @{review.user.username} <br/> 
                                    <span className="text-default-900">{review.content}</span>
                                  </CardDescription>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-5 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-2 lg:col-span-5 lg:gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase">{venue.venueName}</CardTitle>
                  <Booking venueId={id} />
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
