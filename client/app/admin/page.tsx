import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio,Card,CardBody,CardFooter,CardHeader} from "@nextui-org/react";
import {AdminNavigationBar} from "@/components/AdminNavigationBar"

export default function Admin() {
  return (
   <>
   <AdminNavigationBar/>
   <Card>
    <CardHeader><p>ADMIN</p></CardHeader>
    <CardBody>
     
    </CardBody>
   </Card>
   </>
  );
}