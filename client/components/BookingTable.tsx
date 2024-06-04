"use client";

import React, { useState } from "react";
import {Card,CardBody, Button,TableHeader,TableColumn,TableBody,TableRow,TableCell,Tabs,Table,Tab,} from "@nextui-org/react";



const amenitiesList = [
  "1. WiFi",
  "2. Parking",
  "3. Food & Drinks",
  "4. Restrooms",
  "5. Wheelchair Accessible",
  // Add more amenities as needed
];

export const BookingTable = () => {
      return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className="w-full max-w-[100%] md:max-w-[600px]">
          <CardBody>
            <h4 className="font-medium text-lg">Bookings</h4>
            <Tabs aria-label="Options">
              <Tab key="photos" title="May 2">
                <Card className="max-w-[420px]">
                  <Table aria-label="Example static collection table">
                    <TableHeader>
                      <TableColumn>TIME</TableColumn>
                      <TableColumn>RATE</TableColumn>
                      <TableColumn>STATUS</TableColumn>
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
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>7:00 AM</TableCell>
                        <TableCell>1200</TableCell>
                        <TableCell>
                          <Button radius="sm" size="sm" color="success">
                            AVAILABLE
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>7:00 AM</TableCell>
                        <TableCell>1200</TableCell>
                        <TableCell>
                          <Button radius="sm" size="sm" color="success">
                            AVAILABLE
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>7:00 AM</TableCell>
                        <TableCell>1200</TableCell>
                        <TableCell>
                          <Button radius="sm" size="sm" color="success">
                            AVAILABLE
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>7:00 AM</TableCell>
                        <TableCell>1200</TableCell>
                        <TableCell>
                          <Button radius="sm" size="sm" color="success">
                            AVAILABLE
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>7:00 AM</TableCell>
                        <TableCell>1200</TableCell>
                        <TableCell>
                          <Button radius="sm" size="sm" color="success">
                            AVAILABLE
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow key="1">
                        <TableCell>7:00 AM</TableCell>
                        <TableCell>1200</TableCell>
                        <TableCell>
                          <Button radius="sm" size="sm" color="success">
                            AVAILABLE
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </Tab>
              <Tab key="music" title="May 3">
                <Card>
                  <CardBody>here</CardBody>
                </Card>
              </Tab>
              <Tab key="videos" title="May 4">
                <Card>
                  <CardBody>here</CardBody>
                </Card>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
