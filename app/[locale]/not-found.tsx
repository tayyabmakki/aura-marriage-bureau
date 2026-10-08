import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="rounded-full border border-[rgba(201,162,75,0.3)] bg-[#16130f] p-4 text-[#ecd290]">
        <span className="font-serif text-3xl font-bold">404</span>
      </div>
      <h1 className="mt-4 font-serif text-2xl font-bold text-[#f4ecda] sm:text-3xl">
        Page Not Found · صفحہ دستیاب نہیں
      </h1>
      <p className="mt-2 text-sm text-[#a79c82] max-w-sm">
        The link you followed may be incorrect, or the page has moved.
      </p>
      <div className="mt-6">
        <Link href="/" className="btn-gold text-xs font-semibold px-6 py-2.5">
          Return to Home · ہوم پیج پر جائیں
        </Link>
      </div>
    </div>
  );
}
