import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/lib/config';

// PHASE 2 SUBMISSION ROUTE (Default OFF behind ENABLE_SUBMIT)
export async function POST(req: Request) {
  if (!SITE_CONFIG.ENABLE_SUBMIT) {
    return NextResponse.json(
      { error: 'Direct submission is disabled. Please use WhatsApp copy mode.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();

    // 1. Honeypot check
    if (body._hp_field) {
      return NextResponse.json({ success: true }); // Silent drop for bots
    }

    // 2. TODO (Phase 2): Cloudflare Turnstile token validation
    // const turnstileToken = body['cf-turnstile-response'];

    // 3. TODO (Phase 2): Rate limiting per IP via Upstash Redis or LRU cache

    // 4. TODO (Phase 2): Insert into Supabase profiles table using process.env.SUPABASE_SERVICE_ROLE_KEY

    return NextResponse.json({
      success: true,
      message: 'Profile received under review.',
    });
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
