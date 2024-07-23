"use client"
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
  House,
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
import { PendingVenueStatus } from "@/components/Venue-Status/PendingVenueStatus";
import { RupeeIcon } from "@/components/Icons";
import Cookies from 'js-cookie';


const Dashboard = () => {
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [registeredVenues, setRegisteredVenues] = useState(0);
  const [topEarningVenues, setTopEarningVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');


  useEffect(() => {
    const fetchToken = () => {
      const tokenFromCookie = Cookies.get('__securedAccess');
      if (tokenFromCookie) {
        setToken(tokenFromCookie);
      }
    };

    fetchToken();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin_details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setTotalTransactions(data.totalTransactions);
        setTotalUsers(data.totalUsers);
        setRegisteredVenues(data.registeredVenues);
        setTopEarningVenues(data.topEarningVenues);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Transactions
                </CardTitle>
                <RupeeIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-row justify-between">
                  <div>
                    <div className="text-2xl font-bold flex flex-row">
                      Rs. {totalTransactions}
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" asChild size="sm" className="ml-auto gap-1">
                      <Link href="#">
                        View Venue Wise
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
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registered Venues</CardTitle>
                <House className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{registeredVenues}</div>
              </CardContent>
            </Card>
          </div>
        )}
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Pending Venue</CardTitle>
                <CardDescription>
                  Registration requests that are pending approval.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/admin/venue-status">
                  Show All Venues
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <PendingVenueStatus />
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Top Earning Venues</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              {topEarningVenues.map((venue, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar className="hidden h-9 w-9 sm:flex">
                    <AvatarImage src={venue.avatar} alt="Avatar" />
                    <AvatarFallback>{venue.initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <p className="text-sm font-medium leading-none">
                      {venue.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {venue.location}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">Rs. {venue.earnings}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
