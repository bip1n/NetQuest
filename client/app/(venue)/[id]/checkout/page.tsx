"use client";

import React, { useState, useEffect } from "react";
import { RupeeIcon } from "@/components/Icons";
import {
  Card,
  CardHeader,
  Button,
  Input,
  RadioGroup,
  Radio,
  CardBody,
} from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const CheckoutPage = () => {
  const [selectedOption, setSelectedOption] = useState('book');
  const [venuedata, setVenuedata] = useState('');
  const router = useRouter();

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleKhaltiClick = async () => {
    const { price, owner_id, date, times } = venuedata;
    const payload = {
      "return_url": "http://localhost:4000/api/khalti/response",
      "website_url": "http://localhost:3000",
      "amount": price * 100,
      "purchase_order_id": "test12",
      "purchase_order_name": "test",
      "customer_info": {
        "name": "Khalti Bahadur",
        "email": "example@gmail.com",
        "phone": "9800000123"
      },
    };

    try {
      const response = await axios.post(`http://localhost:4000/api/khalti/payment`, payload);
      if (response) {
        window.open(response.data.payment_url, "paymentPopup", "width=600,height=600");
      }

      const token = Cookies.get("__securedAccess");
      if (token) {
        const pidx = response.data.pidx;
        const altcontact = '9840000000';

        const bookingResponse = await fetch("http://localhost:4000/api/bookvenue", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ price, date, owner_id, time: times[0], altcontact, pidx })
        });

        if (!bookingResponse.ok) {
          console.error("Error booking venue:", await bookingResponse.json());
        }
      }
    } catch (error) {
      console.error("Error during Khalti payment:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('Bookdata');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const currentTime = new Date().getTime();
      const expirationTime = 2 * 60 * 1000;

      if (currentTime - parsedData.timestamp < expirationTime) {
        setVenuedata(parsedData);
      } else {
        localStorage.removeItem('Bookdata');
        router.push(`/venue/${venuedata.owner_id}`);
      }
    } else {
      router.push(`/venue/${venuedata.owner_id}`);
    }
  }, [router, venuedata.owner_id]);

  return (
    <Card>
      <CardHeader>
        <p className="text-secondary text-lg font-medium">Booking Confirmation</p>
      </CardHeader>

      <CardBody>
        <Input fullWidth type="number" placeholder="98XXXXXXXX" label="Alternative Contact" required />
      </CardBody>

      <CardBody>
        <Input
          type="text"
          label="Date of Booking"
          value={venuedata.date}
          labelPlacement="outside"
          readOnly
        />
      </CardBody>

      <CardBody>
        <Input
          type="number"
          label="Total"
          value={venuedata.price}
          labelPlacement="outside"
          readOnly
          startContent={<span className="text-default-400 text-small"><RupeeIcon /></span>}
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
              <Button color="secondary">Esewa</Button>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default CheckoutPage;
