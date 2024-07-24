"use client"
import React, { useState } from "react";
import { Card, CardBody, CardFooter, Input, CardHeader, Select, SelectItem, Button } from "@nextui-org/react";
import { LogSheet } from "@/components/LogSheet";

export const range = [
  { key: 1, label: "Last Week" },
  { key: 2, label: "Last Month" },
  { key: 3, label: "Lifetime" },
];

export default function App() {
  const [venueId, setVenueId] = useState("");
  const [selectedRange, setSelectedRange] = useState("");
  const [reportParams, setReportParams] = useState({ venueId: "", range: "" });

  const handleGenerateReport = () => {
    setReportParams({ venueId, range: selectedRange });
  };

  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardHeader>
          <p className="text-secondary-500 uppercase font-medium"> Venue Log Report</p>
        </CardHeader>
        <div className="flex flex-row">
          <div>
            <CardBody>
              <Input
                label="Venue ID"
                value={venueId}
                onChange={(e) => setVenueId(e.target.value)}
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
                onChange={(key) => setSelectedRange(key)}
              >
                {(item) => <SelectItem key={item.key}>{item.label}</SelectItem>}
              </Select>
            </CardBody>
          </div>
        </div>
        <CardBody className="w-[40%] md:w-[15%]">
          <Button variant="solid" onClick={handleGenerateReport}>
            Generate Report
          </Button>
        </CardBody>
      </Card>
      <LogSheet venueId={reportParams.venueId} range={reportParams.range} />
    </div>
  );
}
