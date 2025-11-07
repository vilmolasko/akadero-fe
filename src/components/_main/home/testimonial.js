'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sophia Laurent',
    avatar: '/avatar-1.jpg',
    rating: 5,
    title: 'No Hidden Fees, Just Grea...',
    content:
      'I love how easy it is to find flights on ReactFlights! The prices are transparent, and the process is quick. Definitely using it again!',
  },
  {
    id: 2,
    name: 'Hiroshi Tanaka',
    avatar: '/avatar-3.jpg',
    rating: 5,
    title: 'Smooth & Hassle-Free Expe...',
    content:
      "ReactFlights offers great options and flexibility. It's my go-to website for all flight bookings. Highly recommended!",
  },
  {
    id: 3,
    name: 'Carlos Gonzalez',
    avatar: '/avatar-2.jpg',
    rating: 4,
    title: 'Best Deals on Flights!',
    content: 'Incredible deals!',
  },

  {
    id: 4,
    name: 'Liam Kingston',
    avatar: '/avatar-4.jpg',
    rating: 5,
    title: 'Perfect for Last-Minute F...',
    content:
      'Amazing experience! ReactFlights helped me find a last-minute ticket at an unbeatable price.',
  },
  {
    id: 5,
    name: 'Emily R.',
    avatar: '/avatar-5.jpg',
    rating: 5,
    title: 'Seamless Booking & Great ...',
    content:
      'ReactFlights made my booking process effortless! I found the best deals and booked my flight within minutes. The interface is user-friendly.',
  },
  {
    id: 6,
    name: 'Aisha Mohammed',
    avatar: '/avatar-6.jpg',
    rating: 5,
    title: 'Fast, Reliable & Affordable...',
    content: 'I always use ReactFlights for my international trips.',
  },
];

export default function Testimonials() {
  return (
    <div className='testimonials py-5 md:py-10'>
      {/* Header */}
      <div className='testimonials-content max-w-[820px] mx-auto'>
        <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold font-merriweather text-center leading-relaxed tracking-wider'>
          Learners Love Us.
        </h1>
        <p className='text-md md:text-normal text-center text-secondary tracking-wider'>
          Join 50,000+ Learners in 20+ Categories and 500+ Courses.
        </p>
      </div>
      {/* Testimonials Cards */}
      <div className='columns-1 gap-4 md:columns-2 lg:columns-3 mt-6 md:mt-12'>
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className='relative mb-4 P-2 cursor-pointer overflow-hidden hover:bg-muted transition-colors duration-500'>
            {/* Decorative Quote Mark */}
            <div className='absolute right-4 top-4 text-6xl font-serif text-blue-200/60'>
              <svg
                stroke='currentColor'
                fill='currentColor'
                strokeWidth='0'
                viewBox='0 0 512 512'
                height='40'
                width='40'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M464 32H336c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48zm-288 0H48C21.5 32 0 53.5 0 80v128c0 26.5 21.5 48 48 48h80v64c0 35.3-28.7 64-64 64h-8c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h8c88.4 0 160-71.6 160-160V80c0-26.5-21.5-48-48-48z'></path>
              </svg>
            </div>

            <CardContent className='p-6'>
              {/* Avatar and Rating */}
              <div className='relative z-10 mb-4 flex items-start gap-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col gap-1'>
                  <Rating
                    value={testimonial.rating}
                    size={16}
                  />
                  <CardTitle className='text-normal '>
                    {testimonial.name}
                  </CardTitle>
                </div>
              </div>

              {/* Content */}
              <div className='relative z-10 space-y-2'>
                <CardTitle className='text-18 '>{testimonial.title}</CardTitle>
                <CardDescription className='text-md text-secondary'>
                  {testimonial.content}
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <TestimonialCard /> */}
    </div>
  );
}
