import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio,Card,CardBody,CardFooter,CardHeader} from "@nextui-org/react";
import {AdminNavigationBar} from "@/components/AdminNavigationBar"
import {VenueRegistrationTable} from "@/components/Venue-Status/VenueRegistrationTable"
export default function UsersTablePage() {
  return (
   <>
   <AdminNavigationBar/>
   <Card className="m-2">
    <CardHeader><p className="font-semibold text-secondary ">Venue Status</p></CardHeader>
    <CardBody>
      <VenueRegistrationTable/>
    </CardBody>
   </Card>
   </>
  );
}
