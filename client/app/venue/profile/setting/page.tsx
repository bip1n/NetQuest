"use client"
import React from 'react'
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
  return (
    <>
      <Navigationbar/>
      <Card>
        <CardHeader>
          <p className='text-secondary font-semibold'>Venue Details</p>
        </CardHeader>
        <CardBody>
            <Input required  type='text' label="Futsal Username" placeholder='hello' />
        </CardBody>
        <CardBody>
            <Input required  type='number' label="Contact" value='9876543210'/>
        </CardBody>
        <CardBody>
            <Input required  type='text' label="Location" value='Balkumari, Lalitpur'/>
        </CardBody>
        <CardBody>
            <Input required  type='text' label="Maps Coordinate" value='asdkjeisaiugaiudgasd'/>
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

