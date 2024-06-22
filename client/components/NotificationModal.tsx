import React from 'react'
import {Chip, Popover, PopoverTrigger, PopoverContent,Card,CardBody,CardFooter, Button, useDisclosure, CardHeader} from "@nextui-org/react";
import { NotificationIcon } from './Icons';

export const NotificationModal = () => { 
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <>
         
      <Popover backdrop='opaque' size='lg' >
      <PopoverTrigger>
            <Button  isIconOnly aria-label="Notification" variant="light"><NotificationIcon/></Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Notifications
            </p>
            <div className="mt-2 flex flex-col gap-2 w-full">
                <Card>
                    <CardBody>Venue</CardBody>
                    <Chip className='flex-right'>Status</Chip>
                </Card>
             
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>


    </>
  )
}


