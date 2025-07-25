import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || ''
const client = new MongoClient(uri)

export async function POST(req: NextRequest) {
  try {
    const { user_id, tailored_text } = await req.json()

    if (!user_id || !tailored_text) {
      return NextResponse.json({ error: 'Missing user_id or tailored_text' }, { status: 400 })
    }

    await client.connect()
    const db = client.db('resume_tailor') // replace with your DB name
    const collection = db.collection('tailored_resumes')

    // Save or update the tailored resume
    const result = await collection.updateOne(
      { user_id }, // Match by user_id
      { $set: { user_id, tailored_text, updatedAt: new Date() } },
      { upsert: true } // Insert if doesn't exist
    )

    return NextResponse.json({ success: true, result })
  } catch (err) {
    console.error('MongoDB Error:', err)
    return NextResponse.json({ error: 'MongoDB Error', details: err }, { status: 500 })
  } finally {
    await client.close()
  }
}
