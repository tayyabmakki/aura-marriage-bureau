import React from 'react';
import { SITE_CONFIG } from '@/lib/config';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#0a0908] p-6 text-[#f4ecda]">
      <div className="mx-auto max-w-5xl rounded-2xl border border-[rgba(201,162,75,0.22)] bg-[#16130f] p-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[#ecd290]">
          Phase 2 Administrative Portal (Draft Scaffold)
        </span>
        <h1 className="mt-2 font-serif text-3xl font-bold text-[#f4ecda]">
          {SITE_CONFIG.name} · Staff Administration
        </h1>
        <p className="mt-2 text-sm text-[#a79c82]">
          This route is reserved for authorized bureau consultants with Supabase Email Allowlist authentication.
        </p>

        <div className="mt-8 rounded-xl border border-dashed border-[rgba(201,162,75,0.3)] p-6 space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#ecd290]">
            Planned Administration Features (Phase 2):
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-[#a79c82]">
            <li>Supabase Auth with allowlist: <code>{SITE_CONFIG.email}</code></li>
            <li>Profile filtering by Status (new, contacted, matched, archived)</li>
            <li>Instant search across Reference ID (AMB-###), caste, city, age, and sect</li>
            <li>One-click copy to formatted WhatsApp message template</li>
            <li>Direct CSV export stub for offline bureau records</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
