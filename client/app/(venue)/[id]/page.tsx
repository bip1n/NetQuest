"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Flame,
  Home,
  LineChart,
  MapPin,
  Package,
  Package2,
  PanelLeft,
  PhoneCall,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Upload,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { UserNavigationbar } from "@/components/UserNavigationbar"
import Booking from "@/components/Booking";
import { FooterContent } from "@/components/Footer";

const Venue = () => {

  const { id } = useParams(); // Get the dynamic route parameter

  const [venue, setVenue] = useState<string | null>(null);
  const [VenueDetails, setVenueDetails] = useState<string[]>([]);
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

  useEffect(() => {
    const VenueDetails = async () => {
      if (!id) {
        return;
      }
      console.log(id);
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/VenueDetails?owner_id=${id}`, {
          method: "GET",
        });
        
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || "Failed to fetch data");
        }

        const VenueDetails = await response.json();
        console.log(VenueDetails.amenities);
        setVenueDetails(VenueDetails.amenities);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setError("An error occurred while fetching venue data.");
        setLoading(true); 
      }
    };
    VenueDetails();
  }, [id]);

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
          {/* <div className="mx-auto grid max-w-[65rem] flex-1 auto-rows-max gap-4"> */}
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                {/* <Card x-chunk="dashboard-07-chunk-0"> */}
                  {/* <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          defaultValue="Gamer Gear Pro Controller"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </CardContent> */}
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
                              {VenueDetails.length > 0 && VenueDetails.map((amenity, index) => (
                                <div key={index} className="px-2 py-1 rounded">
                                  {amenity}
                                  <Separator  orientation="vertical"/>
                                </div>
                              ))}
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