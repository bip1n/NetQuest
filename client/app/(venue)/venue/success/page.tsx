"use client";

import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";


const SuccessPage = () => {
  const [responseData, setResponseData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const pidx = urlParams.get('pidx');
        const error_key = urlParams.get('error_key');

        if (error_key) {
          router.push(`/`)
          return;
        }

        if (pidx) {
          const response = await axios.post(`http://localhost:4000/api/verifypayment`, { pidx });
          if (response.data.status === 'Completed') {
            setPaymentStatus('Completed');
          } else if (response.data.status === 'Pending') {
            setPaymentStatus('Pending');
          } else if (response.data.status === 'Initiated') {
            setPaymentStatus('Initiated');
          } else if (response.data.status === 'Refunded') {
            setPaymentStatus('Refunded');
          } else if (response.data.status === 'Expired') {
            setPaymentStatus('Expired');
          } else if (response.data.status === 'User canceled') {
            setPaymentStatus('User canceled');
          }
          setResponseData(response.data);
        }else{
          router.push(`/`)
        }
      } catch (error) {
        console.error("There was an error verifying the payment!", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {responseData ? (
        <div>
          <h2>Payment Verification Successful</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
          {paymentStatus}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SuccessPage;
