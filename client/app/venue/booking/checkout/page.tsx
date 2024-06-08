"use client";

import React, { useState } from "react";
import {Navigationbar} from "@/components/Navigationbar"
import {FooterContent} from "@/components/Footer"
import {Booking} from "@/components/Booking"
import { 
    Card,
    CardHeader,
    Button,
    Link,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    ModalContent,
    CardBody,
    } from "@nextui-org/react";


export default function CheckoutPage() {
  
  return (
    <>
    <Navigationbar/>
     <Card>
        <CardHeader>
            <p className="text-secondary text-lg font-medium">Booking Checkout</p>
        </CardHeader>
        <CardBody>
        <Input
                    type="text"
                    label="Name"
                    required
                  />
        </CardBody>
     </Card>
    <FooterContent/>
    </>
  );
}
