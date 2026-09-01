import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { appendToGoogleSheet } from '@/lib/googleSheets';
import { sendGreenApiSelfMessage, formatLeadToWhatsAppMessage } from '@/lib/greenApi';

const RESTAURANT_EMAIL = 'info@chopras.nl';
const RESTAURANT_EMAILS = ['info@chopras.nl', 'choprasstreetfood@gmail.com'];

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'info@chopras.nl',
    pass: 'qhbilfenlwtpetgz',
  },
} as any);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, date, guests, message } = await req.json();

    if (!name || !email || !date || !guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── Email to customer ──────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Chopras Indian Restaurant" <${RESTAURANT_EMAIL}>`,
      to: email,
      subject: 'Your Event Hall Request is Confirmed! – Chopras',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A;">
          <div style="background:#06068a;padding:32px 40px;">
            <h1 style="color:#ffffff;margin:0;font-size:24px;">Chopras Indian Restaurant</h1>
            <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px;">Private Event Hall · Den Haag</p>
          </div>
          <div style="padding:40px;">
            <h2 style="color:#06068a;font-size:20px;margin-top:0;">Thank you, ${name}!</h2>
            <p style="color:#555;line-height:1.6;">
              We have received your event hall booking inquiry. Our team will get back to you within <strong>24 hours</strong> to confirm availability and discuss your menu.
            </p>
            <table style="width:100%;border-collapse:collapse;margin:24px 0;background:#F7F8FC;border-radius:8px;">
              <tr>
                <td style="padding:12px 16px;font-weight:bold;color:#06068a;width:40%;border-bottom:1px solid #e0e0e0;">Event Date</td>
                <td style="padding:12px 16px;color:#1A1A1A;border-bottom:1px solid #e0e0e0;">${date}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-weight:bold;color:#06068a;border-bottom:1px solid #e0e0e0;">Number of Guests</td>
                <td style="padding:12px 16px;color:#1A1A1A;border-bottom:1px solid #e0e0e0;">${guests}</td>
              </tr>
              <tr>
                <td style="padding:12px 16px;font-weight:bold;color:#06068a;">Phone</td>
                <td style="padding:12px 16px;color:#1A1A1A;">${phone || 'Not provided'}</td>
              </tr>
            </table>
            ${message ? `<p style="color:#555;line-height:1.6;"><strong>Your message:</strong><br/>${message}</p>` : ''}
            <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
            <p style="color:#999;font-size:12px;">
              Chopras Indian Restaurant · Leyweg 986, Den Haag · <a href="tel:+31630645930" style="color:#0000B3;">+31 6 30645930</a>
            </p>
          </div>
        </div>
      `,
    });

    // ── Email to restaurant (admin) ────────────────────────────────────
    await transporter.sendMail({
      from: `"Chopras Website" <${RESTAURANT_EMAIL}>`,
      to: RESTAURANT_EMAILS,
      subject: ` New Event Hall Booking – ${name} | ${date} | ${guests} guests`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1A1A1A;">
          <div style="background:#0000B3;padding:24px 32px;">
            <h2 style="color:#fff;margin:0;font-size:18px;">New Event Hall Booking Request</h2>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:12px;">Feestzaal Den Haag Page</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;background:#F7F8FC;border-radius:8px;">
              <tr>
                <td style="padding:10px 16px;font-weight:bold;color:#06068a;width:35%;border-bottom:1px solid #e0e0e0;">Name</td>
                <td style="padding:10px 16px;border-bottom:1px solid #e0e0e0;">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-weight:bold;color:#06068a;border-bottom:1px solid #e0e0e0;">Email</td>
                <td style="padding:10px 16px;border-bottom:1px solid #e0e0e0;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-weight:bold;color:#06068a;border-bottom:1px solid #e0e0e0;">Phone</td>
                <td style="padding:10px 16px;border-bottom:1px solid #e0e0e0;">${phone || '—'}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-weight:bold;color:#06068a;border-bottom:1px solid #e0e0e0;">Event Date</td>
                <td style="padding:10px 16px;border-bottom:1px solid #e0e0e0;">${date}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-weight:bold;color:#06068a;border-bottom:1px solid #e0e0e0;">Guests</td>
                <td style="padding:10px 16px;border-bottom:1px solid #e0e0e0;">${guests}</td>
              </tr>
              <tr>
                <td style="padding:10px 16px;font-weight:bold;color:#06068a;">Message</td>
                <td style="padding:10px 16px;">${message || '—'}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    });

    // ── WhatsApp Lead Pipeline ─────────────────────────────────────────
    try {
      const whatsappData: Record<string, any> = {
        serviceType: 'Chopras Event Hall Booking',
        fullName: name,
        phone: phone || 'Not provided',
        eventDate: date,
        numGuests: guests,
        additionalNotes: message || '',
      };

      if (email) whatsappData.email = email;

      const formattedMsg = formatLeadToWhatsAppMessage(whatsappData);
      await sendGreenApiSelfMessage(formattedMsg);
    } catch (waErr) {
      console.error('[feestzaal-booking] WhatsApp Green API Fault:', waErr);
    }

    try {
      await appendToGoogleSheet('Reservation', {
        name,
        email,
        phone: phone || 'N/A',
        date,
        guests,
        message: message || 'None',
        type: 'Feestzaal Event Hall Request'
      })
    } catch (sheetErr) {
      console.error('[feestzaal-booking] Google Sheet logging error:', sheetErr)
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('[feestzaal-booking] Email error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
