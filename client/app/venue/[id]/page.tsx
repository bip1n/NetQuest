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
import { MessageIcon, GalleryIcon, VenueIcon } from "@/components/Icons";
import Slider from "@/components/Slider";

interface Venue {
  venueName: string;
  rating: number;
  profilepic: string;
  owner: any; // Replace with appropriate type if available
}

const VenueProfile = () => {
  const { id } = useParams(); // Get the dynamic route parameter

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
                  {/* Pass the venue ID to VenueInfo */}
                  <VenueInfo venueId={id as string} />
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
                  <Slider venueId={id as string} />
                </Tab>
              </Tabs>
            </div>
          </Card>
        </div>
      ) : (
        <div>No venue data found</div>
      )}
      <FooterContent />
    </>
  );
};

export default VenueProfile;
