import React from "react";
import {Card, CardBody, CardFooter, CardHeader,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { Logo } from "@/components/Icons";
import {Divider} from "@nextui-org/divider";
import {Spacer} from "@nextui-org/spacer";

export const LogSheet = () => {
  return (
    <>
    <Card className="p-4">
        <div>
            <div className="flex -col items-center justify-center">
                <div className="flex flex-row ">
                    <div>
                        <Logo />
                    </div>
                    <div>
                        <p className="font-bold text-large  mt-1">NETQUEST</p>
                    </div>
                </div>
            </div>
              <div className="flex justify-center">
                <p className="italic text-default-500 text-sm ">- An Ultimate Futsal Booking System</p>
              </div>
        </div>
        
       
        <CardBody className="text-end"> Date: 2024/07/22</CardBody>
        <CardBody>
            <p className="text-medium">Venue: <span className="uppercase font-medium">Kick Futsal , Lalitpur</span></p>
            <p className="text-medium">PAN: <span className="uppercase font-medium">0431598</span></p>
            <p className="text-medium">Contact: <span className="uppercase font-medium">9876543210</span></p>
            <p className="text-medium">Owner: <span className="uppercase font-medium">Ram Bahadur</span></p>
            <p className="text-medium">From: <span className="uppercase font-medium">2023/07/06</span></p>
            <p className="text-medium">To: <span className="uppercase font-medium">2023/07/09</span></p>
        </CardBody>
        <CardBody>
            <Table removeWrapper aria-label="Venue Log Report"  >
                <TableHeader>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>SHIFT</TableColumn>
                    <TableColumn>INCOME</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                    <TableCell>2024/07/06</TableCell>
                    <TableCell>10 / 12</TableCell>
                    <TableCell>10,800</TableCell>
                    </TableRow>
                    <TableRow key="2">
                    <TableCell>2024/07/07</TableCell>
                    <TableCell>8 / 12</TableCell>
                    <TableCell>8,250</TableCell>
                    </TableRow>
                    <TableRow key="3">
                    <TableCell>2024/07/08</TableCell>
                    <TableCell>12 / 12 </TableCell>
                    <TableCell>15,000</TableCell>
                    </TableRow>
                    <TableRow key="4">
                    <TableCell>2024/07/09</TableCell>
                    <TableCell>8 /12</TableCell>
                    <TableCell>10,250</TableCell>
                    </TableRow>
                    <TableRow key="5">
                    <TableCell className="justify-center"> <Divider/> </TableCell>
                    <TableCell className=""> <Divider/></TableCell>
                    <TableCell> <Divider/></TableCell>
                    </TableRow>
                    <TableRow key="5">
                    <TableCell className="justify-center"><Spacer/></TableCell>
                    <TableCell className="uppercase font-bold"> Total</TableCell>
                    <TableCell> Rs. 45,000</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardBody>
    </Card>
        
    </>
  );
}
