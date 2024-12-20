"use client"
import React, { useState } from "react";
import {Card,CardBody,CardHeader,Accordion, AccordionItem,} from "@nextui-org/react";
import {PendingVenueStatus} from "@/components/Venue-Status/PendingVenueStatus"
import {ActiveVenueStatus} from "@/components/Venue-Status/ActiveVenueStatus"
import {RejectedVenueStatus} from "@/components/Venue-Status/RejectedVenueStatus"


export default function UsersTablePage() {
  return (
   <>
   <div className="p-4">
     <Accordion selectionMode="multiple"  defaultExpandedKeys={["1","2","3"]}>
      <AccordionItem key="1" aria-label="Accordion 1" startContent={<p className="text-primary font-semibold">Pending Venue </p> }>
            <PendingVenueStatus/>
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" startContent={<p className="text-success font-semibold">Active Venue </p> }>
          <ActiveVenueStatus/>
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" startContent={<p className="text-danger font-semibold">Rejected Venue </p>}>
        <RejectedVenueStatus />
      </AccordionItem>
    </Accordion>
   </div>
  
  

  

   
   </>
  );
}
