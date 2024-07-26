"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
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
} from "@/components/ui/table";

export const LogSheet = ({ venueId, range }) => {
  const [venueDetails, setVenueDetails] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!venueId || !range) {
      setLoading(false);
      return;
    }
    const timeline = range.target.value;

    if (!venueId || !timeline) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/logsheet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ venueId, timeline }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data from the server");
        }

        const data = await response.json();
        setVenueDetails(data.venueDetails);
        setInvoices(Object.entries(data.bookingSummary).map(([date, summary]) => ({
          date,
          ...summary
        })));
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [venueId, range]);

  const printLogSheet = () => {
    window.print();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!venueId || !range) {
    return <div>Please choose a venue ID and range.</div>;
  }

  return (
    <Card className="p-4">
      <div>
        <div className="flex -col items-center justify-center">
          <div className="flex flex-row">
            <div>
              <Logo />
            </div>
            <div>
              <p className="font-bold text-large mt-1">NETQUEST</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="italic text-default-500 text-sm">
            - An Ultimate Futsal Booking System
          </p>
        </div>
      </div>

      <CardBody className="text-end">Date: 2024/07/22</CardBody>
      <CardBody>
        <p className="text-medium">
          Venue: <span className="uppercase font-medium">{venueDetails.name}</span>
        </p>
        <p className="text-medium">
          PAN: <span className="uppercase font-medium">{venueDetails.pan}</span>
        </p>
        <p className="text-medium">
          Contact: <span className="uppercase font-medium">{venueDetails.contact}</span>
        </p>
        <p className="text-medium">
          Owner: <span className="uppercase font-medium">{venueDetails.owner}</span>
        </p>
        <p className="text-medium">
          From: <span className="uppercase font-medium">{venueDetails.from}</span>
        </p>
        <p className="text-medium">
          To: <span className="uppercase font-medium">{venueDetails.to}</span>
        </p>
      </CardBody>
      <CardBody>
        <Table className="printable-table">
          <TableCaption>A list of your recent sales.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] uppercase">Date</TableHead>
              <TableHead className="text-right">Total Shifts</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.date}>
                <TableCell>{invoice.date}</TableCell>
                <TableCell className="text-right">{invoice.totalShifts}</TableCell>
                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                {invoices
                  .reduce((total, invoice) => total + invoice.totalAmount, 0)
                  .toLocaleString("np-NP", { style: "currency", currency: "NPR" })}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="justify-end">
          <Button className="w-20" onClick={printLogSheet}>Print</Button>
        </div>
      </CardBody>
    </Card>
  );
};
