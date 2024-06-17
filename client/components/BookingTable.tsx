"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  DatePicker,
  Spinner,
  Table,
  Chip,
  Checkbox,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TimeInput,
  Input,
} from "@nextui-org/react";
import { getLocalTimeZone, today, CalendarDate, Time } from "@internationalized/date";
import { useRouter } from 'next/navigation';
import { ClockCircleLinearIcon } from './Icons';

// Define a type for the slot objects
interface Slot {
  time: string;
  rate: number;
  status: string;
}

export const BookingTable = () => {
  const router = useRouter();
  const venueOwner = true;
  const [isLoading, setIsLoading] = useState(true);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [checkedSlots, setCheckedSlots] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(today(getLocalTimeZone()));

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      const simulatedSlots: Slot[] = [
        { time: "7:00 AM", rate: 1200, status: "AVAILABLE" },
        { time: "8:00 AM", rate: 1200, status: "BOOKED" },
        { time: "9:00 AM", rate: 1200, status: "AVAILABLE" },
      ];
      setSlots(simulatedSlots);
      setIsLoading(false);
    }, 2000); // 2 seconds delay to simulate fetching time

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const handleStatusChange = (slotIndex: number, newStatus: string) => {
    const updatedSlots = [...slots];
    updatedSlots[slotIndex].status = newStatus;
    if (newStatus === "UNAVAILABLE") {
      updatedSlots[slotIndex].rate = 0;
    }
    setSlots(updatedSlots);
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    if (checked) {
      setCheckedSlots((prev) => [...prev, index]);
      setIsOpen(true);
    } else {
      setCheckedSlots((prev) => prev.filter((i) => i !== index));
      setIsOpen(false);
    }
  };
  const selectedSlots = checkedSlots.map((index) => slots[index]);
  const totalRate = selectedSlots.reduce((sum, slot) => sum + slot.rate, 0);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardBody>
          <CardHeader><h4 className="font-medium text-lg text-secondary">Open Hours and Rate</h4></CardHeader>
          <CardBody>
            <div className="mb-4">
              <DatePicker
                label={"Select Date"}
                className="max-w-[284px]"
                minValue={today(getLocalTimeZone())}
                labelPlacement="inside"
                isRequired
                maxValue={today(getLocalTimeZone()).add({ days: 7 })}
                defaultValue={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </div>

            <div className="flex gap-4">
              <TimeInput
                label="Opens At"
                labelPlacement="inside"
                defaultValue={new Time(6, 0)}
                startContent={
                  <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <TimeInput
                label="Closes At"
                labelPlacement="inside"
                defaultValue={new Time(19, 0)}
                startContent={
                  <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
            </div>
          </CardBody>
          <CardBody>
            <Input
              type="email"
              label="Rate"
              labelPlacement="inside"
              defaultValue="1200"
            />
            <Checkbox defaultSelected isReadOnly className="mt-2"> Apply Same For All</Checkbox>
          </CardBody>

          <CardFooter> <Button color="primary" variant="solid"> Save Changes</Button></CardFooter>
          <CardHeader><h4 className="font-medium text-lg text-secondary">Booking Status</h4></CardHeader>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>TIME</TableColumn>
              <TableColumn>RATE</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>{venueOwner ? "EDIT" : "SELECT"}</TableColumn>
            </TableHeader>

            <TableBody>
              {slots.map((slot, index) => (
                <TableRow key={index}>
                  <TableCell>{slot.time}</TableCell>
                  <TableCell>{slot.rate}</TableCell>
                  <TableCell>
                    <Chip
                      radius="sm"
                      size="sm"
                      color={
                        slot.status === "AVAILABLE"
                          ? "success"
                          : slot.status === "BOOKED"
                            ? "danger"
                            : slot.status === "RESERVED"
                              ? "warning"
                              : "default"
                      }
                    >
                      {slot.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Dropdown backdrop="opaque">
                      <DropdownTrigger>
                        <Button size="sm" variant="shadow" color="secondary">
                          EDIT
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        variant="faded"
                        onAction={(key) => handleStatusChange(index, key as string)}
                      >
                        <DropdownItem key="AVAILABLE">
                          <p className="text-green-500">AVAILABLE</p>
                        </DropdownItem>
                        <DropdownItem key="RESERVED">
                          <p className="text-orange-400">RESERVED</p>
                        </DropdownItem>
                        <DropdownItem key="BOOKED">
                          <p className="text-red-600">BOOKED</p>
                        </DropdownItem>
                        <DropdownItem key="UNAVAILABLE">
                          <p>UNAVAILABLE</p>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </div>
      
    </>
  );
};
