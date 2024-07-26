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
  TimeInput,
  Input,
} from "@nextui-org/react";
import { getLocalTimeZone, today, CalendarDate, Time } from "@internationalized/date";
import { useRouter } from 'next/navigation';
import { ClockCircleLinearIcon } from './Icons';
import Cookies from "js-cookie";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


// Define a type for the slot objects
interface Slot {
  _id: string;
  time: string;
  price: number;
  status: string;
}

const defaultOpenTime = new Time(6, 0); // 6:00 AM
const defaultCloseTime = new Time(19, 0); // 7:00 PM
const defaultRate = 1200;

const initializeSlots = (openTime: Time, closeTime: Time, price: number, date: Date): Slot[] => {
  const slots = [];
  let currentTime = new Date();
  currentTime.setHours(openTime.hour, openTime.minute, 0, 0);
  
  while (currentTime.getHours() < closeTime.hour) {
    const timeString = currentTime.toTimeString().substring(0, 5);
    const slotDate = new Date(date);
    slotDate.setHours(currentTime.getHours(), currentTime.getMinutes(), 0, 0);
    
    const isPast = new Date() > slotDate;
    slots.push({ _id: "", time: timeString, price, status: isPast ? 'unavailable' : 'available' });
    currentTime.setHours(currentTime.getHours() + 1);
  }

  return slots;
};

