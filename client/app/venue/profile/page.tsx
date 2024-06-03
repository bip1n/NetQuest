"use client";

import React, { useState } from "react";
import { Navigationbar } from "../../../components/navbar";
import { FooterContent } from "../../../components/footer";
import { Card, CardFooter, CardHeader, Image, CardBody, Link, Divider, Input, Button, Avatar,ScrollShadow, TableHeader, Table,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Tabs,
  Tab,
  User,
  Pagination,
  Checkbox,} from "@nextui-org/react";

  import {PlusIcon} from "../../../components/Assets/PlusIcon";
import {VerticalDotsIcon} from "../../../components/Assets/VerticalDotsIcon";
import {SearchIcon} from "../../../components/Assets/SearchIcon";
import {ChevronDownIcon} from "../../../components/Assets/ChevronDownIcon";
import {columns, users, statusOptions} from "../../../components/Assets/data";
import {capitalize} from "../../../components/Assets/utils";



const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];


export default function VenueProfile() {
  const amenitiesList = [
    "1. WiFi",
    "2. Parking",
    "3. Food & Drinks",
    "4. Restrooms",
    "5. Wheelchair Accessible",
    // Add more amenities as needed
  ];

  return (
    <>
      <Navigationbar />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className="w-full max-w-[100%] md:max-w-[600px]">
          <CardHeader className="flex gap-3">
            <p className="font-bold text-xl mt-1">Kick Futsal</p>
          </CardHeader>

          <CardBody>
            <Image
              width={420}
              alt="NextUI hero Image"
              src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            />
          </CardBody>

          <CardBody>
            <h4 className="font-medium text-lg">Amenities</h4>
            <ul>
              {amenitiesList.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </CardBody>

          <CardBody>

            <h4 className="font-medium text-lg">User Review</h4>
            <Card className="mb-2">
            <Card className="max-w-[420px]">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                      <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-400">
                <ScrollShadow hideScrollBar className="w-[300px] h-[60px]">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto quisquam pariatur modi velit incidunt animi perspiciatis, nisi quae dolorem soluta vero, dolore ex in, repudiandae illum. Doloribus nobis corporis ab.                </ScrollShadow>
                </CardBody>
                <CardFooter className="gap-3">
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">4</p>
                    <p className=" text-default-400 text-small">Following</p>
                  </div>
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">97.1K</p>
                    <p className="text-default-400 text-small">Followers</p>
                  </div>
                </CardFooter>
              </Card>
            </Card>
           <Button> 
            <Link color="foreground" href="/venue/reviews">
              <p className="font-normal text-inherit mt-1">Read more</p>
            </Link>
           </Button>
            <CardBody> </CardBody>
          </CardBody>

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
                                  <TableCell><Button radius="sm" size="sm"color="success">
                                  AVAILABLE
      </Button>  
     
      </TableCell>
                                 
                                </TableRow>
                                <TableRow key="2">
                                  <TableCell>8:00 AM</TableCell>
                                  <TableCell>1100</TableCell>
                                  <TableCell> <Button isDisabled radius="sm" size="sm" color="warning">
        RESERVED
      </Button>  </TableCell>
                                 
                                </TableRow>
                                <TableRow key="3">
                                  <TableCell>9:00 AM</TableCell>
                                  <TableCell>1400</TableCell>
                                  <TableCell> <Button isDisabled radius="sm" size="sm" color="danger">
        BOOKED
      </Button> </TableCell>
                                 
                                </TableRow>
                                <TableRow key="4">
                                  <TableCell>10:00 AM</TableCell>
                                  <TableCell>1400</TableCell>
                                  <TableCell> <Button isDisabled radius="sm" size="sm" color="warning">
        RESERVED
      </Button>  </TableCell>
                                 
                                </TableRow>
                                <TableRow key="5">
                                  <TableCell>11:00 AM</TableCell>
                                  <TableCell>1000</TableCell>
                                  <TableCell><Button radius="sm" size="sm"color="success">
                                  AVAILABLE
      </Button> </TableCell>
                                 
                                </TableRow>
                                <TableRow key="6">
                                  <TableCell>12:00 PM</TableCell>
                                  <TableCell>1200</TableCell>
                                  <TableCell><Button radius="sm" size="sm"color="success">
        AVAILABLE
      </Button> </TableCell>
                                 
                                </TableRow>
                                <TableRow key="7">
                                  <TableCell>1:00 PM</TableCell>
                                  <TableCell>1250</TableCell>
                                  <TableCell> <Button isDisabled radius="sm" size="sm" color="warning">
        RESERVED
      </Button>  </TableCell>
                                 
                                </TableRow>
                                <TableRow key="8">
                                  <TableCell>2:00 PM</TableCell>
                                  <TableCell>1250</TableCell>
                                  <TableCell> <Button isDisabled radius="sm" size="sm" color="danger">
        BOOKED
      </Button> </TableCell>
                                 
                                </TableRow>
                                <TableRow key="9">
                                  <TableCell>3:00 PM</TableCell>
                                  <TableCell>1200</TableCell>
                                  <TableCell> <Button isDisabled radius="sm" size="sm" color="danger">
        BOOKED
      </Button> </TableCell>
                                 
                                </TableRow>
                              </TableBody>
                            </Table>
         
            </Card>  
                </Tab>
                    <Tab key="music" title="May 3">
                      <Card>
                        <CardBody>
                          here
                        </CardBody>
                      </Card>  
                    </Tab>
                    <Tab key="videos" title="May 4">
                      <Card>
                        <CardBody>
                          here
                        </CardBody>
                      </Card>  
                    </Tab>
                  </Tabs>
              
            
           
          </CardBody>

          
        </Card>
     

      </div>

      <FooterContent />
    </>
  );
}
