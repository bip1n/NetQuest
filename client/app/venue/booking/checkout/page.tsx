"use client";

import React, { useState } from "react";
import {Navigationbar} from "@/components/Navigationbar"
import {FooterContent} from "@/components/Footer"
import {Booking} from "@/components/Booking"
import { RupeeIcon } from '@/components/Icons';

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
    RadioGroup, 
    Radio,
    CardFooter
    } from "@nextui-org/react";


export default function CheckoutPage() {
    const [selectedOption, setSelectedOption] = useState('book');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

  
  return (
    <>
    <Navigationbar/>
     <Card>
        <CardHeader>
            <p className="text-secondary text-lg font-medium">Booking Confirmation</p>
        </CardHeader>

        <CardBody>
            <Input  fullWidth type="number" placeholder="98XXXXXXXX" label="Alternative Contact" required />
        </CardBody>
       
        <CardBody >
            <Input
                type="number"
                label="Total"
                value="1250"
                labelPlacement="outside"
                readOnly
                startContent={
                    <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small"><RupeeIcon/></span>
                    </div>
                }
                />
        </CardBody>

        <CardBody>
            <RadioGroup
                label="Booking Nature"
                orientation="horizontal"
                color="secondary"
                defaultValue="book"
                onChange={handleChange}
            >
                <Radio value="book">Book Venue</Radio>
                <Radio value="reserve">Reserve Venue</Radio>
            </RadioGroup>
            {selectedOption === 'reserve' && (
                <p className="text-xs mt-4 italic text-red-400">
                    NOTE: If not confirmed your reservation one day earlier, your reservation will be automatically cancelled.
                </p>
            )}
            {selectedOption === 'book' && (
                <p className="text-xs mt-4 uppercase text-green-400">
                    Choose Payment Gateway
                </p>
            )}
        </CardBody>
        <CardFooter className="flex justify-center">
                <Button radius="full" className="w-[30%]" color="secondary" variant="shadow">
                    Book
                </Button>
            </CardFooter>
     </Card>
    <FooterContent/>
    </>
  );
}
