import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";



export default function VenueImage (props: { venueId: any; }) {
  const [items, setItems] = useState([]);
  const { venueId } = props;
  console.log('venueId:', venueId);
  if (!venueId) {
    return <div>No venueId provided</div>;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/viewphotos?venueId=${venueId}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [venueId]); // Dependency array includes venueId to refetch data if venueId changes

  return (
    <>
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
    </>
   
  );
};

// "use client";
// import React, { useState } from 'react';
// import { Image } from '@nextui-org/react';

// export default function VenueImage() {
//   const slides = [
//     {
//       url: 'https://plus.unsplash.com/premium_photo-1701693533734-bc279bdd0c80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8MTYlM0E5fGVufDB8fDB8fHww',
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1559234433-cee92ff1cd3a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8MTZ8ZW58MHx8MHx8fDA%3D',
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1551899831-7e2f4c68d312?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fDE2fGVufDB8fDB8fHww',
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1561392964-dd7a382f3447?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fDE2fGVufDB8fDB8fHww',
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1644308414850-893551d6d4c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fDE2fGVufDB8fDB8fHww',
//     },
//     {
//       url: 'https://images.unsplash.com/photo-1639170851014-d55d5debb17f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fDE2fGVufDB8fDB8fHww',
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToSlide = (slideIndex: number) => {
//     setCurrentIndex(slideIndex);
//   };

//   return (
//     <div className="flex flex-col h-500px w-full mt-2 p-4">
//       <div className="w-full  relative overflow-hidden">
//         <Image
//           src={slides[currentIndex].url}
//           alt={`Slide ${currentIndex}`}
//           className="w-full h-full object-cover"
//           style={{ minHeight: '300px',minWidth: '500px',maxHeight:'300px',maxWidth: '400px md:500px'  }} // Adjust the minHeight as needed
//         />
//       </div>
//       <div className="flex">
//         {slides.map((slide, index) => (
//           <div key={index} className="w-24 sm:w-24 h-24 sm:h-24 mt-2 mr-2 relative overflow-hidden">
//             <Image
//               src={slide.url}
//               alt={`Slide ${index}`}
//               className={`w-full h-full cursor-pointer object-cover ${index === currentIndex ? 'border border-blue-500' : ''}`}
//               style={{ minHeight: '60px',maxHeight:'60px' }} // Adjust the minHeight for small images
//               onClick={() => goToSlide(index)}
//             />
//           </div>
//         ))}
//       </div> 
//     </div>
//   );
// }