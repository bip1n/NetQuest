"use client";

import React, { useState, useEffect } from "react";
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
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";

// Define a type for the slot objects
interface Slot {
  time: string;
  price: number; // Rate is now required and defaults to 1800
  status: string;
}

export default function Booking(props: { venueId: any; }) {
  const { venueId } = props;
  const router = useRouter();
  const venueOwner = false; // This should be dynamic based on your user management logic
  const [isLoading, setIsLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [checkedSlots, setCheckedSlots] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(today(getLocalTimeZone()));

  // Utility function to generate time slots from opensAt to closesAt with default rate
  const generateTimeSlots = (opensAt: number, closesAt: number) => {
    const defaultRate = 1800;
    const timeSlots = [];
    for (let hour = opensAt; hour < closesAt; hour++) {
      timeSlots.push({ time: `${hour}:00`, price: defaultRate, status: "available" });
    }
    return timeSlots;
  };

  const fetchSlotsForDate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/venue/${venueId}/slots?date=${selectedDate.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("__securedAccess")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch booking slots");
      }

      const data = await response.json();
      const { opensAt, closesAt, bookedSlots } = data;

      // Generate the time slots for the day with default rate
      const generatedSlots = generateTimeSlots(opensAt, closesAt);

      // Map over generated slots and update their status and rate based on booked slots
      const updatedSlots = generatedSlots.map(slot => {
        const bookedSlot = bookedSlots.find((b: { time: string; }) => b.time === slot.time);
        if (bookedSlot) {
          return {
            ...slot,
            status: bookedSlot.status,
            price: bookedSlot.price || slot.price, // Use the booked rate or default to the slot's rate
          };
        }
        return slot;
      });

      setSlots(updatedSlots);
    } catch (error) {
      console.error("Error fetching booking slots:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSlotsForDate();
    setCheckedSlots([]); // Reset the checked slots whenever the date changes
  }, [selectedDate]);

  useEffect(() => {
    fetchSlotsForDate(); // Fetch slots when the component mounts
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

  // Helper function to convert 24-hour time to 12-hour format
  const convertTo12HourFormat = (time24: string) => {
    const [hours, minutes] = time24.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleBooking = async () => {
    const selectedSlots = checkedSlots.map((index) => slots[index]);
    const totalRate = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
    const selectedTimes = selectedSlots.map(slot => slot.time);
  
    const data = {
      date: selectedDate.toString(),
      slots: selectedSlots,
      price: totalRate,   
      owner_id: venueId,
      timestamp: new Date().getTime(),
      times: selectedTimes, // Adding the selected times here
    };
  
    localStorage.setItem('Bookdata', JSON.stringify(data));
  
    router.push('booking/checkout');
  };

  const selectedSlots = checkedSlots.map((index) => slots[index]);
  const totalRate = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
  const selectedTimes = selectedSlots.map(slot => slot.time);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <CardBody>
          <div className="flex mb-4 items-center gap-4">
            <DatePicker
              label={"Select Date"}
              className="max-w-[284px]"
              minValue={today(getLocalTimeZone())}
              labelPlacement="inside"
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
            slots.length > 0 ? (
              <Table removeWrapper aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>TIME</TableColumn>
                  <TableColumn>RATE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>SELECT</TableColumn>
                </TableHeader>
                <TableBody>
                  {slots.map((slot, index) => (
                    <TableRow key={index}>
                      <TableCell>{convertTo12HourFormat(slot.time)}</TableCell>
                      <TableCell>Rs. {slot.price}</TableCell>
                      <TableCell>
                        <Chip
                          radius="sm"
                          size="sm"
                          color={
                            slot.status === "available"
                              ? "success"
                              : slot.status === "booked"
                              ? "danger"
                              : slot.status === "reserved"
                              ? "warning"
                              : "default"
                          }
                        >
                          {slot.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Checkbox
                          isDisabled={slot.status !== "available"}
                          isSelected={checkedSlots.includes(index)}
                          onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                        ></Checkbox>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-danger-500">No slots available for the selected date.</p>
            )
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
          onOpenChange={(isOpen) => {
            setIsOpen(isOpen);
            if (!isOpen) setCheckedSlots([]); // Clear selected checkboxes when modal is closed
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-secondary">
                  Selected Slot/s
                </ModalHeader>
                <ModalBody>
                  {selectedSlots.map((slot, index) => (
                    <p key={index}>
                      Date: {selectedDate.toString()}
                      <br />
                      Time: {slot.time === "24:00" ? "12:00 AM" : convertTo12HourFormat(slot.time)}
                      <br />
                      Rate: Rs. {slot.price}
                    </p>
                  ))}
                  <p>Total: Rs. {totalRate}</p>
                  <p>Selected Times: {selectedTimes.join(", ")}</p> {/* Display selected times here */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={() => { 
                    setCheckedSlots([]);
                    onClose();
                  }}>
                    Cancel
                  </Button>
                  <Button color="secondary" variant="shadow" onClick={handleBooking}>
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
}
