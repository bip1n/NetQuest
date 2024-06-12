import React from "react";
import { Image, Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import {AdminNavigationBar} from "@/components/AdminNavigationBar"
import {UserGraph} from "@/components/UserGraph"
export default function AdminDashboard() {
  return (
    <>
    <AdminNavigationBar/>
    <UserGraph/>
        <p className="text-secondary text-medium font-semibold">Admin Section</p>
    </>
  );
}
