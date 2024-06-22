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

export default function VenueInfo (props: { venueId: any; }) {
  const { venueId } = props;
  const [venueDetails, setVenueDetails] = useState<VenueDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/venuedetails?owner_id=${venueId}`);
        if (!response.ok) {
          setError("error");
        }
        const data: VenueDetails = await response.json();
        setVenueDetails(data);
        setLoading(false); // Data fetched successfully, set loading to false
      } catch (error) {
        setError(error.error);
        setLoading(false); // On error, set loading to false
        console.error("Failed to fetch venue details:", error);
      }
    };

    fetchVenueDetails();
  }, [venueId]); // Fetch data whenever the venueId changes

  if (loading) {
    return <Spinner />; // Show a loading spinner while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if data fetching fails
  }

  if (!venueDetails) {
    return <div>No venue details available</div>; // Show a message if no venue details are available
  }

  const { phone, address, amenities, startingPrice } = venueDetails;

  console.log('venueDetails:', venueDetails);
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
            <span className="text-green-600">Rs. {startingPrice}</span>
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

// export default VenueInfo;
