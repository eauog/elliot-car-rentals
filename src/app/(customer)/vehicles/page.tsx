"use client";

import { useState, useEffect } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectContent } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  availability: boolean;
  imageUrl: string;
}

export default function VehiclesPage() {
  const { vehicles, fetchVehicles } = useVehicleStore();
  const { toast } = useToast();
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [availability, setAvailability] = useState<boolean>(false);

  useEffect(() => {
    fetchVehicles()
      .catch(() =>
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to fetch vehicles",
        })
      );
  }, [fetchVehicles, toast]);

  useEffect(() => {
    const filtered = vehicles
      .filter((vehicle) =>
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (vehicle) =>
          vehicle.pricePerDay <= maxPrice &&
          (!availability || vehicle.availability)
      );

    if (sortOrder === "price-low-high") {
      filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (sortOrder === "price-high-low") {
      filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortOrder === "year-newest") {
      filtered.sort((a, b) => b.year - a.year);
    } else if (sortOrder === "year-oldest") {
      filtered.sort((a, b) => a.year - b.year);
    }

    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm, maxPrice, availability, sortOrder]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Find Your Perfect Vehicle</h2>

          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-1">
              <Input
                type="text"
                placeholder="Search by make or model"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                Max Price (per day)
              </label>
              <Slider
                min={0}
                max={1000}
                value={[maxPrice]} 
                onValueChange={(value) => setMaxPrice(value[0])} 
                step={50}
                className="mt-2"
              />
              <div className="flex justify-between text-xs">
                <span>₵0</span>
                <span>₵{maxPrice}</span>
              </div>
            </div>

            <div className="col-span-1 flex items-center space-x-2">
              <input
                type="checkbox"
                checked={availability}
                onChange={(e) => setAvailability(e.target.checked)}
                id="availability"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="availability" className="text-sm font-medium text-gray-700">
                Available Now
              </label>
            </div>

            <div className="col-span-1">
              <Select
                onValueChange={(value: string) => setSortOrder(value)}
                value={sortOrder}
              >
                <SelectContent>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="year-newest">Year: Newest</SelectItem>
                  <SelectItem value="year-oldest">Year: Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle._id} className="overflow-hidden shadow-lg">
                <CardHeader>
                  <Image
                    src={vehicle.imageUrl}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    width={500}
                    height={600}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent>
                  <h3 className="text-lg font-bold">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <p className="text-sm text-gray-600">{vehicle.year}</p>
                  <Badge variant="outline" className="mt-2">
                    ₵{vehicle.pricePerDay} / day
                  </Badge>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Link href={`/vehicles/${vehicle._id}/book`} className={buttonVariants({ variant: "default" })}>Book Now</Link>
                  <p className="text-xs text-gray-500">
                    Available: {vehicle.availability ? "Yes" : "No"}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

