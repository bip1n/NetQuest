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
import { useParams } from "react-router";

interface Slot {
  time: string;
  price: number;
  status: string;
}

export default function Booking(props: { venueId: any; }) {
  const { venueId } = props;
  const router = useRouter();
  const venueOwner = false;
  const [isLoading, setIsLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [checkedSlots, setCheckedSlots] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(today(getLocalTimeZone()));

  const generateTimeSlots = (opensAt: number, closesAt: number) => {
    const defaultRate = 1800;
    const timeSlots = [];
    const now = new Date();
    const selectedDay = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);

    for (let hour = opensAt; hour < closesAt; hour++) {
      const slotTime = new Date(selectedDay.getTime());
      slotTime.setHours(hour, 0, 0, 0);
      const status = slotTime < now ? "unavailable" : "available";
      timeSlots.push({ time: `${hour}:00`, price: defaultRate, status });
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

      const generatedSlots = generateTimeSlots(opensAt, closesAt);

      const updatedSlots = generatedSlots.map(slot => {
        const bookedSlot = bookedSlots.find((b: { time: string; }) => b.time === slot.time);
        if (bookedSlot) {
          return {
            ...slot,
            status: bookedSlot.status,
            price: bookedSlot.price || slot.price,
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
    setCheckedSlots([]);
  }, [selectedDate]);

  useEffect(() => {
    fetchSlotsForDate();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = Cookies.get("__securedAccess");
      if (token) {
        try {
          const response = await fetch("http://localhost:4000/api/isUserLoggedIn", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            setError(errorResponse.error);
          } else {
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Error fetching user login status:", error);
        }
      }
      setLoading(false);
    };

    fetchUserDetails();
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
      times: selectedTimes,
    };

    localStorage.setItem('Bookdata', JSON.stringify(data));
    router.push(`/${venueId}/checkout`);
  };

  const selectedSlots = checkedSlots.map((index) => slots[index]);
  const totalRate = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
  const selectedTimes = selectedSlots.map(slot => slot.time);

  return (
    <>
      <div>
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
        <div>
          <p className="italic text-xs">
            <span className="text-red-500"> * </span>The{" "}
            <span className="text-orange-500">RESERVED</span> slot might change
            later.<span className="text-red-500"> *</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Modal
          isOpen={isOpen}
          placement="bottom-center"
          onOpenChange={(isOpen) => {
            setIsOpen(isOpen);
            if (!isOpen) setCheckedSlots([]);
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-secondary">
                  Selected Slot
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
                  <p>Selected Times: {selectedTimes.join(", ")}</p>
                </ModalBody>
                <ModalFooter>
                  {isLoggedIn ?
                  <>
                    <Button color="danger" variant="light" onPress={() => { 
                      setCheckedSlots([]);
                      onClose();
                    }}>
                      Cancel
                    </Button>
                    <Button color="secondary" variant="shadow" onClick={handleBooking}>
                      Book
                    </Button>
                  </>
                  : <p className="text-danger-500">Please login to continue.</p>}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
