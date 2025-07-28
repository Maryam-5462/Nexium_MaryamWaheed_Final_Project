import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || ''

export const dynamic = 'force-dynamic' // Prevent static optimization

export async function GET(req: NextRequest) {
  let client; // Declare client here
  
  try {
    const userId = req.nextUrl.searchParams.get('user_id')
    if (!userId) {
      return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })
    }

    client = new MongoClient(uri) // Create new client per request
    await client.connect()
    
    const db = client.db('resume_tailor')
    const collection = db.collection('tailored_resumes')

    const record = await collection.findOne({ user_id: userId })

    if (!record) {
      return NextResponse.json({ tailored_text: '' }, { status: 200 })
    }

    return NextResponse.json({ tailored_text: record.tailored_text })
  } catch (err) {
    console.error('MongoDB Read Error:', err)
    return NextResponse.json(
      { error: 'Database operation failed' }, 
      { status: 500 }
    )
  } finally {
    if (client) {
      await client.close().catch(e => console.error('Failed to close connection:', e))
    }
  }
}