export const BookingTable = () => {
  const router = useRouter();
  const venueOwner = true;
  const [isLoading, setIsLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [checkedSlots, setCheckedSlots] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<CalendarDate>(today(getLocalTimeZone()));
  const [openTime, setOpenTime] = useState<Time>(defaultOpenTime);
  const [closeTime, setCloseTime] = useState<Time>(defaultCloseTime);
  const [rate, setRate] = useState<number>(defaultRate);

  const mergeSlots = (defaultSlots: Slot[], fetchedSlots: Slot[]): Slot[] => {
    const slotMap = new Map();
    defaultSlots.forEach(slot => slotMap.set(slot.time, slot));
    fetchedSlots.forEach(slot => slotMap.set(slot.time, slot));
    
    // Override default slots with fetched slots
    fetchedSlots.forEach(slot => {
      const existingSlot = slotMap.get(slot.time);
      if (existingSlot) {
        existingSlot._id = slot._id;
        existingSlot.price = slot.price;
        existingSlot.status = slot.status;
      } else {
        slotMap.set(slot.time, slot);
      }
    });

    return Array.from(slotMap.values());
  };

  // Function to fetch data from the server
  const fetchVenueSettings = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("__securedAccess");
      if (!token) {
        router.push("/login");
        return;
      }
      const response = await fetch(`http://localhost:4000/api/venues/venue-settings`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch venue settings");
      }

      const { openTime, closeTime, rate } = await response.json();
      setOpenTime(new Time(openTime.hour, openTime.minute));
      setCloseTime(new Time(closeTime.hour, closeTime.minute));
      setRate(rate);

      // Fetch slots data after fetching venue settings
      fetchSlots(selectedDate, openTime, closeTime, rate);
    } catch (error) {
      console.error(error);
      // Handle error state (e.g., show an error message)
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSlots = async (date: CalendarDate, openTime: Time, closeTime: Time, rate: number) => {
    setIsLoading(true);
    try {
      const token = Cookies.get("__securedAccess");
      if (!token) {
        router.push("/login");
        return;
      }
      const response = await fetch(`http://localhost:4000/api/venues/booking-settings?date=${date.toString()}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch slots data");
      }

      const fetchedSlots: Slot[] = await response.json();
      console.log(fetchedSlots);

      const defaultSlots = initializeSlots(openTime, closeTime, rate, date.toDate());
      const mergedSlots = mergeSlots(defaultSlots, fetchedSlots);
      setSlots(mergedSlots);
    } catch (error) {
      console.error(error);
      // Handle error state (e.g., show an error message)
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update slot status in the backend
  const updateSlotStatus = async (slotId: string, newStatus: string) => {
    try {
      const token = Cookies.get("__securedAccess");
      if (!token) {
        router.push("/login");
        return;
      }
      const response = await fetch(`http://localhost:4000/api/venues/update-booking-status`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: slotId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update slot status");
      }

      // Optionally, handle the response or any additional logic here
    } catch (error) {
      console.error(error);
      // Handle error state (e.g., show an error message)
    }
  };

  const handleStatusChange = (slotIndex: number, newStatus: string) => {
    const updatedSlots = [...slots];
    const slot = updatedSlots[slotIndex];
    console.log(slot)
    slot.status = newStatus;
    if (newStatus === "unavailable") {
      slot.price = 0;
    }
    setSlots(updatedSlots);
    
    // Call the function to update the backend
    console.log("Slot ID:", slot._id);
    if (slot._id) {
      console.log("Updating status...");
      updateSlotStatus(slot._id, newStatus);
    }
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

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("__securedAccess");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`http://localhost:4000/api/venues/save-settings`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          openTime: openTime.toString(),
          closeTime: closeTime.toString(),
          rate: rate,
        }),
      });

      if (!response.ok)
        {
          throw new Error("Failed to save settings");
          }  // Re-fetch slots to update with new settings
          fetchSlots(selectedDate, openTime, closeTime, rate);
        } catch (error) {
          console.error(error);
          // Handle error state (e.g., show an error message)
        } finally {
          setIsLoading(false);
        }
      };

      const selectedSlots = checkedSlots.map((index) => slots[index]);
      const totalRate = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
      
      useEffect(() => {
      fetchVenueSettings();
      }, []);
      
      useEffect(() => {
      fetchSlots(selectedDate, openTime, closeTime, rate);
      }, [selectedDate]);
      
      return (
      <>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <CardBody>
      <CardHeader>
      <h4 className="font-medium text-lg text-secondary">Open Hours and Rate</h4>
      </CardHeader>
      <CardBody>
      <div className="mb-4 flex gap-2 items-center">
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
      <Button onClick={() => fetchSlots(selectedDate, openTime, closeTime, rate)}>Search</Button>
      </div>        <div className="flex gap-4">
          <TimeInput
            label="Opens At"
            labelPlacement="inside"
            defaultValue={openTime}
            onChange={setOpenTime}
            startContent={
              <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <TimeInput
            label="Closes At"
            labelPlacement="inside"
            defaultValue={closeTime}
            onChange={setCloseTime}
            startContent={
              <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>
      </CardBody>
      <CardBody>
        <Input
          type="number"
          label="Rate"
          labelPlacement="inside"
          defaultValue={rate.toString()}
          onChange={(e) => setRate(Number(e.target.value))}
        />
        <Checkbox defaultSelected isReadOnly className="mt-2"> Apply Same For All</Checkbox>
      </CardBody>

          <CardFooter>
            <Button color="primary" variant="solid"> Save Changes</Button>
          </CardFooter>
          <CardHeader>
            <h4 className="font-medium text-lg text-secondary">Booking Status</h4>
          </CardHeader>
          {isLoading ? (
            <Spinner />
          ) : (
            <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>TIME</TableColumn>
                <TableColumn>RATE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>{venueOwner ? "EDIT" : "SELECT"}</TableColumn>
              </TableHeader>
              <TableBody>
                {slots.map((slot, index) => (
                  <TableRow key={slot._id}>
                    <TableCell>{slot.time}</TableCell>
                    <TableCell>{slot.price}</TableCell>
                    <TableCell>
                      <HoverCard>
                      <HoverCardTrigger>
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
                          </Chip></HoverCardTrigger>
                      <HoverCardContent>
                         @.rambahadurthapa<br/>+977 9807609876
                      </HoverCardContent>
                    </HoverCard>
                     
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
                              <DropdownItem key="available">
                                <p className="text-green-500">AVAILABLE</p>
                              </DropdownItem>
                              <DropdownItem key="reserved">
                                <p className="text-orange-400">RESERVED</p>
                              </DropdownItem>
                              <DropdownItem key="booked">
                                <p className="text-red-600">BOOKED</p>
                              </DropdownItem>
                              <DropdownItem key="unavailable">
                                <p>UNAVAILABLE</p>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardBody>
          </div>
        </>
);
};
