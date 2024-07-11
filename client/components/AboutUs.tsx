// components/AboutUsPage.js

import React from 'react';
import { Card, CardBody } from '@nextui-org/react';

export const AboutUsPage = () => {
  return (
    <div className="py-8">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="flex flex-col md:flex-row">
          {/* Image Column */}
          <div className="md:w-1/2">
            <img
              src="https://res.cloudinary.com/dwc7juq50/image/upload/v1720600191/CoverPage_fylzjs.png"
              alt="Cover"
              className="object-cover w-[80%] h-full"
            />
          </div>
          
          {/* Content Column */}
          <CardBody className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4">About Us</h1>
            <p className="mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit purus vitae lectus tincidunt, sed blandit risus vulputate. Pellentesque ultrices urna sit amet justo finibus, at bibendum ligula tincidunt.
            </p>
            <p className="mb-6">
              Fusce ultricies augue non orci commodo, ac scelerisque orci vehicula. Duis feugiat justo ac risus finibus, sit amet faucibus enim fermentum.
            </p>
            <p>
              Nullam consectetur magna nec erat consequat, ac rhoncus leo tincidunt. Proin imperdiet dui vel est lacinia, et interdum ipsum tristique.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
