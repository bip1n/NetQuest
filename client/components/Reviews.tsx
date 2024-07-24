"use client";

import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Avatar, Skeleton } from "@nextui-org/react";

export const Reviews = ({ ownerId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/getReviews/${ownerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [ownerId]);

  if (isLoading) {
    return (
      <>
        <Skeleton className="flex rounded-full w-12 h-12" />
        <Skeleton className="h-3 w-1/5 rounded-lg" />
        <Skeleton className="h-3 w-1/5 rounded-lg" />
        <Skeleton className="h-4 w-5/5 rounded-lg" />
      </>
    );
  }

  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card key={review._id} className="ml-1.5 mr-1.5 mb-1.5 mt-0">
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src={review.user.avatar} />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {review.user.name}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-400">@{review.user.username}</h5>
                </div>
              </div>
            </CardHeader>
            <CardBody className="px-3 py-0 text-small">
              <p className="text-wrap text-left">{review.content}</p>
            </CardBody>
          </Card>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
    </>
  );
};
