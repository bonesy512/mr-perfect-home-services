import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// List of supported services for validation
const VALID_SERVICES = [
  'Chimney Sweep & Creosote Removal',
  'Level 1/2 Camera Inspection',
  'Fireplace Masonry & Damper Repair',
  'Whole-Home Air Duct Sanitization',
  'Dryer Vent Fire Prevention Cleaning',
  'Chimney Cap & Animal Screen Installations',
];

interface QuoteRequestBody {
  fullName?: string;
  phone?: string;
  service?: string;
  zipCode?: string;
  urgency?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as QuoteRequestBody;

    // 1. Sanitize and Extract Fields
    const fullName = body.fullName?.trim() || '';
    const phone = body.phone?.trim() || '';
    const service = body.service?.trim() || 'Chimney Sweep & Creosote Removal';
    const zipCode = body.zipCode?.trim() || '';
    const urgency = body.urgency?.trim() || 'Normal (Within 1-3 Days)';
    const notes = body.notes?.replace(/<[^>]*>?/gm, '').trim() || ''; // Basic HTML stripping

    // 2. Validation
    const errors: Record<string, string> = {};

    if (!fullName || fullName.length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    } else if (fullName.length > 100) {
      errors.fullName = 'Full name must be under 100 characters.';
    }

    // Check phone: strip non-digits, must have at least 10 digits
    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone) {
      errors.phone = 'Phone number is required for dispatch & estimate confirmation.';
    } else if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      errors.phone = 'Please enter a valid 10-digit phone number (e.g. 737-299-7300).';
    }

    if (zipCode && zipCode.length > 50) {
      errors.zipCode = 'Zip code / Neighborhood must be under 50 characters.';
    }

    if (notes && notes.length > 1000) {
      errors.notes = 'Notes must be under 1000 characters.';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: errors,
        },
        { status: 400 }
      );
    }

    const leadId = `ATX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const leadPayload = {
      leadId,
      timestamp,
      customer: {
        fullName,
        phone,
        zipCode: zipCode || 'Austin Metro',
      },
      serviceDetails: {
        selectedService: service,
        urgency,
        notes: notes || 'None provided',
      },
      source: 'Austin Web Landing Engine',
      meta: {
        userAgent: req.headers.get('user-agent') || 'Unknown',
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1',
      },
    };

    // 3. Structured Logging & Dispatch Simulation
    console.log('╔════════════════════════════════════════════════════════════════╗');
    console.log('⚡ [MR. PERFECT HOME SERVICES] NEW AUSTIN ESTIMATE LEAD INTAKE');
    console.log('╠════════════════════════════════════════════════════════════════╣');
    console.log(` Lead ID   : ${leadId}`);
    console.log(` Customer  : ${fullName} (${phone})`);
    console.log(` Location  : ${zipCode || 'Austin Metro'}`);
    console.log(` Service   : ${service}`);
    console.log(` Timeline  : ${urgency}`);
    if (notes) console.log(` Notes     : ${notes}`);
    console.log('╚════════════════════════════════════════════════════════════════╝');

    // 4. Optional Webhook Forwarding (Zapier / Slack / Discord / CRM)
    const webhookUrl = process.env.QUOTE_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload),
        });
      } catch (webhookErr) {
        console.warn('[QUOTE WEBHOOK WARNING] Could not forward lead to webhook URL:', webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Free estimate request received! An Austin safety coordinator will contact you within 15 minutes.',
        leadId,
        lead: {
          fullName,
          service,
          phoneMasked: phone.replace(/(\d{3})\d{4}(\d{3})/, '$1-****-$2'),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[QUOTE API ERROR]', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error processing estimate request. Please call (737) 299-7300 directly.',
      },
      { status: 500 }
    );
  }
}
