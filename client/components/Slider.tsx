import React, { useEffect, useState } from "react";
import { Card, CardBody, Image } from "@nextui-org/react";

interface SliderProps {
  id: string;
}

// export default function Slider() {
export const Slider: React.FC<SliderProps> = ({ id }) => {
  const [items, setItems] = useState([]);

  // useEffect to fetch data from server when the component mounts
  useEffect(() => {
    // Replace this URL with your actual endpoint
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/viewphotos?id=${id}`); // Change the URL to your API endpoint
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when component mounts

  return (
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-1">
      {items.map((item) => (
        <Card key={item.title} className="overflow-hidden">
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
        </Card>
      ))}
    </div>
  );
}
