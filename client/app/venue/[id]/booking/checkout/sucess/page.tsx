"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";

const sucessPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pidx = urlParams.get('pidx');
      if (!pidx) {
        router.push('/venue/'+ id);
      }
      const payload = {
        "pidx": pidx
      };
      try {
        const response = await axios.post(`http://localhost:4000/api/khalti/response`, payload);
        if (response) {
          console.log(response);
          if (response.data.status === 'Completed') {
            setStatus('Payment Success');
          }
          if (response.data.status === 'Initiated') {
            setStatus('Payment Initiated');
          }
          if (response.data.status === 'Pending') {
            setStatus('Payment Pending');
          }
          if (response.data.status === 'Refunded') {
            setStatus('Payment Refunded');
          }
          if (response.data.status === 'Expired') {
            setStatus('Payment Expired');
          }
          if (response.data.status === 'User canceled') {
            setStatus('User canceled');
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {status}
    </div>
  );
};

export default sucessPage;
