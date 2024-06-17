import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";

interface SliderProps {
  id: string;
}

export const Slider: React.FC<SliderProps> = ({ id }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/viewphotos?id=${id}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Dependency array includes id to refetch data if id changes

  return (
    <div className="gap-2 grid grid-cols-1 sm:grid-cols-1">
      {items.map((item, index) => (
        <Card key={index} className="overflow-hidden">
          <CardBody className="overflow-visible p-0">
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={`Item ${index}`}
                className="w-full object-cover"
                style={{ borderRadius: "lg", boxShadow: "sm", width: "100%" }}
              />
            ) : (
              <video
                controls
                className="w-full object-cover"
                style={{ borderRadius: "lg", boxShadow: "sm", width: "100%" }}
              >
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
