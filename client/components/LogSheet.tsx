"use client"

import React from "react";
import {Card, CardBody,Button} from "@nextui-org/react";
import { Logo } from "@/components/Icons";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
   


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
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
            <TableRow>
                <TableHead className="w-[100px] uppercase">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
            ))}
            </TableBody>
            <TableFooter>
            <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
            </TableFooter>
        </Table>

            <div className="justify-end">
                <Button className="w-20">Print</Button>
            </div>
        </CardBody>
    </Card>
        
    </>
  );
}

