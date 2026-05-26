import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    const itemsTable = items.map((item: { name: string; quantity: number; price: number }) =>
      `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e4d8;">${item.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e4d8;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0e4d8;text-align:right;">&#8364;${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    ).join('')

    const restaurantEmailHtml = `
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
              <p style="margin:2px 0 0;font-size:14px;color:#555;">${customerPhone}</p>
              ${customerEmail ? `<p style="margin:2px 0 0;font-size:14px;color:#555;">${customerEmail}</p>` : ''}
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
              <tbody>${itemsTable}</tbody>
            </table>

            <div style="border-top:2px solid #1B2B5E;padding-top:12px;text-align:right;">
              <span style="font-size:18px;font-weight:700;color:#1B2B5E;">Total: &#8364;${totalAmount.toFixed(2)}</span>
            </div>

            ${specialInstructions ? `
            <div style="margin-top:20px;background:#fffbf0;border:1px solid #D4AF37;border-radius:8px;padding:16px;">
              <p style="margin:0;font-size:12px;color:#888;">Special Instructions</p>
              <p style="margin:4px 0 0;font-size:14px;color:#1a1a1a;">${specialInstructions}</p>
            </div>` : ''}

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

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family:sans-serif;background:#f5f5f5;margin:0;padding:20px;">
        <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">

          <div style="background:linear-gradient(135deg,#000066,#0000FF);padding:24px 32px;">
            <h1 style="color:white;margin:0;font-size:22px;">Order Confirmed!</h1>
            <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:14px;">Order #${orderNumber}</p>
          </div>

          <div style="padding:32px;">

            <p style="font-size:16px;color:#1a1a1a;margin:0 0 24px;">Thank you ${customerName}! Your order has been received and our kitchen is preparing it now.</p>

            <h2 style="font-size:16px;color:#1B2B5E;margin:0 0 12px;">Your Order</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
              <thead>
                <tr style="background:#f8f8f8;">
                  <th style="padding:8px 12px;text-align:left;font-size:12px;color:#888;font-weight:600;">ITEM</th>
                  <th style="padding:8px 12px;text-align:center;font-size:12px;color:#888;font-weight:600;">QTY</th>
                  <th style="padding:8px 12px;text-align:right;font-size:12px;color:#888;font-weight:600;">PRICE</th>
                </tr>
              </thead>
              <tbody>${itemsTable}</tbody>
            </table>

            <div style="border-top:2px solid #1B2B5E;padding-top:12px;text-align:right;margin-bottom:24px;">
              <span style="font-size:18px;font-weight:700;color:#1B2B5E;">Total: &#8364;${totalAmount.toFixed(2)}</span>
            </div>

            <div style="background:#fff8f5;border-radius:8px;padding:20px;margin-bottom:16px;">
              <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#1B2B5E;">Pickup Details</p>
              <p style="margin:0 0 4px;font-size:14px;color:#555;">&#128205; Leyweg 986, 2545 GW Den Haag</p>
              <p style="margin:0 0 4px;font-size:14px;color:#555;">&#9201; Ready in approximately 30 to 45 minutes</p>
              <p style="margin:0;font-size:14px;color:#555;">&#128181; Payment: Cash on Pickup</p>
            </div>

            <p style="font-size:13px;color:#888;margin:0;">Questions? Call us on <a href="tel:+31630645930" style="color:#1B2B5E;">+31 6 30645930</a></p>

          </div>

          <div style="background:#1B2B5E;padding:16px 32px;text-align:center;">
            <p style="color:rgba(255,255,255,0.6);margin:0;font-size:12px;">Chopras Indian Restaurant &middot; Leyweg 986, Den Haag</p>
          </div>

        </div>
      </body>
      </html>
    `

    // Send notification to restaurant
    await resend.emails.send({
      from: 'Chopras Orders <info@chopras.nl>',
      to: 'choprasstreetfood@gmail.com',
      subject: `New Pickup Order #${orderNumber} - \u20ac${totalAmount.toFixed(2)}`,
      html: restaurantEmailHtml,
    })

    // Send confirmation to customer if email provided
    if (customerEmail) {
      await resend.emails.send({
        from: 'Chopras Indian Restaurant <info@chopras.nl>',
        to: customerEmail,
        subject: `Your Chopras Order #${orderNumber} is Confirmed`,
        html: customerEmailHtml,
      })
    }

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
    console.error('Order error:', error)
    return NextResponse.json(
      { success: false, error: 'Order failed. Please call us on +31 6 30645930' },
      { status: 500 }
    )
  }
}
