import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Branding */}
        <div>
          <h2 className="text-lg font-bold text-white">Elliot Car Rentals</h2>
          <p className="text-sm">Your trusted car rental service.</p>
        </div>

        {/* Links */}
        <div className="flex gap-2 items-center">
          <Link href="/about" className="hover:text-white">About Us</Link>
          <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex  space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
