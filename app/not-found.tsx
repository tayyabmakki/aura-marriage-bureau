import React from 'react';
import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="bg-[#0a0908] text-[#f4ecda] flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#ecd290]">404 - Not Found</h1>
        <p className="mt-2 text-sm text-[#a79c82]">The page you are looking for does not exist.</p>
        <Link href="/" className="mt-4 rounded-full bg-[#d4af61] px-5 py-2 text-xs font-bold text-black">
          Go to Home
        </Link>
      </body>
    </html>
  );
}
