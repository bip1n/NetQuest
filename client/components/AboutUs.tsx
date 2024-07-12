// components/AboutUsPage.js

import React from 'react';
import { Card, CardBody,CardHeader } from '@nextui-org/react';

export const AboutUsPage = () => {
  return (
        <Card>
          <CardHeader>
            <p className="text-primary-500 font-bold text-xl ml-4">About NetQuest</p>
          </CardHeader>
          <CardBody className="md:w-1/2 p-6">
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
  );
};
