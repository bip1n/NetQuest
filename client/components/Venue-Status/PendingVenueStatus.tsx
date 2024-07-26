"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeIcon } from "../Icons";
import { Button } from '../ui/button';
import { useRouter } from "next/navigation";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Cookies from 'js-cookie';


type Venue = {
  _id: string;
  owner_id: string;
  images: string[];
  venueID: string;
  status: 'active' | 'rejected' | 'pending';
};

const columns = [
  { name: "OWNER", uid: "ownerID" },
  { name: "VENUE", uid: "venueID" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const PendingVenueStatus: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const router = useRouter();


  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/getPendingVenue", {
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
        console.log(data);
      } catch (error) {
        console.error('Error fetching venue data:', error);
      }
    };

    fetchVenues();
  }, []);

  const handleAction = async (venueId: string, status: string) => {
    try {
      const token = Cookies.get('__securedAccess');
      const response = await fetch("http://localhost:4000/api/changeStatus", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ venueId, status })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      window.location.reload();
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
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="link" 
                >
                  <EditIcon/>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Action event example" 
                onAction={(key) => handleAction(venue._id, key)}
              >
                <DropdownItem key="verified" className="text-success" color="success">Accepted</DropdownItem>
                <DropdownItem key="pending" className="text-warning" color="warning">Pending</DropdownItem>
                <DropdownItem key="rejected" className="text-danger" color="danger">Reject Venue</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Tooltip>
        </div>
      );
    }

    const cellValue = venue[columnKey as keyof Venue];

    switch (columnKey) {
      case "ownerID":
        return (
          <User
          avatarProps={{ radius: "lg", src: venue.images }}
          name={venue.fullname}
          description= {venue.email}
          >
          </User>
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
          <Chip className="capitalize" color="warning" size="sm" variant="solid">
            {cellValue || 'pending'}
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
