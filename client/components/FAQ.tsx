import React from 'react';
import { Card, CardBody, CardHeader, Accordion, AccordionItem } from '@nextui-org/react';

export const FAQ = () => {
  return (
    <Card>
      <CardHeader className='flex flex-row justify-center'>
        <p className="text-danger-500 font-bold text-xl uppercase">FAQ</p>
      </CardHeader>
      <CardBody >
        <Accordion>
          <AccordionItem key="1" aria-label="Why should an individual use NetQuest?"  startContent={<p className="text-secondary font-semibold">Why should an individual use NetQuest?</p>}>
            Individuals should use NetQuest because it simplifies the process of finding and booking available futsal venues. The platform provides a user-friendly interface, real-time availability, and convenient payment options, making it easy to secure a venue for your next game.
          </AccordionItem>
          <AccordionItem key="2" aria-label="Why is NetQuest helpful for venue owners?" startContent={<p className="text-secondary font-semibold">Why is NetQuest helpful for venue owners?</p>}>
            NetQuest is beneficial for venue owners as it streamlines the booking process, reduces manual administrative tasks, and increases venue visibility. Venue owners can manage their schedules, automate bookings, and generate detailed logs for better business insights.
          </AccordionItem>
          <AccordionItem key="3" aria-label="Can I cancel or reschedule a booking on NetQuest?" startContent={<p className="text-secondary font-semibold">Can I cancel or reschedule a booking on NetQuest?</p>}>
            Yes, NetQuest allows users to cancel or reschedule their bookings based on the venue's cancellation policy. You can manage your bookings through your account dashboard and make necessary changes as needed.
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
};
