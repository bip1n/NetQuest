"use client"; // Indicates this is a client-side component
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
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { UserNavigationbar } from "@/components/UserNavigationbar";
import { FooterContent } from "@/components/Footer";
import { Logo } from "@/components/Icons";

export default function UserBooking() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [pastBookings, setPastBookings] = useState([]);
  const [futureOrPresentBookings, setFutureOrPresentBookings] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = Cookies.get("__securedAccess");

      if (!token) {
        router.push('/'); // Redirect to home page if the token is not found
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/getBooking", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          setError(errorResponse.error);
        } else {
          const responseData = await response.json();
          setPastBookings(responseData.pastBookings);
          setFutureOrPresentBookings(responseData.futureOrPresentBookings);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again later.");
      }
    };

    if (typeof window !== "undefined") {
      fetchBookings();
    }
  }, [router]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <UserNavigationbar />
      <p className="text-semibold text-warning-500 text-sm italic ml-4">
        **Open in Landscape for better view.**
      </p>
      
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
                    <Button variant="bordered" size="sm" onPress={onOpen}>
                      Ticket
                    </Button>
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
                    <Button variant="bordered" size="sm" onPress={onOpen}>
                      Ticket
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Modal
        size="md"
        isOpen={isOpen}
        backdrop="opaque"
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {/* <Link color="foreground" href="/"> */}
                  <span>
                    <Logo />
                    <p className="font-bold text-inherit mt-1">NetQuest</p>
                  </span>
                {/* </Link> */}
              </ModalHeader>
              <ModalBody>
                <Card>
                  <CardBody>
                    <div className="flex justify-between m-2">
                      <p className="text-xs font-normal">Booking ID: 123456</p>
                      <p className="text-xs font-bold">Date: 12-24-2024</p>
                    </div>
                    <Divider />
                    <div className="flex justify-between mt-4">
                      <p className="font-normal text-sm italic">Venue</p>
                      <p className="text-semibold font-medium">Kick Futsal</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm italic">Location</p>
                      <p className="text-semibold font-medium">
                        Balkumari, Lalitpur
                      </p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm italic">Date</p>
                      <p className="text-semibold font-medium">12-29-2024</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm italic">Time</p>
                      <p className="text-semibold font-medium">2 PM</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm italic">Rate</p>
                      <p className="text-semibold font-medium">Rs. 1200</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm italic">Status</p>
                      <p className="text-semibold text-success">Booked</p>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="flex justify-between">
                      <p className="font-normal text-sm italic">Name</p>
                      <p className="text-semibold font-medium">Ram Bahadur</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm italic">Contact</p>
                      <p className="text-semibold font-medium">9876543210</p>
                    </div>
                  </CardBody>
                </Card>
              </ModalBody>
              <div>
                <p className="ml-8 text-tiny text-warning italic">
                  Screenshot this for future reference.
                </p>
              </div>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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
