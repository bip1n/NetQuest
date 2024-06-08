import React from 'react'
import { Card,CardBody,CardFooter,CardHeader,Image,Button } from '@nextui-org/react'
import { VenueIcon,PhoneIcon,MapPin, BookmarkIcon } from './Icons';
import Slider from "@/components/Slider"
import { useRouter } from 'next/navigation';

export const  VenueInfo = () =>  {
    const amenitiesList = [
        "WiFi",
        "Parking",
        "Food & Drinks",
        "Restrooms",
        // Add more amenities as needed
      ];
      const router = useRouter();
 
  return (
   <>
        
            <CardBody>
            <div className="flex items-center">
                <PhoneIcon className="w-6 h-6" />
                <a href="tel:+9779876543210" className="font-semibold text-medium ml-2 hover:underline text-blue-700">+977 9876543210</a>
            </div>
            <div className="flex items-center mt-1">
                <MapPin className="w-6 h-6" />
                    <a
                        href="https://maps.app.goo.gl/C6CFhKDZgMuXqUw26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-medium ml-2 hover:underline text-blue-700"
                    >
                        Balkumari, Lalitpur
                    </a>
            </div>
            <div className="flex items-center mt-1">
                <BookmarkIcon className="w-6 h-6" />
                <p className="font-semibold  ml-2">Facilities</p>
            </div>
              <ul className="ml-10">
                {amenitiesList.map((amenity, index) => (
                  <li className="list-disc">
                   <p className="text-sm">  {amenity} </p>
                  </li>
                ))}
              </ul>
            </CardBody>
            <div className="flex items-center mt-1">
                <p className='font-bold ml-5'>$</p>
                <p className='text-medium ml-2'>
                  Starting From <span className='text-green-600 text-medium'> Rs.850</span>
                </p>
            </div>
        <CardBody><Button color="secondary" radius="md" size="md">Book Now</Button>
        </CardBody>       
                
          
   </>
  )
}
