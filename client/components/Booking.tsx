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
  Checkbox,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
} from "@nextui-org/react";
import { getLocalTimeZone, today } from "@internationalized/date";

export const Booking = () => {

  const venueOwner = true;
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    },2000); // 2 seconds delay to simulate fetching time

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
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
              defaultValue={today(getLocalTimeZone())}
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
                {venueOwner ?
                    <TableColumn> EDIT</TableColumn>
                    :
                     <TableColumn>SELECT</TableColumn>
                  }
                   
              </TableHeader>

              <TableBody>
                <TableRow key="1">
                  <TableCell>7:00 AM</TableCell>
                  <TableCell>1200</TableCell>
                  <TableCell>
                    <Button radius="sm" size="sm" color="success">
                      AVAILABLE
                    </Button>
                  </TableCell>
                  <TableCell>
                    {venueOwner ?
                      <Dropdown backdrop="opaque" >
                        <DropdownTrigger>
                          <Button radius="sm" size="sm" color="secondary">EDIT</Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" onAction={(key) => alert(key)}>
                          <DropdownItem key="Status changed to AVAILABLE"><p className="text-green-500">AVAILABLE</p></DropdownItem>
                          <DropdownItem key="Status changed to RESERVED"><p className="text-orange-400">RESERVED</p></DropdownItem>
                          <DropdownItem key="Status changed to BOOKED"><p className="text-red-600">BOOKED</p></DropdownItem>
                          <DropdownItem key="Status changed to UNAVAILABLE"><p>UNAVAILABLE</p></DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                    :
                     <Checkbox></Checkbox>
                  }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardBody>
        
    </div>
  );
};
