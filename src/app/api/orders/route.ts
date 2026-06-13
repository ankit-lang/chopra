import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// --- Nodemailer Transport Configuration ---
// It is highly recommended to move these credentials to your .env.local file
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // e.g., smtp.gmail.com, smtp.sendgrid.net
  port:  '587', // 587 (TLS) or 465 (SSL) to avoid Vercel blocks
  secure: false,       // true for 465, false for 587
  auth: {
    user:  'rankit2883@gmail.com',
    pass: 'cbonefjwopeonhao',
  },
})

// Restaurant Configuration
const RESTAURANT_EMAIL = 'rankit2883@gmail.com' 

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      customerName,
      customerPhone,
      customerEmail,
      items,
      totalAmount,
      specialInstructions,
    } = body

    const orderNumber = `CHO-${Date.now().toString().slice(-6)}`

    // Generate dynamic HTML table rows for your items list
    const itemsTableRows = items.map((item: { name: string; quantity: number; price: number }) =>
      `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e4d8;">${item.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e4d8;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e4d8;text-align:right;">&euro;${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    ).join('')

    // Base email HTML template body (Replacing the EmailJS cloud templates)
    const emailHtmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #f0e4d8;">
        <h2>Order Confirmation: ${orderNumber}</h2>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Phone:</strong> ${customerPhone}</p>
        <p><strong>Email:</strong> ${customerEmail || 'Not provided'}</p>
        <p><strong>Special Instructions:</strong> ${specialInstructions || 'None'}</p>
        
        <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f0e4d8;">
              <th style="padding:8px 12px; text-align:left;">Item</th>
              <th style="padding:8px 12px; text-align:center;">Qty</th>
              <th style="padding:8px 12px; text-align:right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsTableRows}
          </tbody>
        </table>
        
        <h3 style="text-align: right; margin-top: 20px;">Total Amount: &euro;${totalAmount.toFixed(2)}</h3>
      </div>
    `

    // Array to manage concurrent email tasks
    const emailPromises = []

    // 1. Queue notification email to the Restaurant
    emailPromises.push(
      transporter.sendMail({
        from: `"Order Alert" < 'rankit2883@gmail.com'}>`,
        to: RESTAURANT_EMAIL,
        subject: `[New Order] ${orderNumber} - ${customerName}`,
        html: emailHtmlBody,
      })
    )

    // 2. Queue receipt confirmation email to the Customer if email was provided
    if (customerEmail) {
      emailPromises.push(
        transporter.sendMail({
          from: `"Restaurant Name"  'rankit2883@gmail.com'}>`,
          to: customerEmail,
          subject: `Your Order Confirmation ${orderNumber}`,
          html: emailHtmlBody,
        })
      )
    }

    // CRITICAL FOR VERCEL: Await all email operations to resolve completely 
    // before the lambda function response returns and shuts down.
    await Promise.all(emailPromises)

    // Return operational response structure to your frontend checkout form
    return NextResponse.json({
      success: true,
      orderNumber,
      order: {
        orderNumber,
        customerName,
        customerPhone,
        customerEmail,
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