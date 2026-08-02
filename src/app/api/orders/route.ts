import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// --- Nodemailer Transport Configuration ---
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,             // Port 587 avoids Vercel network blocks
  secure: false,         // false for 587
  auth: {
    user: 'info@chopras.nl',
    pass: 'hagfztaegpmxvzni', // Your Gmail App Password
  },
} as any)

// Restaurant Configuration
const RESTAURANT_EMAIL = 'info@chopras.nl' 

import { checkOpeningStatus, ALL_PICKUP_TIMES } from '@/lib/openingHours'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerPhone,
      customerEmail,
      pickupTime,
      items,
      totalAmount,
      specialInstructions,
    } = body

    const openingStatus = checkOpeningStatus()
    if (openingStatus.isClosed) {
      return NextResponse.json(
        { success: false, error: openingStatus.messageEn },
        { status: 400 }
      )
    }

    if (!pickupTime || !ALL_PICKUP_TIMES.includes(pickupTime)) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid pickup time between 16:30 and 22:00.' },
        { status: 400 }
      )
    }

    const orderNumber = `CHO-${Date.now().toString().slice(-6)}`

    // Generate dynamic HTML table rows for your items list
    const itemsTableRows = items.map((item: { name: string; quantity: number; price: number }) =>
      `<tr style="border-bottom: 1px solid #eeeeee;">
        <td style="padding:10px 12px; font-size:14px; color:#1a1a1a; text-align:left;">${item.name}</td>
        <td style="padding:10px 12px; font-size:14px; color:#1a1a1a; text-align:center;">${item.quantity}</td>
        <td style="padding:10px 12px; font-size:14px; color:#1a1a1a; text-align:right;">&euro;${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    ).join('')

    // Base email HTML template body
    const emailHtmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

    <div style="background:linear-gradient(135deg,#000066,#0000FF);padding:24px 32px;">
      <h1 style="color:white;margin:0;font-size:22px;">New Pickup Order</h1>
      <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:14px;">Order #${orderNumber}</p>
    </div>

    <div style="padding:32px;">

      <div style="background:#fff8f5;border-left:4px solid #D4AF37;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;color:#888;">Customer Details</p>
        <p style="margin:4px 0 0;font-size:16px;font-weight:600;color:#1a1a1a;">${customerName}</p>
        <p style="margin:2px 0 0;font-size:14px;color:#555;">Phone: ${customerPhone}</p>
        <p style="margin:2px 0 0;font-size:14px;color:#555;">Email: ${customerEmail || 'Not provided'}</p>
        <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#0000B3;">Scheduled Pickup Time: ${pickupTime || 'Not specified'}</p>
      </div>

      <h2 style="font-size:16px;color:#1B2B5E;margin:0 0 12px;">Order Items</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <thead>
          <tr style="background:#f8f8f8;">
            <th style="padding:8px 12px;text-align:left;font-size:12px;color:#888;font-weight:600;">ITEM</th>
            <th style="padding:8px 12px;text-align:center;font-size:12px;color:#888;font-weight:600;">QTY</th>
            <th style="padding:8px 12px;text-align:right;font-size:12px;color:#888;font-weight:600;">PRICE</th>
          </tr>
        </thead>
        <tbody>
          ${itemsTableRows}
        </tbody>
      </table>

      <div style="border-top:2px solid #1B2B5E;padding-top:12px;text-align:right;">
        <span style="font-size:18px;font-weight:700;color:#1B2B5E;">Total: &euro;${totalAmount.toFixed(2)}</span>
      </div>

      <div style="margin-top:20px;background:#fffbf0;border:1px solid #D4AF37;border-radius:8px;padding:16px;">
        <p style="margin:0;font-size:12px;color:#888;">Special Instructions</p>
        <p style="margin:4px 0 0;font-size:14px;color:#1a1a1a;">${specialInstructions || 'None'}</p>
      </div>

      <div style="margin-top:24px;background:#f0f4ff;border-radius:8px;padding:16px;">
        <p style="margin:0;font-size:13px;color:#1B2B5E;font-weight:600;">Payment: Cash on Pickup</p>
        <p style="margin:4px 0 0;font-size:13px;color:#555;">Ready in approximately 30 to 45 minutes</p>
      </div>

    </div>

    <div style="background:#1B2B5E;padding:16px 32px;text-align:center;">
      <p style="color:rgba(255,255,255,0.6);margin:0;font-size:12px;">Chopras Indian Restaurant &middot; Leyweg 986, Den Haag &middot; +31 6 30645930</p>
    </div>

  </div>
</body>
</html>
`

    // Array to manage concurrent email tasks
    const emailPromises = []

    // 1. Queue notification email to the Restaurant
    emailPromises.push(
      transporter.sendMail({
        from: '"Chopras Indian Restaurant" <info@chopras.nl>',
        to: RESTAURANT_EMAIL,
        subject: `Order Confirmed ${orderNumber} - ${customerName}`,
        html: emailHtmlBody,
      })
    )

    // 2. Queue receipt confirmation email to the Customer if email was provided
    if (customerEmail) {
      emailPromises.push(
        transporter.sendMail({
          from: '"Chopras Indian Restaurant" <info@chopras.nl>',
          to: customerEmail,
          subject: `Order Confirmed ${orderNumber}`,
          html: emailHtmlBody,
        })
      )
    }

    let mailDelivered = false
    let whatsappDelivered = false

    try {
      // CRITICAL FOR VERCEL: Await all email operations to resolve completely before continuing
      await Promise.all(emailPromises)
      mailDelivered = true
    } catch (mailError) {
      console.error('Mail not delivered:', mailError)
    }

    // ==========================================
    // WHATSAPP LEAD PIPELINE
    // ==========================================
    try {
      const itemsListSummary = items
        .map((item: { name: string; quantity: number }) => `${item.name} (x${item.quantity})`)
        .join(', ')

      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })

      const whatsappData: Record<string, any> = {
        serviceType: 'Chopras Pickup Order',
        fullName: customerName,
        phone: customerPhone,
        message: `Date: ${currentDate} | Order Number: ${orderNumber} | Pickup Time: ${pickupTime || 'N/A'} | Items: ${itemsListSummary} | Total: €${totalAmount.toFixed(2)}`,
      }

      if (customerEmail) whatsappData.email = customerEmail
      if (specialInstructions) whatsappData.dietaryRequirements = `Instructions: ${specialInstructions}`

      // Await this network fetch request completely so Vercel does not terminate the pipeline prematurely
      const whatsappResponse = await fetch('https://whatsapp-0gwb.onrender.com/api/v1/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(whatsappData),
      })

      if (whatsappResponse.ok) {
        whatsappDelivered = true
      } else {
        console.error('WhatsApp not delivered', {
          status: whatsappResponse.status,
          statusText: whatsappResponse.statusText,
        })
      }
    } catch (waErr) {
      console.error('WhatsApp not delivered:', waErr)
    }

    // Return operational response structure to your frontend checkout form
    return NextResponse.json({
      success: true,
      mailDelivered,
      whatsappDelivered,
      orderNumber,
      order: {
        orderNumber,
        customerName,
        customerPhone,
        customerEmail,
        pickupTime,
        items,
        totalAmount,
        paymentMethod: 'Cash on Pickup',
        specialInstructions,
        estimatedPickup: '30 to 45 minutes',
        restaurantAddress: 'Leyweg 986, 2545 GW Den Haag',
        createdAt: new Date().toISOString(),
      },
    })

  } catch (error) {
    console.error('Order route error:', error)
    return NextResponse.json(
      { success: false, error: 'Order failed. Please call us on +31 6 30645930' },
      { status: 500 }
    )
  }
}
