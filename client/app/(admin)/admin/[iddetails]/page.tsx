"use client";

import React, { useEffect, useState } from "react";
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


const mediaData = [
    { type: 'image', url: 'https://images.unsplash.com/photo-1562819945-cbc762ef76ad?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1562819945-cbc762ef76ad?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1562819945-cbc762ef76ad?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    
    { type: 'video', url: '' },
    // Add more media objects here
  ];

const Venue = () => {
  const { id } = useParams(); 
  const [venue, setVenue] = useState(null);
  const [venueDetails, setVenueDetails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40"> 
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-4">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase">Name of Venue: </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Owner:</p>
                    <p>Contact Number:</p>
                    <p>Email:</p>
                    <p>PAN:</p>
                    <p>Opening Rate:</p>
                    <p>Location:</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase">Submitted Images</CardTitle>
                </CardHeader>
                <CardContent>
                
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {mediaData.map((media, index) => (
                        <div key={index} className="w-full">
                        {media.type === 'image' ? (
                            <img
                            src={media.url}
                            alt={`Media ${index + 1}`}
                            className="w-full h-auto object-cover"
                            />
                        ) : media.type === 'video' ? (
                            <video
                            controls
                            src={media.url}
                            className="w-full h-auto object-cover"
                            />
                        ) : null}
                        </div>
                    ))}
                    </div>
                
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Venue;