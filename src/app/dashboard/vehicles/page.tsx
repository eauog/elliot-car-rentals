"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useVehicleStore } from "@/store/vehicleStore";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import ImageModal from "@/components/ImageModal";

export default function AdminVehicleList() {
  const router = useRouter();
  const { vehicles, fetchVehicles, deleteVehicle } = useVehicleStore();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    fetchVehicles().finally(() => setLoading(false));
  }, [fetchVehicles]);

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (vehicleId: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await deleteVehicle(vehicleId);
        toast({
          title: "Success",
          description: "Vehicles deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to delete vehicle",
        });
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold mb-6">Manage Vehicles</h1>
        <Link
          href="/dashboard/vehicles/add"
          className={buttonVariants({ variant: "default" })}
        >
          Add Vehicle
        </Link>
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search by make or model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      <Card>
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : vehicles.length === 0 ? (
          <div className="p-4">No users found</div>
        ) : (
          <table className="w-full text-left">
            <thead className="w-full text-left">
              <tr>
                <th className="p-4 py-2"></th>
                <th className="p-4 py-2">Make</th>
                <th className="p-4 py-2">Model</th>
                <th className="p-4 py-2">Year</th>
                <th className="p-4 py-2">Price/Day</th>
                <th className="p-4 py-2">Availability</th>
                <th className="p-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle._id} className="border-t">
                  <td className="p-4 py-2">
                    <ImageModal imageUrl={vehicle.imageUrl} />
                  </td>
                  <td className="p-4 py-2">{vehicle.make}</td>
                  <td className="p-4 py-2">{vehicle.model}</td>
                  <td className="p-4 py-2">{vehicle.year}</td>
                  <td className="p-4 py-2">${vehicle.pricePerDay}</td>
                  <td className="p-4 py-2">
                    {vehicle.availability ? "Available" : "Unavailable"}
                  </td>
                  <td className="p-4 py-2 space-x-2">
                    <Link
                      href={`/dashboard/vehicles/${vehicle._id}/edit`}
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      Edit
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(vehicle._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </>
  );
}
