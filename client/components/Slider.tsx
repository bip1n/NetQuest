"use client"
import React, { useState, useRef } from 'react';
import { Image } from '@nextui-org/react'


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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
     <Image
        src={slides[currentIndex].url}
        alt={`Slide ${currentIndex}`}
        style={{ width: '400px', height: 'auto' }}
      />
      <span className='flex justify-center'>
        {slides.map((slide, slideIndex) => (
          <span
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`text-2xl cursor-pointer ${currentIndex === slideIndex ? 'text-red-500' : 'text-grey'}`}
          >
            • 
          </span>
        ))}
      </span>
    </div>
  );
}
