import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// Explicit runtime specification (Node.js needed for MongoDB and PDF parsing)
export const runtime = 'nodejs' 
// Disable static evaluation
export const dynamic = 'force-dynamic' 

const uri = process.env.MONGODB_URI!
const dbName = process.env.MONGODB_DB!

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const user_id = formData.get('user_id') as string
    const title = formData.get('title') as string

    if (!file || !user_id || !title) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Dynamic import to help with serverless compatibility
    const { default: pdf } = await import('pdf-parse')
    const text = await pdf(buffer)

    // MongoDB operations
    const client = await new MongoClient(uri).connect()
    try {
      const db = client.db(dbName)
      const collection = db.collection('full_texts')

      await collection.insertOne({
        user_id,
        title,
        text: text.text,
        created_at: new Date()
      })

      return NextResponse.json({ 
        success: true,
        text: text.text.substring(0, 500) + '...' // Return first 500 chars
      })
    } finally {
      await client.close()
    }
  } catch (error: any) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: error.message || 'Processing failed' }, 
      { status: 500 }
    )
  }
}