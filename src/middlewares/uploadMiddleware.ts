import { Readable } from 'stream';
import cloudinary from '@/config/cloudinary'; // Cloudinary SDK

// Convert Web Streams API request body to a Node.js-readable stream
async function toNodeReadableStream(request: Request): Promise<Readable> {
  const reader = request.body?.getReader();
  const stream = new Readable({
    async read() {
      if (reader) {
        const { done, value } = await reader.read();
        if (done) {
          this.push(null); // End of stream
        } else {
          this.push(value); // Push chunk
        }
      }
    },
  });
  return stream;
}

// Function to upload a file to Cloudinary from a stream
async function uploadToCloudinary(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'car_rental_vehicles', allowed_formats: ['jpg', 'png'] },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result?.secure_url || ''); // Resolve with Cloudinary URL
      }
    );

    stream.pipe(uploadStream); // Pipe the stream to Cloudinary
  });
}

// Middleware function to handle file uploads
export async function handleFileUpload(request: Request) {
  // Convert the incoming request to a readable stream
  const stream = await toNodeReadableStream(request);

  // Upload the image to Cloudinary and return the URL
  const imageUrl = await uploadToCloudinary(stream);

  return imageUrl;
}
