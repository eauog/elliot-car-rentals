'use client';

import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { useVehicleStore } from '@/store/vehicleStore';
import { useBookingStore } from '@/store/bookingStore';
import { usePaymentStore } from '@/store/paymentStore';
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { users, fetchUsers } = useUserStore();
  const { vehicles, fetchVehicles } = useVehicleStore();
  const { bookings, fetchBookings } = useBookingStore();
  const { payments, fetchPayments } = usePaymentStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchUsers(), fetchVehicles(), fetchBookings(), fetchPayments()]).finally(() =>
      setLoading(false)
    );
  }, [fetchUsers, fetchVehicles, fetchBookings, fetchPayments]);

  const chartData = bookings.map((booking, index) => ({
    month: new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short' }),
    bookings: bookings.length,
    payments: payments.reduce((sum, payment) => sum + payment.amount, 0),
  }));

  const chartConfig = {
    bookings: {
      label: "Bookings",
      color: "hsl(var(--chart-1))",
    },
    payments: {
      label: "Payments",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Metrics Cards */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl">{loading ? '...' : users.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Total Vehicles</h3>
          <p className="text-2xl">{loading ? '...' : vehicles.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-2xl">{loading ? '...' : bookings.length}</p>
        </Card>
        <Card className="p-4">
          <h3 className="text-lg font-semibold">Total Payments</h3>
          <p className="text-2xl">${loading ? '...' : payments.reduce((sum, payment) => sum + payment.amount, 0)}</p>
        </Card>
      </div>

      {/* Bookings and Payments Overview */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Bookings and Payments Overview</h3>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="bookings" fill="var(--chart-1)" radius={4} />
            <Bar dataKey="payments" fill="var(--chart-2)" radius={4} />
          </BarChart>
        </ChartContainer>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Latest Bookings</h4>
            <ul className="space-y-2">
              {bookings.slice(0, 5).map((booking) => (
                <li key={booking._id}>
                  {booking.customer.name} booked {booking.vehicle.make} {booking.vehicle.model}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">Latest Payments</h4>
            <ul className="space-y-2">
              {payments.slice(0, 5).map((payment) => (
                <li key={payment._id}>
                  {payment.customer.name} paid ${payment.amount} for {payment.booking}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="space-x-4">
          <Link href='/dashboard/vehicles/add' className={buttonVariants({ variant: "default"})}>Add New Vehicle</Link>
          <Link href='/dashboard/users' className={buttonVariants({ variant: "default"})}>Manage Users</Link>
        </div>
      </Card>
    </>
  );
}
