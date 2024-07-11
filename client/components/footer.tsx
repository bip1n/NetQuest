// components/Footer.js

import React from 'react';
import { Link } from "@nextui-org/link";
import { Card, CardBody } from '@nextui-org/react';

export const FooterContent = () => {  
  return (
    <footer>
      <Card className="max-w-9xl mx-auto m-4 mt-8 px-4 sm:px-6 lg:px-8">
        <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1 - Contact Us */}
          <CardBody className="p-4">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="mb-2">Email: contact@example.com</p>
            <p className="mb-2">Phone: +977 9876543210</p>
            <p>Address: 123 Example St, City, Country</p>
          </CardBody>
          
          {/* Column 2 - Links */}
          <CardBody className="p-4">
            <h3 className="text-xl font-bold mb-4">Links</h3>
            <ul className="space-y-2">
              <li><Link href="/team" className="text-primary hover:text-primary-dark">Team</Link></li>
              <li><Link href="/about" className="text-primary hover:text-primary-dark">About Us</Link></li>
              <li><Link href="/services" className="text-primary hover:text-primary-dark">Services</Link></li>
              {/* Add more links as needed */}
            </ul>
          </CardBody>

          {/* Column 3 - Connect with Us */}
          <CardBody className="p-4 flex justify-end">
            <div className="text-left"> {/* To align content to the left */}
              <h3 className="text-xl font-bold mb-4">Connect with Us</h3>
              <ul className="flex space-x-4">
                <li>
                  <Link href="#" className="text-primary hover:text-primary-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-primary hover:text-primary-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </CardBody>
        </CardBody>
      </Card>
    </footer>
  );
};
