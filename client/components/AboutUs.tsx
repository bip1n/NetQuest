// components/AboutUsPage.js

import React from 'react';
import { Card, CardBody,CardHeader } from '@nextui-org/react';

export const AboutUsPage = () => {
  return (
        <Card>
          <CardHeader className='flex flex-row justify-center'>
            <p className="text-danger-500 font-bold text-xl uppercase">About NetQuest</p>
          </CardHeader>
          <CardBody>
            <p>
            "NetQuest", a web application designed to ease the way of booking futsal venues in Kathmandu. This platform aims to provide a centralized, user-friendly system where players can effortlessly search for, book, and pay for futsal venues in real time. Simultaneously, venue owners will benefit from streamlined booking management, increased visibility, and enhanced revenue opportunities.
            </p>
          </CardBody>
        </Card>
  );
};
