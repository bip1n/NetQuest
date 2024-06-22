  "use client";
  import React, { useEffect, useState } from 'react';
  import { useRouter } from "next/navigation";
  import { UserNavigationbar } from "@/components/UserNavigationbar";
  import { Searchbar } from "@/components/Searchbar";
  import { FooterContent } from '@/components/Footer';
  import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Skeleton,
  } from '@nextui-org/react';

  interface Venue {
  _id: number;
  venueName: string;
  location: string;
  rating: number;
  price: number;
  profilepic: string;
  }

    const HomePage = () => {
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
        setError(errorResponse.error || 'Failed to fetch data');
        setLoading(false); // <-- Update loading state
      } else {
        const responseData = await response.json();
        console.log(responseData);
        setVenues(responseData.owners);
        setLoading(false);
      }
      } catch (error) {
        console.error("Error fetching venue data:", error);
        setError("An error occurred while fetching venue data.");
        setLoading(false); // <-- Update loading state
      }
    };

    fetchVenues();
  }, []);

  return (
    <>
      <UserNavigationbar />
      <Searchbar />

      <Card className='mt-4'>
        <CardHeader>
          <p className='text-xl text-secondary font-semibold ml-4'>Top Rated</p>
        </CardHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <CardBody>
                  <Skeleton className="flex rounded-lg w-full h-full" />
                </CardBody>
                <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
                  <Skeleton className="h-5 mb-2 w-full rounded-lg" />
                  <Skeleton className="h-4 mb-2 w-full rounded-lg" />
                  <Skeleton className="h-4 mb-2 w-full rounded-lg" />
                </CardFooter>
              </Card>
            ))
          ) : (
            venues.map((venue) => (
              <Card key={venue._id}>
                <CardBody>
                  <Image
                    isBlurred
                    height={"100%"}
                    width={"100%"}
                    src={venue.profilepic}
                  />
                </CardBody>
                <CardFooter className="pb-0 pt-2 px-4 flex flex-col items-start">
                  <h4 className="font-semibold text-large uppercase">
                    {venue.venueName} <span><small className="text-primary-500 mb-2 text-tiny">[{venue.rating}/5]</small></span>
                  </h4>

                  <div className="w-full flex items-center justify-between mb-2">
                    <div>
                      <p className="text-default-600 text-small">{venue.location}</p>
                      <p className="text-default-600 text-small">Starting from <span className='text-success'> Rs.{venue.price}</span></p>
                    </div>

                    <Button
                      color="primary"
                      radius="full"
                      size="sm"
                      variant="solid"
                      onClick={() => router.push(`venue/profile/${venue._id}`)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
        {error && !loading && (
          <div className="text-center text-red-500 mt-4">
            {error}
          </div>
        )}
      </Card>

      <FooterContent />
    </>
  );
};

export default HomePage;
