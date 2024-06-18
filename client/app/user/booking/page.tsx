"use client"
import React from "react";
import {Card,CardBody,CardFooter,CardHeader,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,Chip,Button} from "@nextui-org/react";
import { UserNavigationbar } from "@/components/UserNavigationbar";
import { FooterContent } from "@/components/Footer";
export default function UserBooking() {
  return (
    <>
    <UserNavigationbar/>   
    <p className="text-semibold text-warning-500 text-sm italic ml-4">**Open in Landscape for better view.**</p>
    <Card className="mx-4 mt-4">
      
      <CardHeader>
        <p className="text-semibold text-secondary font-medium">Active Booking</p>
      </CardHeader>
      <CardBody>
      <Table isStriped removeWrapper>
      <TableHeader>
        <TableColumn>VENUE</TableColumn>
        <TableColumn>DATE</TableColumn>
        <TableColumn>TIME</TableColumn>
        <TableColumn>RATE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>TICKET</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Kick Futsal, Lalitpur</TableCell>
          <TableCell>June 19, 2024</TableCell>
          <TableCell>10 AM</TableCell>
          <TableCell>1200</TableCell>

          <TableCell><Chip size="sm" color="success">Booked</Chip></TableCell>
          <TableCell><Button variant="bordered" size="sm">Ticket</Button></TableCell>
        </TableRow>
      </TableBody>
    </Table>
      </CardBody>
   
      </Card>
      <Card className="mt-8 mx-4">
      <CardHeader>
      <p className="text-semibold text-secondary font-medium">Booking Records </p>
      </CardHeader>
      <CardBody>
      <Table isStriped removeWrapper>
      <TableHeader>
        <TableColumn>VENUE</TableColumn>
        <TableColumn>DATE</TableColumn>
        <TableColumn>TIME</TableColumn>
        <TableColumn>RATE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>TICKET</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
        <TableCell>Receive Futsal,Kathmandu</TableCell>
          <TableCell>May 1, 2024</TableCell>
          <TableCell>8 AM</TableCell>
          <TableCell>1300</TableCell>
          <TableCell><Chip size="sm" color="danger">Canceled</Chip></TableCell>
          <TableCell><Button variant="bordered" size="sm">Ticket</Button></TableCell>
        </TableRow>
        <TableRow key="2">
        <TableCell>What Futsal,Lalitpur</TableCell>
          <TableCell>June 9, 2024</TableCell>
          <TableCell>1 PM</TableCell>
          <TableCell>1400</TableCell>
          <TableCell><Chip size="sm" color="warning">Reserved</Chip></TableCell>
          <TableCell><Button variant="bordered" size="sm">Ticket</Button></TableCell>
        </TableRow>
      </TableBody>
    </Table>
      </CardBody>
      </Card>
    <FooterContent/>
    </>
  );
}
