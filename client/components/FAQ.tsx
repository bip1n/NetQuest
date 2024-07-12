
import React from 'react';
import { Card, CardBody,CardHeader,Accordion, AccordionItem } from '@nextui-org/react';

export const FAQ = () => {
  return (
    // <div className="py-8">
    //   <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
            <CardHeader>
            <p className="text-primary-500 font-bold text-xl ml-4">FAQ</p>
          </CardHeader>
          <CardBody>
              <Accordion>
                  <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. At sunt, esse nihil aliquam laudantium nemo quia voluptas provident et recusandae ab aspernatur iusto corrupti. Rerum veniam exercitationem quos nulla optio.
                  </AccordionItem>
                  <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. At sunt, esse nihil aliquam laudantium nemo quia voluptas provident et recusandae ab aspernatur iusto corrupti. Rerum veniam exercitationem quos nulla optio.
                  </AccordionItem>
                  <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. At sunt, esse nihil aliquam laudantium nemo quia voluptas provident et recusandae ab aspernatur iusto corrupti. Rerum veniam exercitationem quos nulla optio.
                  </AccordionItem>
                </Accordion>
          </CardBody>
        </Card>
    //   </div>
    // </div>
  );
};
