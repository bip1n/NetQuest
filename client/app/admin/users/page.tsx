import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio,Card,CardBody,CardFooter,CardHeader} from "@nextui-org/react";
import {AdminNavigationBar} from "@/components/AdminNavigationBar"

export default function UsersTable() {
  return (
   <>
   <AdminNavigationBar/>
   <Card>
    <CardHeader><p>Venue Pages</p></CardHeader>
    <CardBody>
      <Table>
        
      </Table>
    </CardBody>
   </Card>
   </>
  );
}
