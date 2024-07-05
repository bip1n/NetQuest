"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UserNavigationbar } from "@/components/UserNavigationbar";
import { FooterContent } from "@/components/Footer";
import VenueInfo from "@/components/VenueInfo"; // Correct the import if it's a default export
import {
  Card,
  CardHeader,
  Image,
  CardBody,
  Tabs,
  Tab,
  Link,
  
} from "@nextui-org/react";
import { MessageIcon, GalleryIcon, VenueIcon, ClickedDoubledownIcon } from "@/components/Icons";
import Slider from "@/components/Slider";


interface Venue {
  venueName: string;
  rating: number;
  profilepic: string;
  owner: any; // Replace with appropriate type if available
}

const images = [
  'https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci8yYTk2OTU5MTlkMTlmYmYyNTg3MTA0MjViYjQxODY0ND9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.uM5PemWdQqVkVc10mz0AJekv9N_IKrOw1bMlqqul-qM',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
  'https://via.placeholder.com/300',
];



const VenueProfile = () => {
  const { id } = useParams(); // Get the dynamic route parameter
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenue = async () => {
      if (!id) {
        return;
      }
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
    return <div>...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <UserNavigationbar />
    
     
     <div className="w-100 md:mx-10 mx-0">
         {venue ? (
          <>
          <Card className="py-4 mt-2">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-between">
              <h4 className="font-semibold uppercase text-medium">
                {venue.venueName}{" "}
                <Link href='/venue/${venueId}/review'><span className="text-xs ml-2 text-blue-500"> [{venue.rating}/5]</span> </Link>
              </h4>
            </CardHeader>
            <Slider/>
            <VenueInfo venueId={id as string} />
          </Card>
        </>
      ) : (
        <div>No venue data found</div>
      )}
      </div>
      
      <FooterContent />
    </>
  );
};

export default VenueProfile;
