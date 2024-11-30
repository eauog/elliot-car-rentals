"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

export default function ContactUs() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Error",
        description: "Please fill out all fields before submitting",
      });
    } else {
      toast({
        title: "Success",
        description:
          "Thank you for contacting us! We will get back to you shortly.",
      });
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10">
        <section className="container mx-auto text-center py-10">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-600 mb-12">
            Have questions or need help? Fill out the form below, and we will
            get in touch with you as soon as possible.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white p-8 shadow-lg rounded-lg"
          >
            <div className="mb-6">
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full py-3 px-4 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full py-3 px-4 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <Textarea
                name="message"
                value={form.message}
                onChange={handleInputChange}
                placeholder="Your Message"
                className="w-full py-3 px-4 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-teal-400 focus:outline-none"
                rows={6}
              />
            </div>
            <Button type="submit" variant="default">
              Send
            </Button>
          </form>
        </section>

        <section className="container mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-blue-600">
                Our Office
              </h3>
              <p className="text-gray-600">123 Main Street, Accra, Ghana</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-blue-600">Call Us</h3>
              <p className="text-gray-600">+233 123 456 7890</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-2xl font-bold mb-2 text-blue-600">
                Email Us
              </h3>
              <p className="text-gray-600">info@company.com</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
