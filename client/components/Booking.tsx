"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
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
} from "@nextui-org/react";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";
import { useRouter } from 'next/navigation';

// Define a type for the slot objects
interface Slot {
  time: string;
  rate: number;
  status: string;
}

export const Booking = () => {
  const router = useRouter();
  const venueOwner = false;
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
        <CardBody className="">
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

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Spinner label="Loading..." />
            </div>
          ) : (
            <Table removeWrapper aria-label="Example static collection table">
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
                            : "warning"
                        }
                      >
                        {slot.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      {venueOwner ? (
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
                      ) : (
                        <Checkbox
                          isDisabled={slot.status !== "AVAILABLE"}
                          isSelected={checkedSlots.includes(index)}
                          onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                        ></Checkbox>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <CardFooter>
            <p className="italic text-xs">
              <span className="text-red-500"> * </span>The{" "}
              <span className="text-orange-500">RESERVED</span> slot might change
              later.<span className="text-red-500"> *</span>
            </p>
          </CardFooter>
        </CardBody>
      </div>
      <div className="flex flex-col gap-2">
        <Modal
          isOpen={isOpen}
          placement="bottom-center"
          onOpenChange={setIsOpen}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-secondary">
                  Selected Shift/s
                </ModalHeader>
                <ModalBody>
                  {selectedSlots.map((slot, index) => (
                    <p key={index}>
                      Date: {selectedDate.toString()}
                      <br />
                      Time: {slot.time}
                      <br />
                      Rate: Rs. {slot.rate}
                    </p>
                  ))}
                  <p>Total: Rs. {totalRate}</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="secondary" variant="shadow"  onClick={() => {
                      router.push("/venue/booking/checkout");
                    }}>
                    Book
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
