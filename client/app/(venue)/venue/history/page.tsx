"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClipLoader } from "react-spinners";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("__securedAccess");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/venues/booking-history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} color={"#123abc"} loading={loading} />
    </div>
  );

  if (error) return <p className="text-red-500 text-center mt-4">Error: {error}</p>;

  return (
    <main className="flex flex-col justify-center p-4">
      <Table>
        <TableCaption>Booking History</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">DATE</TableHead>
            <TableHead>TIME</TableHead>
            <TableHead>USER</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead className="text-right">AMOUNT</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
            
              <TableCell className="font-medium">{new Date(booking.date).toLocaleDateString()}</TableCell>
              <TableCell>{booking.time}</TableCell>
              <TableCell>{booking.user}<br/>{booking.contact}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell className="text-right">{booking.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
};

export default BookingHistory;
