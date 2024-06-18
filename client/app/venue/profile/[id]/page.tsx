"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserNavigationbar } from "@/components/UserNavigationbar";
import { FooterContent } from "@/components/Footer";
import { Reviews } from "@/components/Reviews";
import { Booking } from "@/components/Booking";
import { VenueInfo } from "@/components/VenueInfo";
import {
  Button,
  Card,
  CardHeader,
  Image,
  CardBody,
  ScrollShadow,
  Link,
  Tabs,
  CardFooter,
  Tab,
  Chip,
} from "@nextui-org/react";
import { MessageIcon, GalleryIcon, VenueIcon } from "@/components/Icons";
import { Slider } from "@/components/Slider";

export default function VenueProfile() {
  const router = useRouter();
  // console.log("asfhasf",router)
  // const { id } = router.query;

  const getModifiedUrl = () => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname; // Get the path part of the URL
      const segments = currentPath.split('/'); // Split the path into segments
      const extractedId = segments[segments.length - 1]; // The last segment is the ID

      return `${extractedId}`; // Construct the new URL
    }
    return '';
  };

  const id = getModifiedUrl();

  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (!id) {
      // If id is undefined, do not proceed with the fetch.
      return;
    }

    const fetchVenue = async () => {
      // try {
      //   setLoading(true); // Start loading
      //   const response = await fetch(`/api/venues/${id}`);

      //   if (!response.ok) {
      //     const errorResponse = await response.json();
      //     setError(errorResponse.error || 'Failed to fetch data');
      //   } else {
      //     const responseData = await response.json();
      //     setVenue(responseData);
      //   }
      // } catch (error) {
      //   console.error("Error fetching venue data:", error);
      //   setError("An error occurred while fetching venue data.");
      // } finally {
      //   setLoading(false); // End loading
      // }


      try {
        const response = await fetch(`http://localhost:4000/api/venues/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          setError(errorResponse.error || 'Failed to fetch data');
        } else {
          const responseData = await response.json();
          console.log("responseData", responseData.owner);  
          setVenue(responseData.owner);
        }
      } catch (error) {
        // setError("An error occurred while fetching user details.");
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }


    };

    fetchVenue();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <UserNavigationbar />
      {venue ? (
        <div>
          <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-between">
              <h4 className="font-semibold uppercase text-medium">
                {venue.venueName}{" "}
                <span className="text-xs ml-2 text-blue-500"> [{venue.rating}/5]</span>
              </h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2 max-w-lg">
              <Image
                isZoomed
                alt="Venue Image"
                src={venue.profilepic} // Ensure your venue data includes an image URL
              />
            </CardBody>
          </Card>
        
          <Card className="w-full max-w-[100%] md:max-w-[600px] mt-2">
            <div className="flex w-full flex-col">
              <Tabs aria-label="Options" color="secondary" variant="underlined">
                <Tab
                  key="about"
                  title={
                    <div className="flex items-center space-x-2">
                      <VenueIcon className="w-6 h-6" />
                      <span>About</span>
                    </div>
                  }
                >
                  {/* Pass the venue data to VenueInfo */}
                  id: {id}
                  <VenueInfo venueId={id} />
                </Tab>
                <Tab
                  key="reviews"
                  title={
                    <div className="flex items-center space-x-2">
                      <MessageIcon className="w-2 h-6" />
                      <span>Reviews</span>
                    </div>
                  }
                >
                  {/* Pass the venue ID to Reviews */}
                  <Reviews/>
                  <Link href={`/venue/reviews/${id}`} className="ml-3 text-sm">
                    Read More...
                  </Link>
                </Tab>
                <Tab
                  key="photos"
                  title={
                    <div className="flex items-center space-x-2">
                      <GalleryIcon />
                      <span>Photos</span>
                    </div>
                  }
                >
                  {/* Pass the venue ID to Slider */}
                  <Slider venueId={id} />
                </Tab>
              </Tabs>
            </div>
          </Card>
        </div>
      ) : (<div>Loading...</div>)}
      <FooterContent />
    </>
  );
}
