import React from 'react'
import { Card,CardBody,CardFooter,CardHeader,Image } from '@nextui-org/react'
import { VenueIcon,PhoneIcon,MapPin, BookmarkIcon } from './Icons';
// import {Slider} from "@/components/Slider"

export const  VenueInfo = () =>  {
    const amenitiesList = [
        "WiFi",
        "Parking",
        "Food & Drinks",
        "Restrooms",
        // Add more amenities as needed
      ];
    
      const venueImage = [
        "https://5.imimg.com/data5/SELLER/Default/2021/5/EY/RW/SB/3103550/futsal-court-construction-500x500.jpg",
        //  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIZmho9U-ikfH1iwBL3577ImyRPBk7xdmxEw&s"
      ]

  return (
   <>
       <p className="font-bold text-xl p-3">Kick Futsal</p>
       <CardBody>
            {venueImage.map((image) => (
                   <Image
                      width={420}
                      alt="Futsal Image"
                      src={image}
                    />
              ))}          
        {/* <Slider/> */}
       </CardBody>        
          <Card className="m-1">
            <CardBody>
            <div className="flex items-center">
                <VenueIcon className="w-6 h-6" />
                <p className="font-semibold text-medium ml-2 uppercase">Kick Futsal</p>
                <p className="font-normal text-xs ml-2  text-blue-500">[4.3/5]</p>
            </div>
            <div className="flex items-center mt-1">
                <PhoneIcon className="w-6 h-6" />
                <a href="tel:+9779876543210" className="font-semibold text-sm ml-2 hover:underline text-blue-700">+977 9876543210</a>
            </div>
            <div className="flex items-center mt-1">
                <MapPin className="w-6 h-6" />
                    <a
                        href="https://maps.app.goo.gl/C6CFhKDZgMuXqUw26"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-sm ml-2 hover:underline text-blue-700"
                    >
                        Balkumari, Lalitpur
                    </a>
            </div>
            <div className="flex items-center mt-1">
                <BookmarkIcon className="w-6 h-6" />
                <p className="font-semibold text-sm ml-2">Facilities</p>
            </div>
              <ul className="ml-10">
                {amenitiesList.map((amenity, index) => (
                  <li className="list-disc" key={index}>
                   <p className="text-sm">  {amenity} </p>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
          
   </>
  )
}
