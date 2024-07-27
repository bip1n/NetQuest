"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { CardBody } from "@nextui-org/react";
import { Skeleton } from "./ui/skeleton";

interface Venue {
    _id: number;
    venueName: string;
    mapCoord: string;
    rating: number;
    price: number;
    profilepic: string;
  }

const Venue = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [venues, setVenues] = useState<Venue[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVenues = async () => {
          try {
            const response = await fetch("http://localhost:4000/api/getVenue", {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
    
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.error || "Failed to fetch data");
            }
    
            const responseData = await response.json();
            setVenues(responseData.owners);
            console.log(responseData.owners);
          } catch (error) {
            setError("An error occurred while fetching venue data.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchVenues();
      }, []);

      

  return (
          <div className="grid gap-8  md:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading
            ? Array.from({ length:4}).map((_, index) => (
                <Card key={index}>
                  Loading...
                  {/* <CardBody>
                    <Skeleton className="flex rounded-lg w-full h-full" />
                  </CardBody>
                  <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                    <Skeleton className="h-5 mb-2 w-full rounded-lg" />
                    <Skeleton className="h-4 mb-2 w-full rounded-lg" />
                    <Skeleton className="h-4 mb-2 w-full rounded-lg" />
                  </CardFooter> */}
                </Card>
              ))
            : venues.map((venue) => (
            
            <Card x-chunk="dashboard-01-chunk-0" onClick={() => router.push(`/${venue._id}`)} className="cursor-pointer">
                <div className="flex flex-row items-center justify-end space-y-0 p-2 mr-1">
                    <Heart className="w-5 text-muted-foreground" />
                </div>
                <CardContent>
                    <div className="w-full h-48 overflow-hidden relative">
                        <Image
                            src={venue.profilepic}
                            alt="Transaction"
                            layout="intrinsic"
                            width={500}
                            height={300}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </CardContent>
                <CardContent>
                    <div>
                        <div className="text-lg font-medium flex flex-row uppercase">
                            <div className="flex space-x-2">
                                <span>{venue.venueName}</span>
                                <span className="text-xs text-primary-500">[{venue.rating}/5]</span>
                            </div>
                        </div>
                        <div className="text-sm font-normal flex flex-row uppercase">
                            {venue.mapCoord}
                        </div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>
                            <p className="font-light text-sm">
                            Starting from{" "}
                            <span className="text-success">
                                {" "}
                                Rs.{venue.price}
                            </span>
                            </p>
                        </div>
                        <div>
                            <Button variant="default" size="sm" className="ml-auto gap-1 color-red" onClick={() => router.push(`/${venue._id}`)}>                              
                                    Book Now
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            ))}
             {error && !loading && (
                <div className="text-center text-red-500 mt-4">{error}</div>
                )}
          </div>
  );
};

export default Venue;
