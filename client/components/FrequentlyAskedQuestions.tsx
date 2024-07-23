import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  
  export function FrequentlyAskedQuestions() {
    return (
        <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader>
            <p className="flex flex-row items-center justify-center sm:justify-start uppercase text-large font-bold">
                Frequently Asked Questions
            </p>
        </CardHeader>
        <CardContent>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                <AccordionTrigger>Why should an individual use NetQuest?</AccordionTrigger>
                <AccordionContent>
                    Individuals should use NetQuest because it simplifies the process of finding and booking available futsal venues. The platform provides a user-friendly interface, real-time availability, and convenient payment options, making it easy to secure a venue for your next game.
                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                <AccordionTrigger>Why is NetQuest helpful for venue owners?</AccordionTrigger>
                <AccordionContent>
                NetQuest is beneficial for venue owners as it streamlines the booking process, reduces manual administrative tasks, and increases venue visibility. Venue owners can manage their schedules, automate bookings, and generate detailed logs for better business insights.

                </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                <AccordionTrigger>Can I cancel a booking on NetQuest?</AccordionTrigger>
                <AccordionContent>
                Yes, NetQuest allows users to cancel their bookings based on the venue's cancellation policy. You can manage your bookings through your account dashboard and make necessary changes as needed.
                </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
    )
  }
  