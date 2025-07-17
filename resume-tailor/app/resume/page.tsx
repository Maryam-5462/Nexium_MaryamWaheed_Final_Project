'use client'
import React from 'react'
import { useState } from 'react'

export default function ResumeTailorForm() {
  const [job, setJob] = useState('')
  const [resume, setResume] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // send to n8n endpoint later
    console.log({ job, resume })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <textarea
        placeholder="Paste Job Description"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Paste Your Resume"
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Tailor Resume
      </button>
    </form>
  )
}
