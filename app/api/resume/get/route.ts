
// /app/api/resume/get/route.ts
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id')

    if (!user_id) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('resume_tailor')
    const collection = db.collection('full_texts')

    const result = await collection.findOne(
      { user_id }, 
      { sort: { created_at: -1 } }
    )

    return NextResponse.json({ text: result?.text || '' })
  } catch (err) {
    console.error('❌ Error fetching resume:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
