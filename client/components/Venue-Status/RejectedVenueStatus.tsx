"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeIcon } from "../Icons";
import { Button } from '../ui/button';
import { useRouter } from "next/navigation";

type Venue = {
  _id: string;
  owner_id: string;
  images: string[];
  venueID: string;
  status: 'active' | 'rejected' | 'pending';
  fullname?: string;
  email?: string;
  venueName?: string;
  location?: string;
};

const columns = [
  { name: "OWNER", uid: "ownerID" },
  { name: "VENUE", uid: "venueID" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: { [key in Venue['status']]: 'success' | 'danger' | 'primary' } = {
  active: "success",
  rejected: "danger",
  pending: "primary",
};

export const RejectedVenueStatus: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const router = useRouter();

  
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/getrejectVenue", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({})
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Venue[] = await response.json();
        setVenues(data);
      } catch (error) {
        console.error('Error fetching venue data:', error);
      }
    };

    fetchVenues();
  }, []);

  const handleVerify = async (id: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/verifyVenue", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the venues state after verification
      setVenues(venues.map(venue => venue._id === id ? { ...venue, status: 'active' } : venue));
    } catch (error) {
      console.error('Error verifying venue:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch("http://localhost:4000/api/rejectVenue", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Update the venues state after rejection
      setVenues(venues.map(venue => venue._id === id ? { ...venue, status: 'rejected' } : venue));
    } catch (error) {
      console.error('Error rejecting venue:', error);
    }
  };

  const renderCell = useCallback((venue: Venue, columnKey: string) => {
    if (columnKey === "actions") {
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Button variant="link" size="icon" onClick={() => router.push(`/admin/${venue.owner_id}-details`)}><EyeIcon /></Button>
            </span>
          </Tooltip>
          <Tooltip content="Edit">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleVerify(venue._id)}>
              <EditIcon />
            </span>
          </Tooltip>
        </div>
      );
    }

    const cellValue = venue[columnKey as keyof Venue];
    switch (columnKey) {
      case "ownerID":
        return (
          <User
            avatarProps={{ radius: "lg", src: venue.images[0] }}
            name={venue.fullname}
            description={venue.email}
          />
        );
      case "venueID":
        return (
          <>
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{venue.venueName}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{venue.location}</p>
            </div>
          </>
        );
      case "status":
        return (
          <Chip className="capitalize" color={'danger'} size="sm" variant="solid">
            {cellValue || 'rejected'}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, [venues]);

  return (
    <Table removeWrapper aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={venues}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, String(columnKey))}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
