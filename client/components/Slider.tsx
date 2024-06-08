import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function Slider() {
  const list = [
    {
      title: "Orange",
      img: "https://www.tarkettsportsindoor.com/wp-content/uploads/2019/10/futsal.jpg",
    },
    {
      title: "Tangerine",
      img: "https://5.imimg.com/data5/SELLER/Default/2021/5/EY/RW/SB/3103550/futsal-court-construction-500x500.jpg",
    },
    {
      title: "Raspberry",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNA4mvp6wXwuztfTY_ouy3oPDKxzlj8ZBcfQivfoRfE6NTR3FKssMpEvB1QvtvPiHmaIY&usqp=CAU",
    },
    {
      title: "Lemon",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4grFGjZRV1NI1eiubTlF4C1VkFV_cI9aDBA&s",
    },
   
  ];

  return (
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-1">
      {list.map((item) => (
        
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-cover"
              src={item.img}
            />
          </CardBody>
      ))}
    </div>
  );
}
