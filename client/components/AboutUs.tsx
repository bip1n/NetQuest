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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit purus vitae lectus tincidunt, sed blandit risus vulputate. Pellentesque ultrices urna sit amet justo finibus, at bibendum ligula tincidunt.
            </p>
            <p>
              Fusce ultricies augue non orci commodo, ac scelerisque orci vehicula. Duis feugiat justo ac risus finibus, sit amet faucibus enim fermentum.
            </p>
            <p>
              Nullam consectetur magna nec erat consequat, ac rhoncus leo tincidunt. Proin imperdiet dui vel est lacinia, et interdum ipsum tristique.
            </p>
          </CardBody>
        </Card>
  );
};
