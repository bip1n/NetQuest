"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Table,
  TableHeader,
  Link,
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
} from "@nextui-org/react";
import { UserNavigationbar } from "@/components/UserNavigationbar";
import { FooterContent } from "@/components/Footer";
import { Logo } from "@/components/Icons";
export default function UserBooking() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <UserNavigationbar />
      <p className="text-semibold text-warning-500 text-sm italic ml-4">
        **Open in Landscape for better view.**
      </p>
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
              <TableRow key="1">
                <TableCell>
                  {" "}
                  <div>
                    <p className="uppercase">Kick Futsal</p>
                    <p className="font-small">Lalitpur</p>
                  </div>
                </TableCell>
                <TableCell>June 19, 2024</TableCell>
                <TableCell>10 AM</TableCell>
                <TableCell>1200</TableCell>

                <TableCell>
                  <Chip size="sm" color="success">
                    Booked
                  </Chip>
                </TableCell>
                <TableCell>
                  <Button variant="bordered" size="sm" onPress={onOpen}>
                    Ticket
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <Card className="mt-8 mx-4">
        <CardHeader>
          <p className="text-semibold text-secondary font-medium">
            Booking Records{" "}
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
              <TableRow key="1">
                <TableCell>Receive Futsal,Kathmandu</TableCell>
                <TableCell>May 1, 2024</TableCell>
                <TableCell>8 AM</TableCell>
                <TableCell>1300</TableCell>
                <TableCell>
                  <Chip size="sm" color="danger">
                    Canceled
                  </Chip>
                </TableCell>
                <TableCell>
                  <Button variant="bordered" size="sm" onPress={onOpen}>
                    Ticket
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>What Futsal,Lalitpur</TableCell>
                <TableCell>June 9, 2024</TableCell>
                <TableCell>1 PM</TableCell>
                <TableCell>1400</TableCell>
                <TableCell>
                  <Chip size="sm" color="warning">
                    Reserved
                  </Chip>
                </TableCell>
                <TableCell>
                  <Button variant="bordered" size="sm" onPress={onOpen}>
                    Ticket
                  </Button>
                </TableCell>
              </TableRow>
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
                <Link color="foreground" href="/">
                  <span>
                    <Logo />
                  </span>
                  <p className="font-bold text-inherit mt-1">NetQuest</p>
                </Link>
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
                      <p className="font-normal text-sm	 italic">Venue</p>
                      <p className="text-semibold  font-medium">Kick Futsal</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm	 italic">Location</p>
                      <p className="text-semibold  font-medium">
                        Balkumari, Lalitpur
                      </p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm	italic">Date</p>
                      <p className="text-semibold  font-medium">12-29-2024</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm	italic">Time</p>
                      <p className="text-semibold  font-medium">2 PM</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm	italic">Rate</p>
                      <p className="text-semibold font-medium">Rs. 1200</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm	italic">Status</p>
                      <p className="text-semibold text-success">Booked</p>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <div className="flex justify-between">
                      <p className="font-normal text-sm	 italic">Name</p>
                      <p className="text-semibold  font-medium">Ram Bahadur</p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <p className="font-normal text-sm	 italic">Contact</p>
                      <p className="text-semibold  font-medium">9876543210</p>
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
