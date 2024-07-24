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
                <CardContent className='text-left'>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit purus vitae lectus tincidunt, sed blandit risus vulputate. Pellentesque ultrices urna sit amet justo finibus, at bibendum ligula tincidunt.
                        </p>
                        <p>
                        Fusce ultricies augue non orci commodo, ac scelerisque orci vehicula. Duis feugiat justo ac risus finibus, sit amet faucibus enim fermentum.
                        </p>
                        <p>
                        Nullam consectetur magna nec erat consequat, ac rhoncus leo tincidunt. Proin imperdiet dui vel est lacinia, et interdum ipsum tristique.
                        </p>
                </CardContent>
            </Card>
          </div>
  );
};

export default AboutInfo;
