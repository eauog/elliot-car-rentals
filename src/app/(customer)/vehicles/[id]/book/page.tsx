"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useVehicleStore } from "@/store/vehicleStore";
// import { useBookingStore } from "@/store/bookingStore";
import { useToast } from "@/hooks/use-toast";
import { PaystackButton } from "react-paystack";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import { BookingStepper } from "@/components/Stepper";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axiosInstance from "@/utils/axiosInstance";

export default function BookingFlow() {
  const { user } = useAuthStore();
  const router = useRouter();
  const { id: vehicleId } = useParams();
  const { getVehicleById } = useVehicleStore();
  // const { addBooking } = useBookingStore();
  const { toast } = useToast();
  // const userid = user?.id;

  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const vehicle = getVehicleById(vehicleId as string);

  // Calculate total price based on number of days
  useEffect(() => {
    if (startDate && endDate && vehicle) {
      const days = Math.floor(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
      setTotalPrice(vehicle.pricePerDay * days);
    }
  }, [startDate, endDate, vehicle]);

  const handleNext = () => {
    if (step === 1 && (!startDate || !endDate)) {
      toast({
        title: "Error",
        description: "Please select booking dates.",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const handlePrevious = () => setStep(step - 1);

  const onPaymentSuccess = async (reference: string) => {
    try {
      const bookingResponse = await axiosInstance.post("/bookings/add", {
        vehicleId,
        startDate,
        endDate,
        totalPrice,
      });

      const bookingId = bookingResponse.data.booking._id;

      await axiosInstance.post("/payments/create", {
        bookingId,
        amount: totalPrice,
        reference
      });

      toast({ title: "Success", description: "Payment successful!" });
      router.push("/bookings/confirmation");
    } catch (error) {
      console.error("Error during booking/payment:", error);
      toast({
        title: "Error",
        description: "There was an issue with creating the booking or payment.",
        variant: "destructive",
      });
    }
  };

  const paystackConfig = {
    email: user?.email || "test@example.com",
    amount: totalPrice * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    reference: `PAY_${Date.now()}`,
    currency: "GHS",
    onSuccess: (reference: string) => {
      onPaymentSuccess(reference);
    },
    onClose: () => {
      toast({
        title: "Payment Cancelled",
        description: "You cancelled the payment.",
      });
    },
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen bg-gray-100 py-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-car.jpg"
            alt="Booking Background"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <BookingStepper currentStep={step} />

          {step === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-10">
              <h2 className="text-2xl font-bold mb-4">Select Booking Dates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Date
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date as Date)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholderText="Select start date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    End Date
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date as Date)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholderText="Select end date"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" onClick={() => router.push(`/vehicles`)}>
                  Cancel
                </Button>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {step === 2 && vehicle && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-10">
              <h2 className="text-2xl font-bold mb-4">Review Your Booking</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Image
                    src={vehicle.imageUrl}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    width={500}
                    height={300}
                    className="rounded-lg shadow"
                  />
                </div>
                <div>
                  <p className="text-lg">
                    <strong>Vehicle: </strong> {vehicle.make} {vehicle.model}
                  </p>
                  <p className="text-lg">
                    <strong>Start Date: </strong> {startDate?.toDateString()}
                  </p>
                  <p className="text-lg">
                    <strong>End Date: </strong> {endDate?.toDateString()}
                  </p>
                  <p className="text-lg">
                    <strong>Total Days: </strong>
                    {(new Date(endDate || 0).getTime() -
                      new Date(startDate || 0).getTime()) /
                      (1000 * 60 * 60 * 24) +
                      1}
                  </p>
                  <p className="text-lg">
                    <strong>Total Price: </strong>₵{totalPrice}
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Price Per Day: ₵{vehicle.pricePerDay}
                  </Badge>
                  <div className="flex justify-between items-center mt-6">
                    <Button variant="outline" onClick={handlePrevious}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)}>
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-lg shadow-lg p-6 mt-10">
              <h2 className="text-2xl font-bold mb-4">Payment Confirmation</h2>
              <p className="text-lg">
                <strong>Total Price: </strong>₵{totalPrice}
              </p>
              <div className="flex justify-between items-center mt-6">
                <Button variant="outline" onClick={handlePrevious}>
                  Back
                </Button>
                <PaystackButton
                  {...paystackConfig}
                  className={buttonVariants({ variant: "default" })}
                >
                  Pay Now
                </PaystackButton>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
