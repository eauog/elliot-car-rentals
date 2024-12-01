// // import { NextResponse } from 'next/server';
// // import { connectToDB } from '@/utils/db';
// // import Vehicle from '@/models/Vehicle';
// // import { authMiddleware } from '@/middlewares/authMiddleware';
// // import { roleMiddleware } from '@/middlewares/roleMiddleware';
// // import formidable from 'formidable';
// // import cloudinary from '@/config/cloudinary';

// // // Disable automatic body parsing for multipart file upload handling
// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // // Parse the multipart/form-data (file upload)
// // async function parseFormData(request: Request) {
// //   return new Promise<{ fields: any; files: any }>((resolve, reject) => {
// //     const form = formidable({ multiples: false });
// //     form.parse(request as any, (err, fields, files) => {
// //       if (err) reject(err);
// //       resolve({ fields, files });
// //     });
// //   });
// // }

// // // PUT request handler for updating vehicle details
// // export async function PUT(request: Request) {
// //   try {
// //     await connectToDB();

// //     // Authenticate and authorize the user
// //     const user = await authMiddleware(request);
// //     if (user instanceof NextResponse) return user;  // Return error if unauthorized

// //     const roleCheck = roleMiddleware(user, ['admin', 'manager']);
// //     if (roleCheck instanceof NextResponse) return roleCheck;  // Return error if user role is invalid

// //     // Parse the form data (vehicle details and optionally a new image)
// //     const { fields, files } = await parseFormData(request);
// //     const { make, model, year, pricePerDay, availability } = fields;

// //     // Get the vehicle ID from the query string
// //     const { searchParams } = new URL(request.url);
// //     const id = searchParams.get('id');
    
// //     if (!id) {
// //       return NextResponse.json({ message: 'Vehicle ID is required' }, { status: 400 });
// //     }

// //     // Find the vehicle by ID
// //     const vehicle = await Vehicle.findById(id);
// //     if (!vehicle) {
// //       return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
// //     }

// //     // If a new image is provided, upload it to Cloudinary
// //     if (files.image) {
// //       const result = await cloudinary.uploader.upload(files.image.filepath, {
// //         folder: 'car_rental_vehicles',
// //         allowed_formats: ['jpg', 'png'],
// //       });
// //       vehicle.imageUrl = result.secure_url;  // Update the image URL
// //     }

// //     // Update other vehicle details
// //     vehicle.make = make || vehicle.make;
// //     vehicle.model = model || vehicle.model;
// //     vehicle.year = year || vehicle.year;
// //     vehicle.pricePerDay = pricePerDay || vehicle.pricePerDay;
// //     vehicle.availability = availability !== undefined ? availability : vehicle.availability;

// //     // Save the updated vehicle details
// //     await vehicle.save();

// //     return NextResponse.json({ success: true, vehicle }, { status: 200 });
// //   } catch (error) {
// //     console.error('Error updating vehicle:', error);

// //     if (error instanceof Error) {
// //       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
// //     }

// //     return NextResponse.json({ success: false, error: 'An unknown error occurred' }, { status: 500 });
// //   }
// // }


// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/db';
// import Vehicle from '@/models/Vehicle';
// import { authMiddleware } from '@/middlewares/authMiddleware';
// import { roleMiddleware } from '@/middlewares/roleMiddleware';
// import { handleFileUpload } from '@/middlewares/uploadMiddleware';

// // Disable body parsing for file uploads
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // PUT request handler for updating vehicle details
// export async function PUT(request: Request) {
//   try {
//     await connectToDB();

//     // Authenticate and authorize the user
//     const user = await authMiddleware(request);
//     if (user instanceof NextResponse) return user;  // Return error if unauthorized

//     const roleCheck = roleMiddleware(user, ['admin', 'manager']);
//     if (roleCheck instanceof NextResponse) return roleCheck;  // Return error if user role is invalid

//     // Get the vehicle ID from the query string
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json({ message: 'Vehicle ID is required' }, { status: 400 });
//     }

//     // Find the vehicle by ID
//     const vehicle = await Vehicle.findById(id);
//     if (!vehicle) {
//       return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
//     }

//     // Optionally update the image if a new image is uploaded
//     if (request.body) {
//       const imageUrl = await handleFileUpload(request);
//       if (imageUrl) {
//         vehicle.imageUrl = imageUrl; // Update the image URL
//       }
//     }

//     // Update other vehicle details
//     const { make, model, year, pricePerDay, availability } = Object.fromEntries(searchParams);

//     // Update other vehicle details
//     vehicle.make = make || vehicle.make;
//     vehicle.model = model || vehicle.model;
//     vehicle.year = year || vehicle.year;
//     vehicle.pricePerDay = pricePerDay || vehicle.pricePerDay;
//     vehicle.availability = availability !== undefined ? availability : vehicle.availability;

//     // Save the updated vehicle details
//     await vehicle.save();

//     return NextResponse.json({ success: true, vehicle }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating vehicle:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/db';
// import Vehicle from '@/models/Vehicle';
// import { authMiddleware } from '@/middlewares/authMiddleware';
// import { roleMiddleware } from '@/middlewares/roleMiddleware';
// import cloudinary from '@/config/cloudinary'; // Cloudinary SDK
// import { Readable } from 'stream';

// // Disable body parsing for file uploads
// export const routeSegmentConfig = {
//   api: {
//     bodyParser: false,
//   },
// };

