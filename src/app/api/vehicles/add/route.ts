import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/db';
import Vehicle from '@/models/Vehicle';
import { authMiddleware } from '@/middlewares/authMiddleware';
import { roleMiddleware } from '@/middlewares/roleMiddleware';
import cloudinary from '@/config/cloudinary'; 
import { Readable } from 'stream';

export const routeSegmentConfig = {
  api: {
    bodyParser: false,
  },
};

async function toNodeReadableStream(request: Request): Promise<Readable> {
  const reader = request.body?.getReader();
  const stream = new Readable({
    async read() {
      if (reader) {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null); 
        } else {
          this.push(value); 
        }
      }
    },
  });
  return stream;
}

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

async function parseFormData(request: Request): Promise<{ fields: any; fileStream: Readable }> {
  const formData = await request.formData();
  const fields = {
    make: formData.get('make'),
    model: formData.get('model'),
    year: formData.get('year'),
    pricePerDay: formData.get('pricePerDay'),
  };

  const file = formData.get('image');
  const fileStream = file ? Readable.from(file.stream()) : null;

  return { fields, fileStream };
}

export async function POST(request: Request) {
  const user = await authMiddleware(request);
  if (user instanceof NextResponse) return user;

  const roleCheck = roleMiddleware(user, ['admin', 'manager']);
  if (roleCheck instanceof NextResponse) return roleCheck;

  try {
    await connectToDB();

    const { fields, fileStream } = await parseFormData(request);

    const { make, model, year, pricePerDay } = fields;
    if (!make || !model || !year || !pricePerDay) {
      return NextResponse.json({ message: 'Please provide all required fields' }, { status: 400 });
    }

    let imageUrl = '';
    if (fileStream) {
      imageUrl = await uploadToCloudinary(fileStream);
    }

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
    return NextResponse.json({ success: false, error: 'Error adding vehicle' }, { status: 500 });
  }
}
