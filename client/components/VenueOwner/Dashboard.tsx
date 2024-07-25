"use client";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Users,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [revenue, setRevenue] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [ongoingBookings, setOngoingBookings] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  const [isLoadingRevenue, setIsLoadingRevenue] = useState<boolean>(true);
  const [isLoadingOngoingBookings, setIsLoadingOngoingBookings] = useState<boolean>(true);
  const [isLoadingRecentBookings, setIsLoadingRecentBookings] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const tokenFromCookie = Cookies.get('__securedAccess');

      if (!tokenFromCookie) return;

      const headers = {
        'Authorization': `Bearer ${tokenFromCookie}`,
      };

      try {
        const [venueRes, ongoingBookingRes, recentBookingRes] = await Promise.all([
          fetch('http://localhost:4000/api/venuedata', { headers }),
          fetch('http://localhost:4000/api/ongoingbooking', { headers }),
          fetch('http://localhost:4000/api/recentbooking', { headers }),
        ]);

        const venueData = await venueRes.json();
        const ongoingBookingsData = await ongoingBookingRes.json();
        const recentBookingsData = await recentBookingRes.json();

        setRevenue(venueData.revenue);
        setTotalUsers(venueData.totalUsers);
        setTotalBookings(venueData.totalBookings);

        console.log("venueData", venueData);
        console.log("ongoingBookingsData", ongoingBookingsData);
        console.log("recentBookingsData", recentBookingsData);

        setOngoingBookings(ongoingBookingsData.bookings);
        setRecentBookings(recentBookingsData.recentBookings);

        setIsLoadingRevenue(false);
        setIsLoadingOngoingBookings(false);
        setIsLoadingRecentBookings(false);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenue Generated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between">
                <div>
                  {isLoadingRevenue ? (
                    <div className="text-2xl font-bold flex flex-row">Loading...</div>
                  ) : (
                    <div className="text-2xl font-bold flex flex-row">Rs. {revenue}</div>
                  )}
                </div>
                <div>
                  <Button variant="outline" asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                      Generate Report
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between">
                <div>
                  {isLoadingRevenue ? (
                    <div className="text-2xl font-bold flex flex-row">Loading...</div>
                  ) : (
                    <div className="text-2xl font-bold flex flex-row">{totalUsers}</div>
                  )}
                </div>
                <div>
                  <Button variant="outline" asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                      View Users
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between">
                <div>
                  {isLoadingRevenue ? (
                    <div className="text-2xl font-bold flex flex-row">Loading...</div>
                  ) : (
                    <div className="text-2xl font-bold flex flex-row">{totalBookings}</div>
                  )}
                </div>
                <div>
                  <Button variant="outline" asChild size="sm" className="ml-auto gap-1">
                    <Link href="#">
                      History
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-5">
          <Card
            className="xl:col-span-3" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Today's Bookings</CardTitle>
                <CardDescription>
                  Bookings for today.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {isLoadingOngoingBookings ? (
                <div className="text-center">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ongoingBookings.map((booking, index) => (
                      <TableRow key={index}>
                        {/* <TableCell>
                          <div className="font-medium">{booking.customer.name}</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {booking.customer.contact}
                          </div>
                        </TableCell> */}
                        <TableCell>
                          <div className="font-medium">Harry</div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                           0000
                          </div>
                        </TableCell>
                        <TableCell>{booking.date}</TableCell>
                        <TableCell>{booking.time}</TableCell>
                        <TableCell>${booking.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5" className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Recently Booked</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {isLoadingRecentBookings ? (
                <div className="text-center">Loading...</div>
              ) : (
                recentBookings.map((booking, index) => (
                  <div key={index} className="flex items-center gap-4">
                    {/* <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src={booking.customer.avatarUrl} alt="Avatar" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none ">
                        {booking.customer.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {booking.customer.contact}
                      </p>
                    </div> */}
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage src="aa.com" alt="Avatar" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none ">
                        Ram
                      </p>
                      <p className="text-sm text-muted-foreground">
                        000
                      </p>
                    </div>
                    <div className="ml-auto font-medium">{booking.date}</div>
                    <div className="ml-auto font-medium">{booking.time}</div>
                    <div className="ml-auto font-medium">Rs.{booking.price.toFixed(2)}</div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
