"use client"
import Link from "next/link"
import { ThemeSwitch } from "@/components/ThemeSwitch";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { RupeeIcon } from "@/components/Icons";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SalesChart } from "./SalesChart";
const Dashboard = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Revenue Generated
              </CardTitle>
                <RupeeIcon className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between">
                <div>
                  <div className="text-2xl font-bold flex flex-row">Rs. 45,231.89</div>
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
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between">
                <div>
                  <div className="text-2xl font-bold flex flex-row">27</div>
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
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-row justify-between">
                <div>
                  <div className="text-2xl font-bold flex flex-row">57</div>
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
                <CardTitle>Ongoing Bookings</CardTitle>
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
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        +977 9876543210
                      </div>
                    </TableCell>
                    <TableCell>2023-06-23</TableCell>
                    <TableCell>7:00 AM</TableCell>
                    <TableCell>$250.00</TableCell>
                  </TableRow>
                 
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          {/* Pachi Garne */}
          <Card x-chunk="dashboard-01-chunk-5 " className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">

              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none ">
                    Olivia Martin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    9876543210
                  </p>
                </div>
                <div className="ml-auto font-medium">2023-06-23</div>
                <div className="ml-auto font-medium">7:00 AM</div>
                <div className="ml-auto font-medium">Rs.1250</div>
              
              </div>
            
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboard