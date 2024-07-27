"use client"
import React from 'react';
import Link from "next/link";
import {
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';


const AboutInfo = () => {

  return (
          <div className="grid gap-4">
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader>
                    <p className="flex flex-row items-center justify-center sm:justify-start uppercase text-large font-bold">
                        About NetQuest
                    </p>
                </CardHeader>
                <CardContent className='text-center'>
                        <p>
                        NetQuest,is designed to ease the way of booking futsal venues in Kathmandu. This platform aims to provide a centralized, user-friendly system where players can effortlessly search for, book, and pay for futsal venues in real time. Simultaneously, venue owners will benefit from streamlined booking management, increased visibility, and enhanced revenue opportunities.
                        </p>
                </CardContent>
            </Card>
          </div>
  );
};

export default AboutInfo;
