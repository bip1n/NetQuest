"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mediaData = [
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1562819945-cbc762ef76ad?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1562819945-cbc762ef76ad?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1562819945-cbc762ef76ad?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  { type: "video", url: "https://valid-video-url.com/video.mp4" }, // Ensure this URL is valid
];

interface Params {
  iddetails: string;
}

const Venue: React.FC = () => {
  const router = useRouter();
  const { iddetails } = useParams<{ iddetails: string }>();
  const [id, setId] = useState("");
  const [venueDetails, setVenueDetails] = useState<any>(null); // Adjust type based on actual response
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (iddetails) {
      const extractedId = iddetails.split("-")[0];
      setId(extractedId);
    }
    const fetchVenueData = async () => {
      if (!id) return;
      try {
        setLoading(true);

        const venueDetailsRes = await fetch(
          `http://localhost:4000/api/VenueDetails?owner_id=${id}`
        );

        if (!venueDetailsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const venueDetailsData = await venueDetailsRes.json();
        setVenueDetails(venueDetailsData);
        console.log(venueDetailsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching venue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenueData();
  }, [id, iddetails]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-success-500"; // Tailwind CSS class for green text
      case "pending":
        return "text-warning"; // Tailwind CSS class for orange text
      case "rejected":
        return "text-danger"; // Tailwind CSS class for red text
      default:
        return ""; // Default text color
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-4">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase">
                    Name of Venue: {venueDetails?.Venues}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Venue ID:{" "}
                    <span className="font-bold">{venueDetails?.venueID}</span>
                  </p>
                  <p>Owner: {venueDetails?.fullname} </p>
                  <p>
                    Registerd Date:{" "}
                    {new Date(venueDetails?.registerdate).toLocaleDateString()}{" "}
                  </p>
                  <p>Contact Number: {venueDetails?.phone} </p>
                  <p>Email: {venueDetails?.email}</p>
                  <p>PAN: {venueDetails?.panNumber}</p>
                  <p>Opening Rate: {venueDetails?.rate}</p>
                  <p>Location: {venueDetails?.address}</p>

                  <p>
                    Status:{" "}
                    <span className="uppercase">
                      {" "}
                      <span className={getStatusColor(venueDetails?.status)}>
                        {venueDetails?.status}
                      </span>
                    </span>{" "}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="uppercase">Submitted Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {venueDetails?.media.map((media, index) => (
                      <div key={index} className="w-full">
                        {media.type === "image" ? (
                          <img
                            src={media.url}
                            alt={`Media ${index + 1}`}
                            className="w-full h-auto object-cover"
                          />
                        ) : media.type === "video" ? (
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
};

export default Venue;
