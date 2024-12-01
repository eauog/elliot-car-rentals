"use client";

import { Users, Globe, Award } from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10">
        <section className="py-20 bg-white text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">
            About Our Company
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are dedicated to providing top-notch car rental services,
            ensuring that every customer experiences luxury, comfort, and
            convenience. Our passion for customer satisfaction drives everything
            we do, from offering affordable pricing to providing 24/7 support.
          </p>
        </section>
        <section className="py-20 bg-gray-100 text-center">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 bg-white shadow-lg rounded-xl">
              <div className="flex justify-center mb-6">
                <Globe className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To revolutionize the car rental industry by providing an
                unparalleled experience, offering high-quality vehicles at
                affordable prices, and ensuring customer satisfaction at every
                step.
              </p>
            </div>

            <div className="p-8 bg-white shadow-lg rounded-xl">
              <div className="flex justify-center mb-6">
                <Award className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be the leading car rental service globally, known for
                reliability, quality, and innovation, while fostering a culture
                of customer-centric values and continuous improvement.
              </p>
            </div>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-12 text-gray-800">
              Meet The Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              <div className="p-8 bg-gray-100 shadow-lg rounded-xl">
                <Image
                  src="/me.jpeg"
                  alt="Team Member 1"
                  width={100}
                  height={100}
                  className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
                />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  Elliot Awe
                </h3>
                <p className="text-gray-600 mb-4">CEO & Founder</p>
                <p className="text-gray-500">
                  Elliot leads the company with a passion for innovation and
                  customer service, ensuring the highest standards in the car
                  rental industry.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-gray-100 text-center">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-white shadow-lg rounded-xl">
              <div className="flex justify-center mb-6">
                <Users className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Customer Focused
              </h3>
              <p className="text-gray-600">
                We place our customers at the heart of everything we do,
                ensuring a seamless experience from start to finish.
              </p>
            </div>

            <div className="p-8 bg-white shadow-lg rounded-xl">
              <div className="flex justify-center mb-6">
                <Award className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Award-Winning Service
              </h3>
              <p className="text-gray-600">
                Our commitment to excellence has earned us several industry
                awards for customer service and innovation.
              </p>
            </div>

            <div className="p-8 bg-white shadow-lg rounded-xl">
              <div className="flex justify-center mb-6">
                <Globe className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Global Reach
              </h3>
              <p className="text-gray-600">
                With services available across multiple countries, we are a
                trusted name in car rentals worldwide.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
