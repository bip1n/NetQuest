"use client"
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Link,
} from "@nextui-org/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { UserNavigationbar } from "@/components/UserNavigationbar";
import { FooterContent } from "@/components/Footer";
import { Logo } from "@/components/Icons";

export default function UserBooking() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pastBookings, setPastBookings] = useState([]);
  const [futureOrPresentBookings, setFutureOrPresentBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null); // State for selected booking
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null); // State for user's name
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("__securedAccess");

      if (!token) {
        router.push('/'); // Redirect to home page if the token is not found
        return;
      }

      try {
        // Fetch user name
        const userNameResponse = await fetch("http://localhost:4000/api/getUserName", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!userNameResponse.ok) {
          const errorResponse = await userNameResponse.json();
          setError(errorResponse.error);
          return;
        }

        const userNameData = await userNameResponse.json();
        setUserName(userNameData.username);

        // Fetch bookings
        const bookingsResponse = await fetch("http://localhost:4000/api/getBooking", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!bookingsResponse.ok) {
          const errorResponse = await bookingsResponse.json();
          setError(errorResponse.error);
          return;
        }

        const bookingsData = await bookingsResponse.json();
        setPastBookings(bookingsData.pastBookings);
        setFutureOrPresentBookings(bookingsData.futureOrPresentBookings);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [router]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  

  const handleOpenModal = (booking : string) => {
    setSelectedBooking(booking);
    // onOpen();
  };

  return (
    <>
      
      {/* Future or Present Bookings */}
      <Card className="mx-4 mt-4">
        <CardHeader>
          <p className="text-semibold text-secondary font-medium">
            Active Booking
          </p>
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
              {futureOrPresentBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    <div>
                      <p className="uppercase">{booking.venueName}</p>
                      <p className="font-small">{booking.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.price}</TableCell>
                  <TableCell>
                    <Chip size="sm" color={getStatusColor(booking.status)}>
                      {booking.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                  <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="bordered" size="sm" onClick={() => handleOpenModal(booking)}>Ticket</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        
                          <DialogContent>
                          {selectedBooking && (
                            <>
                            <DialogHeader>
                            <DialogTitle> 
                              <div className="flex flex-row">
                                <Logo/> <span className="mt-2">NetQuest</span>
                              </div>
                            </DialogTitle>
                            
                            <DialogDescription>
                              You can screenshot this ticket for future reference.
                            </DialogDescription>
                          </DialogHeader>

                            <div className="flex justify-between m-2">
                            <p className="text-xs font-normal">Booking ID: {selectedBooking._id}</p>
                            <p className="text-xs font-bold">Date: {new Date(selectedBooking.bookedAt).toLocaleDateString()}</p>
                          </div>
                          <Divider />
                          <div className="flex justify-between mt-4">
                            <p className="font-normal text-sm italic">Venue</p>
                            <p className="text-semibold font-medium">{selectedBooking.venueName}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-normal text-sm italic">Location</p>
                            <p className="text-semibold font-medium">{selectedBooking.location}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-normal text-sm italic">Date</p>
                            <p className="text-semibold font-medium">{new Date(selectedBooking.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-normal text-sm italic">Time</p>
                            <p className="text-semibold font-medium">{selectedBooking.time}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-normal text-sm italic">Rate</p>
                            <p className="text-semibold font-medium">{selectedBooking.price}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-normal text-sm italic">Status</p>
                            <p className="text-semibold text-success">{selectedBooking.status}</p>
                          </div>
                            </>
                          )}
                          </DialogContent>
                     
                        
                        <DialogFooter>
                          <Button type="submit">Print</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      {/* Past Bookings */}
      <Card className="mt-8 mx-4">
        <CardHeader>
          <p className="text-semibold text-secondary font-medium">
            Booking Records
          </p>
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
              {pastBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>
                    <div>
                      <p className="uppercase">{booking.venueName}</p>
                      <p className="font-small">{booking.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.price}</TableCell>
                  <TableCell>
                    <Chip size="sm" color={getStatusColor(booking.status)}>
                      {booking.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                     <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="bordered" size="sm" onClick={() => handleOpenModal(booking)}>Ticket</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        
                          <DialogContent>
                          {selectedBooking && (
                            <>
                            <DialogHeader>
                            <DialogTitle> 
                              <div className="flex flex-row">
                                <Logo/> <span className="mt-2">NetQuest</span>
                              </div>
                            </DialogTitle>
                            
                            <DialogDescription>
                              You can screenshot this ticket for future reference.
                            </DialogDescription>
                          </DialogHeader>

                            <div className="flex justify-between m-2">
                            <p className="text-xs font-normal">Booking ID: {selectedBooking._id}</p>
                            <p className="text-xs font-bold">Date: {new Date(selectedBooking.bookedAt).toLocaleDateString()}</p>
                          </div>
                          <Divider />
                          <div className="flex justify-between mt-4">
                            <p className="font-normal text-sm italic">Venue</p>
                            <p className="text-semibold font-medium">{selectedBooking.venueName}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-normal text-sm italic">Location</p>
                            <p className="text-semibold font-medium">{selectedBooking.location}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-normal text-sm italic">Date</p>
                            <p className="text-semibold font-medium">{new Date(selectedBooking.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-normal text-sm italic">Time</p>
                            <p className="text-semibold font-medium">{selectedBooking.time}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-normal text-sm italic">Rate</p>
                            <p className="text-semibold font-medium">{selectedBooking.price}</p>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="font-normal text-sm italic">Status</p>
                            <p className="text-semibold text-success">{selectedBooking.status}</p>
                          </div>
                            </>
                          )}
                          </DialogContent>
                     
                        
                        <DialogFooter>
                          <Button type="submit">Print</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <FooterContent />
    </>
  );
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "booked":
      return "success";
    case "canceled":
      return "danger";
    case "available":
    case "reserved":
      return "warning";
    default:
      return "default";
  }
}
