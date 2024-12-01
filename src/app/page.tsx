"use client";

import { useEffect } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
// import { buttonVariants } from "@/components/ui/button";
import { CheckCircle, DollarSign, Headphones } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Homepage() {
  const { vehicles, fetchVehicles } = useVehicleStore();
  const { toast } = useToast();

  useEffect(() => {
    fetchVehicles().catch(() =>
      toast({ title: "Error", description: "Failed to fetch vehicles" })
    );
  }, [fetchVehicles, toast]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section with Gradient Overlay */}
        <section
          className="relative w-full bg-cover bg-center h-[60vh] flex items-center justify-center text-white"
          style={{ backgroundImage: "url('/hero-car.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          <div className="relative z-10 text-center p-8">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
              Explore Luxury & Comfort
            </h1>
            <p className="text-xl mb-6 font-light">
              Find the perfect car for your next trip at affordable prices.
            </p>
            <Link
              href="/vehicles"
              className="font-bold px-6 py-3 bg-gradient-to-r from-blue-500 to-black text-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              Explore Vehicles
            </Link>
          </div>
        </section>

        {/* Why Choose Us Section with Icons */}
        <section className="py-20 bg-gray-100 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 container mx-auto">
            {/* Fast & Easy Booking */}
            <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-6">
                <CheckCircle className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Fast & Easy Booking
              </h3>
              <p className="text-gray-600">
                Book a car in minutes with our user-friendly platform.
              </p>
            </div>

            {/* Affordable Prices */}
            <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-6">
                <DollarSign className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Affordable Prices
              </h3>
              <p className="text-gray-600">
                We offer the best rates on high-quality vehicles.
              </p>
            </div>

            {/* 24/7 Customer Support */}
            <div className="p-8 bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-6">
                <Headphones className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                24/7 Customer Support
              </h3>
              <p className="text-gray-600">
                Our team is always here to assist with your needs.
              </p>
            </div>
          </div>
        </section>

        {/* Available Vehicles Section */}
        <section className="py-20 container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Available Vehicles
          </h2>
          {/* <div className="flex justify-center mb-10">
            <Input type="text" placeholder="Search by make or model" className="w-full max-w-xl rounded-lg px-4 py-3 text-lg shadow-md" />
            <Button variant="secondary" className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-black text-white rounded-lg shadow-lg hover:shadow-xl">Search</Button>
          </div> */}

          {/* Vehicle Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {vehicles.slice(0, 3).map((vehicle) => (
              <Card
                key={vehicle._id}
                className="overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transition-shadow"
              >
                <CardHeader>
                  <img
                    src={vehicle.imageUrl}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-gray-500 mb-4">{vehicle.year}</p>
                  <Badge
                    variant="outline"
                    className="text-lg font-medium text-blue-600"
                  >
                    ₵{vehicle.pricePerDay} / day
                  </Badge>
                </CardContent>
                <CardFooter className="p-6 flex justify-between items-center">
                  <Button variant="default">Book Now</Button>
                  <p className="text-sm text-gray-500">
                    Available: {vehicle.availability ? "Yes" : "No"}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* View More Link */}
          <div className="text-center mt-12">
            <Link
              href="/vehicles"
              className="text-blue-500 hover:text-blue-700 font-medium text-lg"
            >
              View More Vehicles
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-100 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 container mx-auto">
            <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <p className="text-lg text-gray-700">
                &quot;Amazing service! The car was in great condition and the process
                was seamless.&quot;
              </p>
              <p className="mt-6 font-bold text-blue-600">- John Doe</p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <p className="text-lg text-gray-700">
                &quot;Affordable and easy to book. I had a great experience and will
                definitely rent again.&quot;
              </p>
              <p className="mt-6 font-bold text-blue-600">- Jane Smith</p>
            </div>
            <div className="bg-white p-8 shadow-lg rounded-xl hover:shadow-xl transition-shadow">
              <p className="text-lg text-gray-700">
                &quot;Customer support was super helpful in answering all my
                questions. Highly recommend!&quot;
              </p>
              <p className="mt-6 font-bold text-blue-600">- Michael Brown</p>
            </div>
          </div>
        </section>

        <section className="py-20 container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I rent a car?</AccordionTrigger>
              <AccordionContent>
                Simply search for a vehicle, select your dates, and click 'Book
                Now.' You will be guided through the payment process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What payment methods are accepted?
              </AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards, mobile payments, and bank
                transfers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can I cancel or modify my booking?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel or modify your booking up to 24 hours before
                your rental date without any charges.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="py-20 bg-gradient-to-r from-black to-blue-500 text-white text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Hit the Road?</h2>
          <p className="text-xl mb-8">
            Choose from our wide range of vehicles and enjoy the best rates.
            Book your car today!
          </p>
          <Link
            href="/vehicles"
            className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            Book a Car Now
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}
