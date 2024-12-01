// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useVehicleStore } from "@/store/vehicleStore";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/hooks/use-toast";
// import axiosInstance from "@/utils/axiosInstance";

// export default function AddVehicle() {
//   const router = useRouter();
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     make: "",
//     model: "",
//     year: "",
//     pricePerDay: "",
//     availability: true,
//   });
//   const [imageFile, setImageFile] = useState<File | null>(null); 

//   // Handle form field changes
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle image file selection
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     setImageFile(file || null);
//   };

//   // Form submission handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Create a FormData object to hold the form data and the image file
//     const form = new FormData();
//     form.append("make", formData.make);
//     form.append("model", formData.model);
//     form.append("year", formData.year);
//     form.append("pricePerDay", formData.pricePerDay);
//     form.append("availability", formData.availability ? "true" : "false");

//     // Append the image file to the form data if an image has been selected
//     if (imageFile) {
//       form.append("image", imageFile);
//     }

//     try {
//       const response = await axiosInstance.post("/vehicles/add", form);
//       toast({ title: "Success", description: "Vehicle added successfully!" });
//       router.push("/admin/vehicles");
//     } catch (error) {
//       toast({ title: "Error", description: (error as Error).message });
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-semibold mb-6">Add New Vehicle</h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Make Input */}
//         <div>
//           <label
//             htmlFor="make"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Make
//           </label>
//           <Input
//             id="make"
//             name="make"
//             type="text"
//             value={formData.make}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         {/* Model Input */}
//         <div>
//           <label
//             htmlFor="model"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Model
//           </label>
//           <Input
//             id="model"
//             name="model"
//             type="text"
//             value={formData.model}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         {/* Year Input */}
//         <div>
//           <label
//             htmlFor="year"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Year
//           </label>
//           <Input
//             id="year"
//             name="year"
//             type="number"
//             value={formData.year}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         {/* Price per Day Input */}
//         <div>
//           <label
//             htmlFor="pricePerDay"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Price/Day
//           </label>
//           <Input
//             id="pricePerDay"
//             name="pricePerDay"
//             type="number"
//             value={formData.pricePerDay}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         {/* Image File Upload */}
//         <div>
//           <label
//             htmlFor="image"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Upload Vehicle Image
//           </label>
//           <Input
//             id="image"
//             name="image"
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             required
//           />
//         </div>

//         {/* Availability Checkbox */}
//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             id="availability"
//             name="availability"
//             checked={formData.availability}
//             onChange={(e) =>
//               setFormData({ ...formData, availability: e.target.checked })
//             }
//             className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label
//             htmlFor="availability"
//             className="text-sm font-medium text-gray-700"
//           >
//             Available
//           </label>
//         </div>

//         {/* Submit Button */}
//         <Button type="submit" variant="default">
//           Add Vehicle
//         </Button>
//       </form>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddVehicle() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    pricePerDay: "",
    availability: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // Handle file selection

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Create a FormData object to hold the form data and the image file
    const form = new FormData();
    form.append("make", formData.make);
    form.append("model", formData.model);
    form.append("year", formData.year);
    form.append("pricePerDay", formData.pricePerDay);
    form.append("availability", formData.availability ? "true" : "false");

    // Append the image file to the form data if an image has been selected
    if (imageFile) {
      form.append("image", imageFile);
    }

    try {
      await axiosInstance.post("/vehicles/add", form, {
        headers: {
          // Let Axios automatically handle Content-Type
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false)
      toast({ title: "Success", description: "Vehicle added successfully!" });
      router.push("/dashboard/vehicles");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || (error as Error).message || "An error occurred";
      toast({ title: "Error", variant: "destructive", description: errorMessage });
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Vehicle</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Make Input */}
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700">
            Make
          </label>
          <Input
            id="make"
            name="make"
            type="text"
            value={formData.make}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Model Input */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Model
          </label>
          <Input
            id="model"
            name="model"
            type="text"
            value={formData.model}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Year Input */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <Input
            id="year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Price per Day Input */}
        <div>
          <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">
            Price/Day
          </label>
          <Input
            id="pricePerDay"
            name="pricePerDay"
            type="number"
            value={formData.pricePerDay}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Image File Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Vehicle Image
          </label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Availability Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="availability"
            name="availability"
            checked={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="availability" className="text-sm font-medium text-gray-700">
            Available
          </label>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          variant="default"
          disabled={loading}
        >
        {loading ? "Adding Vehicle..." : "Add Vehicle"}
        </Button>
      </form>
    </div>
  );
}
