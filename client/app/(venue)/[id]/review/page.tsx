"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, Textarea, Spinner } from "@nextui-org/react";
import { Reviews } from "@/components/Reviews";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";

export default function ReviewsPage() {
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { id } = useParams();

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
          } 
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unexpected error occurred");
          }
          console.error("Error fetching user login status:", error);
        }
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    const token = Cookies.get("__securedAccess");
    try {
      const response = await fetch("http://localhost:4000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ review: reviewText, owner_id: id }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to submit review");
      }

      setReviewText("");
      setSuccess("Review successfully added!");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Failed to submit review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Card className="w-full max-w-[100%] md:max-w-[800px] mt-4">
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Textarea
                label="Description"
                placeholder="Enter your description"
                className="max-w"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                disabled={isLoading}
              />
              <Button
                className="m-2 w-1/3 md:w-1/5"
                color="primary"
                variant="solid"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Add Review"}
              </Button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
          </CardBody>
          <CardBody>
            <h4 className="font-medium text-lg">Reviews</h4>
          </CardBody>
          <Reviews ownerId={id} />
        </Card>
      </div>
    </>
  );
}
