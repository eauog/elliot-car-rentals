// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter, useSearchParams } from 'next/navigation';
// // import { useVehicleStore } from '@/store/vehicleStore';
// // import { Input } from '@/components/ui/input';
// // import { Button } from '@/components/ui/button';
// // import { useToast } from '@/hooks/use-toast';

// // export default function EditVehicle() {
// //   const router = useRouter();
// //   const { getVehicleById, updateVehicle } = useVehicleStore();
// //   const { toast } = useToast();
// //   const searchParams = useSearchParams();
// //   const vehicleId = searchParams.get('id'); // Get vehicle ID from URL
// //   console.log("vehicleid", vehicleId)
// //   const [formData, setFormData] = useState({
// //     make: '',
// //     model: '',
// //     year: '',
// //     pricePerDay: '',
// //     availability: true,
// //     imageUrl: '',
// //   });

// //   useEffect(() => {
// //     // Fetch the vehicle's details to populate the form
// //     const vehicle = getVehicleById(vehicleId);
// //     if (vehicle) {
// //       setFormData({
// //         make: vehicle.make,
// //         model: vehicle.model,
// //         year: vehicle.year.toString(),
// //         pricePerDay: vehicle.pricePerDay.toString(),
// //         availability: vehicle.availability,
// //         imageUrl: vehicle.imageUrl,
// //       });
// //     }
// //   }, [vehicleId, getVehicleById]);

// //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const { name, value } = e.target;
// //     setFormData({ ...formData, [name]: value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     try {
// //       await updateVehicle(vehicleId, {
// //         make: formData.make,
// //         model: formData.model,
// //         year: parseInt(formData.year),
// //         pricePerDay: parseFloat(formData.pricePerDay),
// //         availability: formData.availability,
// //         imageUrl: formData.imageUrl,
// //       });

// //       toast({ title: 'Success', description: 'Vehicle updated successfully!' });
// //       router.push('/dashboard/vehicles');
// //     } catch (error) {
// //       toast({ title: 'Error', description: 'Failed to update vehicle' });
// //     }
// //   };

// //   return (
// //     <div className="container mx-auto py-8">
// //       <h2 className="text-2xl font-semibold mb-6">Edit Vehicle</h2>

// //       <form onSubmit={handleSubmit} className="space-y-6">
// //         <div>
// //           <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
// //           <Input
// //             id="make"
// //             name="make"
// //             type="text"
// //             value={formData.make}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
// //           <Input
// //             id="model"
// //             name="model"
// //             type="text"
// //             value={formData.model}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
// //           <Input
// //             id="year"
// //             name="year"
// //             type="number"
// //             value={formData.year}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">Price/Day</label>
// //           <Input
// //             id="pricePerDay"
// //             name="pricePerDay"
// //             type="number"
// //             value={formData.pricePerDay}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </div>

// //         <div>
// //           <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
// //           <Input
// //             id="imageUrl"
// //             name="imageUrl"
// //             type="url"
// //             value={formData.imageUrl}
// //             onChange={handleInputChange}
// //             required
// //           />
// //         </div>

// //         <div className="flex items-center space-x-2">
// //           <input
// //             type="checkbox"
// //             id="availability"
// //             name="availability"
// //             checked={formData.availability}
// //             onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
// //             className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
// //           />
// //           <label htmlFor="availability" className="text-sm font-medium text-gray-700">Available</label>
// //         </div>

// //         <Button type="submit" variant="default">
// //           Update Vehicle
// //         </Button>
// //       </form>
// //     </div>
// //   );
// // }

// // // import { NextResponse } from 'next/server';
// // // import { connectToDB } from '@/utils/db';
// // // import Vehicle from '@/models/Vehicle';
// // // import { authMiddleware } from '@/middlewares/authMiddleware';
// // // import { roleMiddleware } from '@/middlewares/roleMiddleware';
// // // import formidable from 'formidable';
// // // import cloudinary from '@/config/cloudinary';

// // // // Disable automatic body parsing for multipart file upload handling
// // // export const config = {
// // //   api: {
// // //     bodyParser: false,
// // //   },
// // // };

// // // // Parse the multipart/form-data (file upload)
// // // async function parseFormData(request: Request) {
// // //   return new Promise<{ fields: any; files: any }>((resolve, reject) => {
// // //     const form = formidable({ multiples: false });
// // //     form.parse(request as any, (err, fields, files) => {
// // //       if (err) reject(err);
// // //       resolve({ fields, files });
// // //     });
// // //   });
// // // }

// // // // PUT request handler for updating vehicle details
// // // export async function PUT(request: Request) {
// // //   try {
// // //     await connectToDB();

// // //     // Authenticate and authorize the user
// // //     const user = await authMiddleware(request);
// // //     if (user instanceof NextResponse) return user;  // Return error if unauthorized

// // //     const roleCheck = roleMiddleware(user, ['admin', 'manager']);
// // //     if (roleCheck instanceof NextResponse) return roleCheck;  // Return error if user role is invalid

// // //     // Parse the form data (vehicle details and optionally a new image)
// // //     const { fields, files } = await parseFormData(request);
// // //     const { make, model, year, pricePerDay, availability } = fields;

// // //     // Get the vehicle ID from the query string
// // //     const { searchParams } = new URL(request.url);
// // //     const id = searchParams.get('id');
    
// // //     if (!id) {
// // //       return NextResponse.json({ message: 'Vehicle ID is required' }, { status: 400 });
// // //     }

// // //     // Find the vehicle by ID
// // //     const vehicle = await Vehicle.findById(id);
// // //     if (!vehicle) {
// // //       return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
// // //     }

