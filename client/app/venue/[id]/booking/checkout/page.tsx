"use client";

import React, { useState, useEffect } from "react";
import { UserNavigationbar } from "@/components/UserNavigationbar";
import { FooterContent } from "@/components/Footer";
import { RupeeIcon } from "@/components/Icons";
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
import axios from "axios";
import { useRouter } from "next/navigation";


const CheckoutPage = () => {
  const [selectedOption, setSelectedOption] = useState('book');
  const [venuedata, setvenuedataData] = useState('');
  const router = useRouter();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleKhaltiClick = async () => {
    const Bookedprice = venuedata.price;
    const owner = venuedata.owner_id;
    const payload = {
      "return_url": "http://localhost:4000/api/khalti/response",
      "website_url": "http://localhost:3000",
      "amount": Bookedprice * 100,
      "purchase_order_id": "test12",
      "purchase_order_name": "test",
      "customer_info": {
          "name": "Khalti Bahadur",
          "email": "example@gmail.com",
          "phone": "9800000123"
      },
      // "merchant_username": "merchant_name",
      // "merchant_extra": "merchant_extra"
    };

    const response = await axios.post(`http://localhost:4000/api/khalti/payment`, payload);
    if (response) {
      window.location.href = `${response?.data?.payment_url}`;
    }

  };

  const handleEsewaClick = () => {
   
  };


  useEffect(() => {
    const storedData = localStorage.getItem('Bookdata');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const currentTime = new Date().getTime();
      const MinuteTime = 2 * 60 * 1000;

      if (currentTime - parsedData.timestamp < MinuteTime) {
        console.log(parsedData);
        setvenuedataData(parsedData);
      } else {
        // setvenuedataData('Data has expired');
        localStorage.removeItem('data');
        const owner = venuedata.owner_id;
        router.push('/venue/'+ owner);
      }
    } else {
      const owner = venuedata.owner_id;
      router.push('/venue/'+ owner);
    }
  }, []);

  return (
    <>
      <UserNavigationbar />
      <Card>
        <CardHeader>
          <p className="text-secondary text-lg font-medium">Booking Confirmation</p>
        </CardHeader>

        <CardBody>
          <Input fullWidth type="number" placeholder="98XXXXXXXX" label="Alternative Contact" required />
        </CardBody>

        <CardBody>
          <Input
            type="string"
            label="Date of Booking"
            value={venuedata.date}
            labelPlacement="outside"
            readOnly
            startContent={<div className="pointer-events-none flex items-center"></div>}
          />
        </CardBody>

        <CardBody>
          <Input
            type="number"
            label="Total"
            value={venuedata.price}
            labelPlacement="outside"
            readOnly
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small"><RupeeIcon /></span>
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
            <>
              <p className="text-xs mt-4 uppercase text-green-400">
                Choose Payment Gateway
              </p>
              <div className="flex gap-4 mt-4">
                <Button onClick={handleKhaltiClick} color="primary">Khalti</Button>
                <Button onClick={handleEsewaClick} color="secondary">Esewa</Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>
      <FooterContent />
    </>
  );
};

export default CheckoutPage;
