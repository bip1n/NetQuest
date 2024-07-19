import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export const FeaturedVenue = () => {
  return (
    <Card>
       <CardHeader className="flex flex-row justify-center">
          <p className="text-danger-500 font-bold text-xl ml-4 uppercase">Featured</p>
        </CardHeader>
        <CardBody>
          <CardBody>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src="https://nextui.org/images/hero-card-complete.jpeg"
                      width={370}
                    />
                  </CardBody>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">Kick Futsal</h4>
                    <p className="text-tiny uppercase ">Lalitpur</p>
                    <small className="text-default-500">Starting from </small>
                  </CardHeader>
                </CardBody>

      </CardBody>
    </Card>
   
  );
};