// // Convert Web Streams API to Node.js-readable stream
// // async function toNodeReadableStream(request: Request): Promise<Readable> {
// //   const reader = request.body?.getReader();
// //   const stream = new Readable({
// //     async read() {
// //       if (reader) {
// //         const { done, value } = await reader.read();
// //         if (done) {
// //           this.push(null); // End of stream
// //         } else {
// //           this.push(value); // Push chunk
// //         }
// //       }
// //     },
// //   });
// //   return stream;
// // }

// // Function to upload file to Cloudinary
// async function uploadToCloudinary(stream: Readable): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder: 'car_rental_vehicles', allowed_formats: ['jpg', 'png'] },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result?.secure_url || '');
//       }
//     );
//     stream.pipe(uploadStream); // Pipe the readable stream to Cloudinary
//   });
// }

// // Function to parse the form data
// async function parseFormData(request: Request): Promise<{ fields: any; fileStream: Readable }> {
//   const formData = await request.formData();
  
//   // Extract the fields from the form-data
//   const fields = {
//     make: formData.get('make'),
//     model: formData.get('model'),
//     year: formData.get('year'),
//     pricePerDay: formData.get('pricePerDay'),
//     availability: formData.get('availability') === 'true',
//   };

//   // Extract the file (image) from the form-data
//   const file = formData.get('image');
//   const fileStream = file ? Readable.from(file.stream()) : null;

//   return { fields, fileStream };
// }

// // PUT request handler for updating vehicle details
// export async function PUT(request: Request) {
//   try {
//     await connectToDB();

//     // Authenticate and authorize the user
//     const user = await authMiddleware(request);
//     if (user instanceof NextResponse) return user;  // Return error if unauthorized

//     const roleCheck = roleMiddleware(user, ['admin', 'manager']);
//     if (roleCheck instanceof NextResponse) return roleCheck;  // Return error if user role is invalid

//     // Get the vehicle ID from the query string
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json({ message: 'Vehicle ID is required' }, { status: 400 });
//     }

//     // Find the vehicle by ID
//     const vehicle = await Vehicle.findById(id);
//     if (!vehicle) {
//       return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
//     }

//     // Parse form data (fields + file)
//     const { fields, fileStream } = await parseFormData(request);

//     const { make, model, year, pricePerDay, availability } = fields;

//     // Optionally upload a new image if one is provided
//     if (fileStream) {
//       const imageUrl = await uploadToCloudinary(fileStream);
//       if (imageUrl) {
//         vehicle.imageUrl = imageUrl; // Update the image URL
//       }
//     }

//     // Update other vehicle details
//     vehicle.make = make || vehicle.make;
//     vehicle.model = model || vehicle.model;
//     vehicle.year = year || vehicle.year;
//     vehicle.pricePerDay = pricePerDay || vehicle.pricePerDay;
//     vehicle.availability = availability !== undefined ? availability : vehicle.availability;

//     await vehicle.save();

//     return NextResponse.json({ success: true, vehicle }, { status: 200 });
//   } catch (error) {
//     console.error('Error updating vehicle:', error);
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { roleMiddleware } from '@/middlewares/roleMiddleware';
import cloudinary from '@/config/cloudinary';
import { Readable } from 'stream';

// Disable body parsing for file uploads
export const routeSegmentConfig = {
  api: {
    bodyParser: false,
  },
};

// Function to upload file to Cloudinary
async function uploadToCloudinary(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'car_rental_vehicles', allowed_formats: ['jpg', 'png'] },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || '');
      }
    );
    stream.pipe(uploadStream);
  });
}

// Function to parse the form data
async function parseFormData(request: Request): Promise<{ fields: Record<string, any>; fileStream: Readable | null }> {
  const formData = await request.formData();

  // Extract fields from the form-data
  const fields: Record<string, any> = {
    make: formData.get('make') as string | null,
    model: formData.get('model') as string | null,
    year: formData.get('year') as string | null,
    pricePerDay: formData.get('pricePerDay') as string | null,
    availability: formData.get('availability') === 'true',
  };

  // Extract the file (image) from the form-data
  const file = formData.get('image') as File | null;
  const fileStream = file ? Readable.from(file.stream() as unknown as NodeJS.ReadableStream) : null;

  return { fields, fileStream };
}

// PUT request handler for updating vehicle details
export async function PUT(request: Request) {
  try {
    await connectToDB();

    // Authenticate and authorize the user
    const user = await authMiddleware(request);
    if (user instanceof NextResponse) return user;

    const roleCheck = roleMiddleware(user, ['admin', 'manager']);
    if (roleCheck instanceof NextResponse) return roleCheck;

    // Get the vehicle ID from the query string
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Vehicle ID is required' }, { status: 400 });
    }

    // Find the vehicle by ID
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return NextResponse.json({ message: 'Vehicle not found' }, { status: 404 });
    }

    // Parse form data (fields + file)
    const { fields, fileStream } = await parseFormData(request);

    const { make, model, year, pricePerDay, availability } = fields;

    // Optionally upload a new image if one is provided
    if (fileStream) {
      try {
        const imageUrl = await uploadToCloudinary(fileStream);
        if (imageUrl) {
          vehicle.imageUrl = imageUrl;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
      }
    }

    // Update other vehicle details
    vehicle.make = make || vehicle.make;
    vehicle.model = model || vehicle.model;
    vehicle.year = year || vehicle.year;
    vehicle.pricePerDay = parseFloat(pricePerDay) || vehicle.pricePerDay;
    vehicle.availability = availability !== undefined ? availability : vehicle.availability;

    await vehicle.save();

    return NextResponse.json({ success: true, vehicle }, { status: 200 });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
