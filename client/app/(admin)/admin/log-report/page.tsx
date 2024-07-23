"use client"
import React from "react";
import {Card,CardBody,CardFooter,Input,CardHeader, Select, SelectItem, Button} from "@nextui-org/react";
import {LogSheet} from "@/components/LogSheet"

export const range = [
    {key: 1, label: "Last Week"},
    {key: 2, label: "Last Month"},
    {key: 3, label: "Lifetime"},
  ];
  

export default function App() {
  return (
    <div className="p-4">    
    <Card className="mb-4">
        <CardHeader>  <p className="text-secondary-500 uppercase font-medium"> Venue Log Report</p> </CardHeader>
        <div className="flex flex-row">
            <div>
                <CardBody>
                    <Input
                        label="Venue ID"
                       
                    />
                </CardBody>
            </div>

            <div>
                <CardBody>
                    <Select
                        items={range}
                        label="Range"
                        placeholder="Select range"
                        className="md:w-60 w-40"
                        >
                        {(range) => <SelectItem key={range.key} >{range.label}</SelectItem>}
                    </Select>
            </CardBody>
            </div>
        </div>
        <CardBody className="w-[40%] md:w-[15%]">
                <Button variant="solid">Generate Report</Button>
        </CardBody>
    </Card>
     <LogSheet/>

    </div>
  
  );
}
