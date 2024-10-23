"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // For dialogs
import { useBookingStore } from "@/store/bookingStore";
import { usePaymentStore } from "@/store/paymentStore";
import { useProfileStore } from "@/store/profileStore";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Types for user, booking, and payment
interface User {
  name: string;
  email: string;
}

interface Vehicle {
  make: string;
  model: string;
}

interface Booking {
  _id: string;
  vehicle: Vehicle;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

interface Payment {
  _id: string;
  reference: string;
  date: string;
  amount: number;
  status: string;
}

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { fetchProfile, deleteAccount } = useProfileStore();
  const { bookings, fetchBookings } = useBookingStore();
  const { payments, fetchPayments } = usePaymentStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState({ profile: true, bookings: true, payments: true });

  useEffect(() => {
    fetchProfile().finally(() => setLoading((prev) => ({ ...prev, profile: false })));
    fetchBookings().finally(() => setLoading((prev) => ({ ...prev, bookings: false })));
    fetchPayments().finally(() => setLoading((prev) => ({ ...prev, payments: false })));
  }, [fetchProfile, fetchBookings, fetchPayments]);

  const handleDeleteAccount = async () => {
    await deleteAccount();
    toast({
      title: "Account deleted",
      description: "Your account has been successfully deleted.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
    <Header/>
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-3xl font-bold mb-6">Profile Page</h2>

      <Tabs defaultValue="profile">
        <TabsList className="w-full mb-6 flex justify-around bg-gray-100 rounded-lg p-8 shadow-sm">
          <TabsTrigger value="profile" className="text-lg ">Profile</TabsTrigger>
          <TabsTrigger value="bookings" className="text-lg ">Bookings</TabsTrigger>
          <TabsTrigger value="payments" className="text-lg ">Payments</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="shadow-lg rounded-lg p-4">
            {loading.profile ? (
              <div>Loading profile...</div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-700">Personal Information</h3>
                <div className="my-4">
                  <p><strong>Name:</strong> {user?.name}</p>
                  <p><strong>Email:</strong> {user?.email}</p>
                </div>
                <div className="flex justify-between mt-6">
                  {/* Edit Profile Dialog */}
                  <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={user?.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Email" className="text-right">
              Email
            </Label>
            <Input id="username" value={user?.email} className="col-span-3" type="email"/>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

                  {/* Delete Account Confirmation Dialog */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="px-4 py-2">Delete Account</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <h2>Confirm Account Deletion</h2>
                      </DialogHeader>
                      <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                      <DialogFooter>
                        <Button variant="destructive" onClick={handleDeleteAccount}>Yes, Delete</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            )}
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings">
          {loading.bookings ? <div>Loading bookings...</div> : <BookingTable bookings={bookings} />}
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          {loading.payments ? <div>Loading payments...</div> : <PaymentTable payments={payments} />}
        </TabsContent>
      </Tabs>
    </div>
    <Footer/>
    </div>
  );
}

// Booking Table Component
interface BookingTableProps {
  bookings: Booking[];
}

function BookingTable({ bookings }: BookingTableProps) {
  if (!bookings.length) return <p className="text-center text-gray-500">No bookings found.</p>;

  return (
    <Card className="p-4">
      <h2 className="text-2xl font-semibold mb-6">Your Bookings</h2>
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="border-b">
            <th className="p-4 py-2">Vehicle</th>
            <th className="p-4 py-2">Start Date</th>
            <th className="p-4 py-2">End Date</th>
            <th className="p-4 py-2">Price</th>
            <th className="p-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id} className="border-t">
              <td className="p-4 py-2">{booking.vehicle.make} {booking.vehicle.model}</td>
              <td className="p-4 py-2">{new Date(booking.startDate).toLocaleDateString()}</td>
              <td className="p-4 py-2">{new Date(booking.endDate).toLocaleDateString()}</td>
              <td className="p-4 py-2">₵{booking.totalPrice}</td>
              <td className="p-4 py-2">
                {/* View Booking Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="mr-2">View</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <h2>Booking Details</h2>
                    </DialogHeader>
                    <p><strong>Vehicle:</strong> {booking.vehicle.make} {booking.vehicle.model}</p>
                    <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                    <p><strong>Total Price:</strong> ₵{booking.totalPrice}</p>
                    <DialogFooter>
                      <Button variant="outline">Close</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Cancel Booking Confirmation Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Cancel</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <h2>Confirm Cancellation</h2>
                    </DialogHeader>
                    <p>Are you sure you want to cancel this booking?</p>
                    <DialogFooter>
                      <Button variant="destructive">Yes, Cancel</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

// Payment Table Component
interface PaymentTableProps {
    payments: Payment[];
  }
  
  function PaymentTable({ payments }: PaymentTableProps) {
    if (!payments.length) return <p className="text-center text-gray-500">No payments found.</p>;
  
    return (
      <Card className="p-4">
        <h2 className="text-2xl font-semibold mb-6">Your Payments</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-4 py-2">Reference</th>
              <th className="p-4 py-2">Date</th>
              <th className="p-4 py-2">Amount</th>
              <th className="p-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t">
                <td className="p-4 py-2">{payment.reference}</td>
                <td className="p-4 py-2">{new Date(payment.date).toLocaleDateString()}</td>
                <td className="p-4 py-2">₵{payment.amount}</td>
                <td className="p-4 py-2">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    );
  }
  