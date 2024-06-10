import React, { useState, useEffect } from "react";
import { CardBody, Button, Spinner } from "@nextui-org/react";
import { PhoneIcon, MapPin, BookmarkIcon, RupeeIcon } from "./Icons";
import { useRouter } from "next/navigation";

// Define the interface for the venue details
interface VenueDetails {
  phone: string;
  address: string;
  amenities: string[];
  startingPrice: number;
}

// Define the props interface for VenueInfo
interface VenueInfoProps {
  id: string;
}

export const VenueInfo: React.FC<VenueInfoProps> = ({ id }) => {
  const [venueDetails, setVenueDetails] = useState<VenueDetails | null>(null);
  const router = useRouter();

  console.log("afaf");

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/getdetails?id=${id}`
        ); // Use the id prop in the fetch URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: VenueDetails = await response.json(); // Type the response data
        setVenueDetails(data);
      } catch (error) {
        console.error("Failed to fetch venue details:", error);
      }
    };

    fetchVenueDetails();
  }, [id]); // Add id as a dependency to refetch if it changes

  if (!venueDetails) {
    return <Spinner/>; // Show a loading message while the data is being fetched
  }

  const { phone, address, amenities, startingPrice } = venueDetails;

  return (
    <>
      <CardBody>
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
            <span className="text-green-600"> Rs. {startingPrice}</span>
          </p>
        </div>
      </CardBody>
      <CardBody>
        <Button
          color="secondary"
          radius="md"
          size="md"
          onClick={() => router.push("/venue/booking")}
        >
          Book Now
        </Button>
      </CardBody>
    </>
  );
};
