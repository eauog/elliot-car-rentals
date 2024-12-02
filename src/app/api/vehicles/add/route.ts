// import { NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/db';
// import Vehicle from '@/models/Vehicle';
// import { authMiddleware } from '@/middlewares/authMiddleware';
// import { roleMiddleware } from '@/middlewares/roleMiddleware';
// import cloudinary from '@/config/cloudinary'; 
// import { Readable } from 'stream';

// export const routeSegmentConfig = {
//   api: {
//     bodyParser: false,
//   },
// };

// async function toNodeReadableStream(request: Request): Promise<Readable> {
//   const reader = request.body?.getReader();
//   const stream = new Readable({
//     async read() {
//       if (reader) {
//         const { done, value } = await reader.read();
//         if (done) {
//           this.push(null); 
//         } else {
//           this.push(value); 
//         }
//       }
//     },
//   });
//   return stream;
// }

// async function uploadToCloudinary(stream: Readable): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder: 'car_rental_vehicles', allowed_formats: ['jpg', 'png'] },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result?.secure_url || '');
//       }
//     );
//     stream.pipe(uploadStream); 
//   });
// }

// async function parseFormData(request: Request): Promise<{ fields: any; fileStream: Readable }> {
//   const formData = await request.formData();
//   const fields = {
//     make: formData.get('make'),
//     model: formData.get('model'),
//     year: formData.get('year'),
//     pricePerDay: formData.get('pricePerDay'),
//   };

//   const file = formData.get('image');
//   const fileStream = file ? Readable.from(file.stream()) : null;

//   return { fields, fileStream };
// }

// export async function POST(request: Request) {
//   const user = await authMiddleware(request);
//   if (user instanceof NextResponse) return user;

//   const roleCheck = roleMiddleware(user, ['admin', 'manager']);
//   if (roleCheck instanceof NextResponse) return roleCheck;

//   try {
//     await connectToDB();

//     const { fields, fileStream } = await parseFormData(request);

//     const { make, model, year, pricePerDay } = fields;
//     if (!make || !model || !year || !pricePerDay) {
//       return NextResponse.json({ message: 'Please provide all required fields' }, { status: 400 });
//     }

//     let imageUrl = '';
//     if (fileStream) {
//       imageUrl = await uploadToCloudinary(fileStream);
//     }

//     const vehicle = new Vehicle({
//       make,
//       model,
//       year: parseInt(year, 10),
//       pricePerDay: parseFloat(pricePerDay),
//       availability: true,
//       imageUrl, 
//     });

//     await vehicle.save();

//     return NextResponse.json({ success: true, vehicle }, { status: 201 });
//   } catch (error) {
//     console.error('Error adding vehicle:', error);
//     return NextResponse.json({ success: false, error: 'Error adding vehicle' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { roleMiddleware } from '@/middlewares/roleMiddleware';
import cloudinary from '@/config/cloudinary';
import formidable from 'formidable';
import fs from 'fs/promises';

// Disable built-in body parser (not needed for modern Next.js)
export const dynamic = 'force-dynamic';

// Helper function to parse `multipart/form-data` using formidable
async function parseFormData(request: Request): Promise<{ fields: Record<string, any>; filePath: string | null }> {
  const form = formidable({ multiples: false, keepExtensions: true, uploadDir: '/tmp' });

  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    request.body?.getReader().read().then(async function process({ done, value }) {
      if (done) {
        const buffer = Buffer.concat(chunks);
        const fields: Record<string, any> = {};
        let filePath = null;

        try {
          form.parse(buffer, (err, fields, files) => {
            if (err) return reject(err);

            const uploadedFile = files?.image;
            if (uploadedFile) {
              filePath = uploadedFile.filepath; // Path of the uploaded file
            }

            resolve({ fields, filePath });
          });
        } catch (error) {
          reject(error);
        }
        return;
      }
      chunks.push(value);
      return process(await request.body?.getReader().read());
    });
  });
}

// POST request handler
export async function POST(request: Request) {
  try {
    // Authenticate and authorize the user
    const user = await authMiddleware(request);
    if (user instanceof NextResponse) return user;

    const roleCheck = roleMiddleware(user, ['admin', 'manager']);
    if (roleCheck instanceof NextResponse) return roleCheck;

    await connectToDB();

    // Parse form data
    const { fields, filePath } = await parseFormData(request);

    const { make, model, year, pricePerDay } = fields;
    if (!make || !model || !year || !pricePerDay) {
      return NextResponse.json({ message: 'Please provide all required fields' }, { status: 400 });
    }

    let imageUrl = '';
    if (filePath) {
      try {
        const fileBuffer = await fs.readFile(filePath);
        imageUrl = await uploadToCloudinary(fileBuffer);
        await fs.unlink(filePath); // Clean up temporary file
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
      }
    }

    // Create and save the new vehicle
    const vehicle = new Vehicle({
      make,
      model,
      year: parseInt(year, 10),
      pricePerDay: parseFloat(pricePerDay),
      availability: true,
      imageUrl,
    });

    await vehicle.save();

    return NextResponse.json({ success: true, vehicle }, { status: 201 });
  } catch (error) {
    console.error('Error adding vehicle:', error);
    return NextResponse.json({ success: false, error: (error as Error).message || 'Internal Server Error' }, { status: 500 });
  }
}

// Function to upload file to Cloudinary
async function uploadToCloudinary(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'car_rental_vehicles', allowed_formats: ['jpg', 'png'] },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || '');
      }
    );
    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
}
