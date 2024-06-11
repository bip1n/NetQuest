"use client"
import React, { useState, useEffect } from 'react';
import { 
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Checkbox,
  CheckboxGroup,
  Button,
  TimeInput
} from '@nextui-org/react';
import { Navigationbar } from '@/components/Navigationbar';
import { FooterContent } from '@/components/Footer';
import { Time } from "@internationalized/date";
import { ClockCircleLinearIcon } from '@/components/Icons';

export default function ProfileSetting() {
  const [files, setFiles] = useState<File[]>([]);
  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [mapsCoordinate, setMapsCoordinate] = useState('');
  const [opensAt, setOpensAt] = useState(new Time(6, 0));
  const [closesAt, setClosesAt] = useState(new Time(20, 0));
  const [features, setFeatures] = useState<string[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch('http://localhost:4000/getdetails');
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username || '');
          setContact(data.contact || '');
          setLocation(data.location || '');
          setMapsCoordinate(data.mapsCoordinate || '');
          setOpensAt(new Time(data.opensAt.hour, data.opensAt.minute));
          setClosesAt(new Time(data.closesAt.hour, data.closesAt.minute));
          setFeatures(data.features || []);
        } else {
          console.error('Failed to fetch details');
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, []);

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
      features
    };

    try {
      const response = await fetch('http://localhost:4000/senddetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
      });
      
      if (response.ok) {
        alert('Details updated successfully');
      } else {
        alert('Failed to update details');
      }
    } catch (error) {
      console.error('Error updating details:', error);
      alert('An error occurred while updating details');
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('media', file));

    try {
      const response = await fetch('http://localhost:4000/media', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        alert('Media uploaded successfully');
      } else {
        alert('Failed to upload media');
      }
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('An error occurred while uploading media');
    }
  };

  return (
    <>
      <Navigationbar />
      <Card>
        <CardHeader>
          <p className='text-secondary font-semibold'>Venue Details</p>
        </CardHeader>
        <CardBody>
          <Input 
            required 
            type='text' 
            label="Futsal Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </CardBody>
        <CardBody>
          <Input 
            required 
            type='number' 
            label="Contact" 
            value={contact} 
            onChange={(e) => setContact(e.target.value)} 
          />
        </CardBody>
        <CardBody>
          <Input 
            required 
            type='text' 
            label="Location" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
        </CardBody>
        <CardBody>
          <Input 
            required 
            type='text' 
            label="Maps Coordinate" 
            value={mapsCoordinate} 
            onChange={(e) => setMapsCoordinate(e.target.value)} 
          />
        </CardBody>
        <CardBody>
          <div className="flex gap-4">
            <TimeInput 
              label="Opens At" 
              labelPlacement="inside" 
              value={opensAt} 
              onChange={setOpensAt}
              startContent={(
                <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              )}
            />
            <TimeInput 
              label="Closes At" 
              labelPlacement="inside" 
              value={closesAt} 
              onChange={setClosesAt}
              startContent={(
                <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
              )}
            />
          </div>
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
          </CheckboxGroup>
        </CardBody>
        <CardFooter className="flex justify-center">
          <div className="flex gap-16">
            <Button color="danger" variant="flat">
              Cancel
            </Button>
            <Button color="primary" variant="flat" onClick={handleDetailsSubmit}>
              Update Profile
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className='mt-4'>
        <CardHeader>
          <p className='text-secondary font-semibold'>Upload Images</p>
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
                  <p className='text-sm font-semibold'>{file.name}</p>
                  {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt="Uploaded" className="max-w-full h-auto max-h-50" />
                  ) : (
                    <video controls src={URL.createObjectURL(file)} className="max-w-full h-auto" />
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
      <FooterContent />
    </>
  );
}
