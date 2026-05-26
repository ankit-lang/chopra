import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, position } = body

    if (!name || !email || !position) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    return Response.json({ success: true })
  } catch {
    return Response.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    )
  }
}
