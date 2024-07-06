import React, { useState, useEffect } from "react";
import { CardBody, Button, Spinner } from "@nextui-org/react";
import { PhoneIcon, MapPin, BookmarkIcon, RupeeIcon } from "./Icons";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import Cookies library

// Define the interface for the venue details
interface VenueDetails {
  phone: string;
  address: string;
  amenities: string[];
  startingPrice: number;
  venueName: string;
}

export default function VenueInfo(props: { venueId: any }) {
  const { venueId } = props;
  const [venueDetails, setVenueDetails] = useState<VenueDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track login status
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = Cookies.get("__securedAccess");
      if (token) {
        try {
          const response = await fetch("http://localhost:4000/api/isUserLoggedIn", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            setError(errorResponse.error);
          } else {
            setIsLoggedIn(true); // Set login status to true if user is logged in
          }
        } catch (error) {
          console.error("Error fetching user login status:", error);
        }
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []); // Empty dependency array to fetch login status only once

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

  return (
    <>
      <CardBody>
        <div className="flex items-center">
          {/* <PhoneIcon className="w-6 h-6" /> */}
          <a
            href={`tel:${venueName}`}
            className="font-semibold text-medium ml-2 hover:underline text-blue-700"
          >
            {venueName}
          </a>
        </div>
        <div className="flex items-center">
          <PhoneIcon className="w-6 h-6" />
          <a
            href={`tel:${phone}`}
            className="font-semibold text-medium ml-2 hover:underline text-blue-700"
          >
            {phone}
          </a>
        </div>
        <div className="flex items-center mt-1">
          <MapPin className="w-6 h-6" />
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-medium ml-2 hover:underline text-blue-700"
          >
            {address}
          </a>
        </div>
        <div className="flex items-center mt-1">
          <BookmarkIcon className="w-6 h-6" />
          <p className="font-semibold ml-2">Facilities</p>
        </div>
        <ul className="ml-10">
          {amenities.map((amenity: string, index: number) => (
            <li key={index} className="list-disc">
              <p className="text-sm">{amenity}</p>
            </li>
          ))}
        </ul>
        <div className="flex items-center mt-1">
          <RupeeIcon className="w-6 h-6" />
          <p className="text-medium ml-1">
            Starting From{" "}
            <span className="text-green-600">Rs. {startingPrice}</span>
          </p>
        </div>
      </CardBody>

      {isLoggedIn ? (
        <CardBody>
          <Button
            color="secondary"
            radius="md"
            size="md"
            onClick={() => router.push(`/venue/${venueId}/booking`)}
          >
            Book Now
          </Button>
        </CardBody>
      ) : (
        <div> <span className="italic text-danger-500"> Please login to book this venue</span></div>
      )}
    </>
  );
}