// // //     // If a new image is provided, upload it to Cloudinary
// // //     if (files.image) {
// // //       const result = await cloudinary.uploader.upload(files.image.filepath, {
// // //         folder: 'car_rental_vehicles',
// // //         allowed_formats: ['jpg', 'png'],
// // //       });
// // //       vehicle.imageUrl = result.secure_url;  // Update the image URL
// // //     }

// // //     // Update other vehicle details
// // //     vehicle.make = make || vehicle.make;
// // //     vehicle.model = model || vehicle.model;
// // //     vehicle.year = year || vehicle.year;
// // //     vehicle.pricePerDay = pricePerDay || vehicle.pricePerDay;
// // //     vehicle.availability = availability !== undefined ? availability : vehicle.availability;

// // //     // Save the updated vehicle details
// // //     await vehicle.save();

// // //     return NextResponse.json({ success: true, vehicle }, { status: 200 });
// // //   } catch (error) {
// // //     console.error('Error updating vehicle:', error);

// // //     if (error instanceof Error) {
// // //       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// // //     }

// // //     return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
// // //   }
// // // }


// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useParams } from 'next/navigation'; // useParams for dynamic segments
// import { useVehicleStore } from '@/store/vehicleStore';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { useToast } from '@/hooks/use-toast';

// export default function EditVehicle() {
//   const router = useRouter();
//   const { getVehicleById, updateVehicle } = useVehicleStore();
//   const { toast } = useToast();
//   const { id: vehicleId } = useParams(); // Get vehicle ID from dynamic route
//   const [formData, setFormData] = useState({
//     make: '',
//     model: '',
//     year: '',
//     pricePerDay: '',
//     availability: true,
//     imageUrl: '',
//   });

//   useEffect(() => {
//     // Fetch the vehicle's details to populate the form
//     const vehicle = getVehicleById(vehicleId);
//     if (vehicle) {
//       setFormData({
//         make: vehicle.make,
//         model: vehicle.model,
//         year: vehicle.year.toString(),
//         pricePerDay: vehicle.pricePerDay.toString(),
//         availability: vehicle.availability,
//         imageUrl: vehicle.imageUrl,
//       });
//     }
//   }, [vehicleId, getVehicleById]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       await updateVehicle(vehicleId, {
//         make: formData.make,
//         model: formData.model,
//         year: parseInt(formData.year),
//         pricePerDay: parseFloat(formData.pricePerDay),
//         availability: formData.availability,
//         imageUrl: formData.imageUrl,
//       });

//       toast({ title: 'Success', description: 'Vehicle updated successfully!' });
//       router.push('/dashboard/vehicles');
//     } catch (error) {
//       toast({ title: 'Error', description: 'Failed to update vehicle' });
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-semibold mb-6">Edit Vehicle</h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
//           <Input
//             id="make"
//             name="make"
//             type="text"
//             value={formData.make}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
//           <Input
//             id="model"
//             name="model"
//             type="text"
//             value={formData.model}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
//           <Input
//             id="year"
//             name="year"
//             type="number"
//             value={formData.year}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">Price/Day</label>
//           <Input
//             id="pricePerDay"
//             name="pricePerDay"
//             type="number"
//             value={formData.pricePerDay}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
//           <Input
//             id="imageUrl"
//             name="imageUrl"
//             type="url"
//             value={formData.imageUrl}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             id="availability"
//             name="availability"
//             checked={formData.availability}
//             onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
//             className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label htmlFor="availability" className="text-sm font-medium text-gray-700">Available</label>
//         </div>

//         <Button type="submit" variant="default">
//           Update Vehicle
//         </Button>
//       </form>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; // useParams for dynamic segments
import { useVehicleStore } from '@/store/vehicleStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function EditVehicle() { // Ensure the default export is a React component
  const router = useRouter();
  const { getVehicleById, updateVehicle } = useVehicleStore();
  const { toast } = useToast();
  const { id: vehicleId } = useParams(); // Get vehicle ID from dynamic route
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    pricePerDay: '',
    availability: true,
    imageUrl: '',
  });

  useEffect(() => {
    // Fetch the vehicle's details to populate the form
    const vehicle = getVehicleById(vehicleId as string);
    if (vehicle) {
      setFormData({
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year.toString(),
        pricePerDay: vehicle.pricePerDay.toString(),
        availability: vehicle.availability,
        imageUrl: vehicle.imageUrl,
      });
    }
  }, [vehicleId, getVehicleById]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateVehicle(vehicleId as string, {
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        pricePerDay: parseFloat(formData.pricePerDay),
        availability: formData.availability,
        imageUrl: formData.imageUrl,
      });

      toast({ title: 'Success', description: 'Vehicle updated successfully!' });
      router.push('/dashboard/vehicles');
    } catch (error: any) {
      console.error(error)
      toast({ title: 'Error', variant: "destructive", description: 'Failed to update vehicle' });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Edit Vehicle</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
          <Input
            id="make"
            name="make"
            type="text"
            value={formData.make}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
          <Input
            id="model"
            name="model"
            type="text"
            value={formData.model}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <Input
            id="year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="pricePerDay" className="block text-sm font-medium text-gray-700">Price/Day</label>
          <Input
            id="pricePerDay"
            name="pricePerDay"
            type="number"
            value={formData.pricePerDay}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="availability"
            name="availability"
            checked={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="availability" className="text-sm font-medium text-gray-700">Available</label>
        </div>

        <Button type="submit" variant="default">
          Update Vehicle
        </Button>
      </form>
    </div>
  );
}
