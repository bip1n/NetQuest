// import React, { useEffect, useState } from "react";
// import { Card, CardBody } from "@nextui-org/react";



// export default function Slider (props: { venueId: any; }) {
//   const [items, setItems] = useState([]);
//   const { venueId } = props;
//   console.log('venueId:', venueId);
//   if (!venueId) {
//     return <div>No venueId provided</div>;
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/viewphotos?venueId=${venueId}`);
//         const data = await response.json();
//         setItems(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [venueId]); // Dependency array includes venueId to refetch data if venueId changes

//   return (
//     <>
//      <div className="gap-2 grid grid-cols-1 sm:grid-cols-1">
//       {items.map((item, index) => (
//         <Card key={index} className="overflow-hidden">
//           <CardBody className="overflow-visible p-0">
//             {item.type === "image" ? (
//               <img
//                 src={item.url}
//                 alt={`Item ${index}`}
//                 className="w-full object-cover"
//                 style={{ borderRadius: "lg", boxShadow: "sm", width: "100%" }}
//               />
//             ) : (
//               <video
//                 controls
//                 className="w-full object-cover"
//                 style={{ borderRadius: "lg", boxShadow: "sm", width: "100%" }}
//               >
//                 <source src={item.url} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             )}
//           </CardBody>
//         </Card>
//       ))}
//     </div>
//     </>
   
//   );
// };

"use client";
import React, { useState } from 'react';
import { Image } from '@nextui-org/react';

export default function Slider() {
  const slides = [
    {
      url: 'https://5.imimg.com/data5/SELLER/Default/2021/5/EY/RW/SB/3103550/futsal-court-construction-500x500.jpg',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIZmho9U-ikfH1iwBL3577ImyRPBk7xdmxEw&s',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhG8ulEv2Px_APT9PI7G6y3s8siWqw6qLSQ&s',
    },
    {
      url: 'https://s.hdnux.com/photos/52/77/47/11270646/4/1200x0.jpg',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT15Gc9mydqNIZyB58e83R9HhJuOJ8E2WkCAyn45DSPy3rXkrIbU4MVriGAyN8vz3DVaN0&usqp=CAU',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhG8ulEv2Px_APT9PI7G6y3s8siWqw6qLSQ&s',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full sm:w-[500px] h-[300px] sm:h-[500px] md:h-[300px] relative overflow-hidden">
        <Image
          src={slides[currentIndex].url}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover"
          style={{ minHeight: '300px',minWidth: '400px'  }} // Adjust the minHeight as needed
        />
      </div>
      <div className="flex flex-wrap justify-center">
        {slides.map((slide, index) => (
          <div key={index} className="w-24 sm:w-24 h-24 sm:h-24 m-2 relative overflow-hidden">
            <Image
              src={slide.url}
              alt={`Slide ${index}`}
              className={`w-full h-full cursor-pointer object-cover ${index === currentIndex ? 'border border-blue-500' : ''}`}
              style={{ minHeight: '70px' }} // Adjust the minHeight for small images
              onClick={() => goToSlide(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
