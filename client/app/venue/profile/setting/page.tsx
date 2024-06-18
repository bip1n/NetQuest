"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Checkbox,
  CheckboxGroup,
  Button,
  TimeInput,
  Spinner
} from "@nextui-org/react";
import { UserNavigationbar } from "@/components/UserNavigationbar";
import { FooterContent } from "@/components/Footer";
import { Time } from "@internationalized/date";
import { ClockCircleLinearIcon } from "@/components/Icons";
// import Cookies from 'js-cookie';

export default function ProfileSetting() {
  const [files, setFiles] = useState<File[]>([]);
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [mapsCoordinate, setMapsCoordinate] = useState("");
  const [opensAt, setOpensAt] = useState(new Time(6, 0));
  const [closesAt, setClosesAt] = useState(new Time(20, 0));
  const [features, setFeatures] = useState<string[]>([]);
  const [dataFetch, setDataFetch] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Get token from cookies and store it in state
    // const token = Cookies.get('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjdkM2VkNGZjYTAwZDNkMWI2NzAyNyIsImVtYWlsIjoic2l2YWhAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3MTgyODYxNTgsImV4cCI6MTcxODI4OTc1OH0.9JaEce5Lj0S2aCmlBQIat_TUL3dpm4Bzji7Z5D1tc-4';
    if (token) {
      setToken(token);
    }
    // Fetch initial details from the server
    const fetchDetails = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/viewprofile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsername(data.venueName || "");
          setContact(data.phone || "");
          setLocation(data.address || "");
          setMapsCoordinate(data.mapCoord || "");
          setOpensAt(new Time(data.opensAt.hour, data.opensAt.minute));
          setClosesAt(new Time(data.closesAt.hour, data.closesAt.minute));
          setFeatures(data.amenities || []);
          setDataFetch(true);
        } else {
          console.error("Failed to fetch details");
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    if (token) {
      fetchDetails();
    }
  }, [token]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const selectedFiles = Array.from(fileList).slice(0, 10);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleDetailsSubmit = async () => {
    const details = {
      username,
      contact,
      location,
      mapsCoordinate,
      opensAt: { hour: opensAt.hour, minute: opensAt.minute },
      closesAt: { hour: closesAt.hour, minute: closesAt.minute },
      features,
    };

    try {
      const response = await fetch("http://localhost:4000/api/updateProfile", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(details),
      });

      if (response.ok) {
        alert("Details updated successfully");
      } else {
        alert("Failed to update details");
      }
    } catch (error) {
      console.error("Error updating details:", error);
      alert("An error occurred while updating details");
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
  
    files.forEach((file, index) => {
      formData.append(`media`, file);
    });
  
    console.log(formData);
    try {
      const response = await fetch("http://localhost:4000/api/savemedia", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
  
      if (response.ok) {
        alert("Media uploaded successfully");
      } else {
        alert("Failed to upload media");
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("An error occurred while uploading media");
    }
  };
  

  return (
    <>
   
      {dataFetch ? 
       <div>
      <UserNavigationbar />
      <Card>
        <CardHeader>
          <p className="text-secondary font-semibold">Venue Details</p>
        </CardHeader>
        <CardBody>
          <Input
            required
            type="text"
            label="Futsal Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </CardBody>
        <CardBody>
          <Input
            required
            type="number"
            label="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </CardBody>
        <CardBody>
          <Input
            required
            type="text"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </CardBody>
        <CardBody>
          <Input
            required
            type="text"
            label="Maps Coordinate"
            value={mapsCoordinate}
            onChange={(e) => setMapsCoordinate(e.target.value)}
          />
        </CardBody>
       
        <CardBody>
          <CheckboxGroup
            label="Features"
            orientation="horizontal"
            color="secondary"
            value={features}
            onChange={setFeatures}
          >
            <Checkbox value="water">Water</Checkbox>
            <Checkbox value="parking">Parking</Checkbox>
            <Checkbox value="wifi">Wi-Fi</Checkbox>
            <Checkbox value="locker">Locker</Checkbox>
            <Checkbox value="resturant">Resturant</Checkbox>
            <Checkbox value="shower">Shower</Checkbox>
            <Checkbox value="toilet">Toilet</Checkbox>
            <Checkbox value="changingRoom">Changing Room</Checkbox>
            <Checkbox value="firstAid">First Aid</Checkbox>
            <Checkbox value="security">Security</Checkbox>
            <Checkbox value="floodLight">Flood Light</Checkbox>
            <Checkbox value="canteen">Canteen</Checkbox>
            <Checkbox value="food">Food</Checkbox>
            <Checkbox value="swimming">Swimming</Checkbox>
            <Checkbox value="Green carpet">Green carpet</Checkbox>
          </CheckboxGroup>
        </CardBody>
        <CardFooter className="flex justify-center">
          <div className="flex gap-16">
            <Button color="danger" variant="flat">
              Cancel
            </Button>
            <Button
              color="primary"
              variant="flat"
              onClick={handleDetailsSubmit}
            >
              Update Profile
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <p className="text-secondary font-semibold">Upload Images</p>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap">
            <Input
              type="file"
              accept="image/*, video/*"
              multiple
              onChange={handleFileChange}
              className="w-full mb-4"
            />
            {files.map((file, index) => (
              <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
                <CardBody className="bg-gray-100 p-2 rounded-lg">
                  <p className="text-sm font-semibold">{file.name}</p>
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Uploaded"
                      className="max-w-full h-auto max-h-50"
                    />
                  ) : (
                    <video
                      controls
                      src={URL.createObjectURL(file)}
                      className="max-w-full h-auto"
                    />
                  )}
                </CardBody>
              </div>
            ))}
          </div>
        </CardBody>
        <CardFooter>
          <Button color="secondary" variant="shadow" onClick={handleUpload}>
            Upload
          </Button>
        </CardFooter>
      </Card>
      
      
      </div>
      :<Spinner/>
      
      }
      <FooterContent />
      
    </>
  );
}
