"use client"
import React,{useState} from 'react'
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

 } from '@nextui-org/react'
import { Navigationbar } from '@/components/Navigationbar'
import { FooterContent } from '@/components/Footer'
import {Time} from "@internationalized/date";
import { ClockCircleLinearIcon } from '@/components/Icons'
export default function ProfileSetting () {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      // Limiting the number of files to 5
      const selectedFiles = Array.from(fileList).slice(0, 5);
      setFiles([...files, ...selectedFiles]);
    }
  };
 return (
    <>
      <Navigationbar/>
      <Card>
        <CardHeader>
          <p className='text-secondary font-semibold'>Venue Details</p>
        </CardHeader>
        <CardBody>
            <Input required  type='text' label="Futsal Username" defaultValue='Kick Futsal' />
        </CardBody>
        <CardBody>
            <Input required  type='number' label="Contact" defaultValue='9876543210'/>
        </CardBody>
        <CardBody>
            <Input required  type='text' label="Location" defaultValue='Balkumari, Lalitpur'/>
        </CardBody>
        <CardBody>
            <Input required  type='text' label="Maps Coordinate" defaultValue='asdkjeisaiugaiudgasd'/>
        </CardBody>
        <CardBody>
        <div className="flex gap-4">
          <TimeInput 
            label="Opens At" 
            labelPlacement="inside" 
            defaultValue={new Time(6, 0)} 
            startContent={(
              <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            )}
          />
          <TimeInput 
            label="Closes At" 
            labelPlacement="inside" 
            defaultValue={new Time(20, 0)} 
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
          defaultValue={["parking", "wifi","water"]}
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
            <Button color="primary" variant="flat">
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
              <Input type="file" accept="image/*, video/*" multiple onChange={handleFileChange} className="w-full mb-4" />
              {files.map((file, index) => (
                <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
                  <CardBody className="bg-gray-100 p-2 rounded-lg">
                    <p className='text-sm font-semibold'>{file.name}</p>
                    {file.type.startsWith('image/') ? (
                      <img src={URL.createObjectURL(file)} alt="Uploaded" className="max-w-full h-auto  max-h-50" />
                    ) : (
                      <video controls src={URL.createObjectURL(file)} className="max-w-full h-auto" />
                    )}
                  </CardBody>
                </div>
              ))}
            </div>
          </CardBody>
          <CardFooter>
            <Button color="secondary" variant="shadow">
              Upload
            </Button>
          </CardFooter>
        </Card>
      <FooterContent/>
    </>
  )
}

