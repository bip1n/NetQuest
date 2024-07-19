import React, { useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio,Card,CardBody,CardFooter,CardHeader, Link} from "@nextui-org/react";
import {AdminNavigationBar} from "@/components/AdminNavigationBar"
import { PendingVenueStatus } from "@/components/Venue-Status/PendingVenueStatus";

export default function Admin() {
  return (
   <>
   <AdminNavigationBar/>
   <div>
    <Card className="p-4 m-2"> 
      <CardHeader>
        <p className="text-danger-500 uppercase font-bold text-l">Admin Dashboard</p>
      </CardHeader>
      <Card>
          <CardBody>
            <p className=" italic">You have <b className="text-warning-500">9</b> pending venues to lookup.</p>
          </CardBody>
         <CardBody>
          <div className="flex flex-row justify-center space-between">
            <div className="w-1/5 mx-4">
              <Card >
                <CardHeader className="text-secondary-500 uppercase font-bold"> <Link href="/admin/venue-status">Venue Details</Link> </CardHeader>
                <CardBody>
                  <div className="flex justify-between">
                    <div>
                      <span>Active Venues:</span>
                    </div>
                    <div className="justify-end font-semibold text-success-600"> 
                      10
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span>Active Venues:</span>
                    </div>
                    <div className="justify-end font-semibold text-success-600"> 
                      10
                    </div>
                  </div>
                  
                </CardBody>
              </Card>
            </div>
            <div className="w-4/5 mx-4">
              <Card >
                <CardHeader>User Details</CardHeader>
                <CardBody>
                  
                </CardBody>
              </Card>
            </div>
        </div>
      </CardBody>
      </Card>
     
    </Card>
   </div>
   </>
  );
}