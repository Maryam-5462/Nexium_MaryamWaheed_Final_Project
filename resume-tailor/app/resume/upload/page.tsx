
// "use client"
// import { useState } from 'react'
// import { supabase } from '@/lib/supabaseClient'
// import { useRouter } from 'next/navigation'

// export default function UploadResumePage() {
//   const [title, setTitle] = useState('')
//   const [file, setFile] = useState<File | null>(null)
//   const [description, setDescription] = useState('')
//   const router = useRouter()

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const {
//       data: { user },
//       error: authError
//     } = await supabase.auth.getUser()

//     if (!user) {
//       console.error("User not found")
//       return alert("You are not logged in")
//     }

//     if (authError) {
//       console.error("❌ Auth error:", authError)
//       return alert('Authentication error')
//     }

//     if (!file) {
//       console.warn("⚠️ No file selected")
//       return alert('Please select a file')
//     }

//     const filePath = `${user.id}/${Date.now()}_${file.name}`

//     // Upload to Supabase Storage
//     const { data: storageData, error: storageError } = await supabase.storage
//       .from('resumes')
//       .upload(filePath, file)

//     if (storageError) {
//       console.error("❌ Storage upload error:", storageError)
//       return alert(`Error uploading file: ${storageError.message || 'Unknown error'}`)
//     }

//     const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${filePath}`

//     // Save metadata to Supabase table
//     const { error: dbError } = await supabase.from('resumes').insert({
//       user_id: user.id,
//       title,
//       content: fileUrl,
//       description
//     })

//     if (dbError) {
//       console.error("❌ DB insert error:", dbError)
//       return alert('Error saving to database')
//     }
//  alert('✅ Resume uploaded successfully!')
//     router.push('/resume/saved')
// // webhook request code 
// //const N8N_WEBHOOK_URL = "https://maryam1123.app.n8n.cloud/webhook/gpt-tailor"
// // Send metadata to n8n Webhook
// await fetch("http://localhost:5678/webhook-test/resume-tailor", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     resume_url: fileUrl,
//     job_description: description,
//     title,
//     user_id: user.id
//   }),
// });

// if (!fileUrl || !description || !title || !user?.id) {
//   console.error("One or more values are missing:", {
//     fileUrl, description, title, userId: user?.id
//   });
// }





//     // ✅ Extract text and save to MongoDB via API
//     const form = new FormData()
//     form.append('file', file)
//     form.append('user_id', user.id)
//     form.append('title', title)

//     const response = await fetch('/api/extract-resume', {
//       method: 'POST',
//       body: form
//     })

//     const result = await response.json()
//     if (!response.ok) {
//       console.error("❌ MongoDB error:", result)
//       return alert('Failed to save resume text')
//     }

   
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#1f1b3a] to-[#0f0c29] text-white">
//       <h1 className="text-3xl font-bold mb-6">📤 Upload Resume (File)</h1>
//       <form onSubmit={handleUpload} className="space-y-4 max-w-lg">
//         <input
//           className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-300"
//           placeholder="Resume Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
        
//         <textarea
//           className="w-full h-32 p-3 rounded bg-white/10 text-white placeholder-gray-300"
//           placeholder="Optional: Description or Summary"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
        
//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="w-full p-3 rounded bg-white/10 text-white"
//         />
        
//         <button
//           type="submit"
//           className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition"
//         >
//           Upload Resume File
//         </button>
//       </form>
//     </div>
//   )
// }
// "use client"
// import { useState } from 'react'
// import { supabase } from '@/lib/supabaseClient'
// import { useRouter } from 'next/navigation'

// export default function UploadResumePage() {
//   const [title, setTitle] = useState('')
//   const [file, setFile] = useState<File | null>(null)
//   const [description, setDescription] = useState('')
//   const [tailoredResume, setTailoredResume] = useState('')
//   const [resumeText, setResumeText] = useState('')
//   const router = useRouter()

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const {
//       data: { user },
//       error: authError
//     } = await supabase.auth.getUser()

//     if (!user) return alert("You are not logged in")
//     if (authError) return alert('Authentication error')
//     if (!file) return alert('Please select a file')

//     const filePath = `${user.id}/${Date.now()}_${file.name}`

//     const { error: storageError } = await supabase.storage
//       .from('resumes')
//       .upload(filePath, file)

//     if (storageError) return alert(`Error uploading file: ${storageError.message}`)

//     const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${filePath}`

//     const { error: dbError } = await supabase.from('resumes').insert({
//       user_id: user.id,
//       title,
//       content: fileUrl,
//       description
//     })

//     if (dbError) return alert('Error saving to database')
// alert('✅ Resume uploaded successfully!')
//     // Call your n8n webhook
//     const webhookRes = await fetch("http://localhost:5678/webhook-test/resume-tailor", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         resume_url: fileUrl,
//         job_description: description,
//         title,
//         user_id: user.id
//       })
//     })

//     if (webhookRes.ok) {
//       const json = await webhookRes.json()
//       console.log("Webhook Response:", json)
//       setTailoredResume(json.tailored_resume || 'No tailored resume returned')
//     } else {
//       alert("Webhook call failed")
//     }

//     // Optional: Extract and save resume text in MongoDB
//     const form = new FormData()
//     form.append('file', file)
//     form.append('user_id', user.id)
//     form.append('title', title)

//     const response = await fetch('/api/extract-resume', {
//       method: 'POST',
//       body: form
//     })

//     const result = await response.json()
// if (!response.ok) {
//   console.error("❌ MongoDB error:", result)
// } else {
//   setResumeText(result.text || 'No text extracted')
// }
// const res = await fetch('/api/resume/get')
// const data = await res.json()

// console.log(data.fullText) // Show this in a textarea, div, etc.

//   }

//   const downloadText = (text: string, filename: string) => {
//     const element = document.createElement("a")
//     const file = new Blob([text], { type: "text/plain" })
//     element.href = URL.createObjectURL(file)
//     element.download = filename
//     document.body.appendChild(element)
//     element.click()
//   }

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#1f1b3a] to-[#0f0c29] text-white">
//       <h1 className="text-3xl font-bold mb-6">📤 Upload Resume (File)</h1>
//       <form onSubmit={handleUpload} className="space-y-4 max-w-lg">
//         <input
//           className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-300"
//           placeholder="Resume Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           className="w-full h-32 p-3 rounded bg-white/10 text-white placeholder-gray-300"
//           placeholder="Optional: Description or Summary"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="w-full p-3 rounded bg-white/10 text-white"
//         />

//         <button
//           type="submit"
//           className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition"
//         >
//           Upload Resume File
//         </button>
//       </form>

//       {resumeText && (
//  <div className="mt-8 bg-white/10 p-4 rounded">
//   <h2 className="text-xl font-semibold mb-2">📄 Extracted Resume Text</h2>
//   <textarea
//     readOnly
//     className="w-full h-64 p-3 text-black bg-white rounded whitespace-pre-wrap"
//     value={resumeText || 'Loading or no text found.'}
//   />
//   <div className="flex gap-4 mt-2">
//     <button
//       onClick={() => navigator.clipboard.writeText(resumeText || '')}
//       className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded"
//     >
//       📋 Copy
//     </button>
//     <button
//       onClick={() => downloadText(resumeText || '', 'extracted-resume.txt')}
//       className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
//     >
//       💾 Download
//     </button>
//   </div>
// </div>

  
// )}

//     </div>
//   )
// }
// 'use client'

// import { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabaseClient'
// import { useRouter } from 'next/navigation'
// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// export default function UploadResumePage() {
//   const [title, setTitle] = useState('')
//   const [file, setFile] = useState<File | null>(null)
//   const [description, setDescription] = useState('')
//   const [tailoredResume, setTailoredResume] = useState('')
//   const [resumeText, setResumeText] = useState('')
//   const router = useRouter()

//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault()

//     const {
//       data: { user },
//       error: authError
//     } = await supabase.auth.getUser()

//     if (!user) return alert("You are not logged in")
//     if (authError) return alert('Authentication error')
//     if (!file) return alert('Please select a file')

//     const filePath = `${user.id}/${Date.now()}_${file.name}`

//     const { error: storageError } = await supabase.storage
//       .from('resumes')
//       .upload(filePath, file)

//     if (storageError) return alert(`Error uploading file: ${storageError.message}`)

//     const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${filePath}`

//     const { error: dbError } = await supabase.from('resumes').insert({
//       user_id: user.id,
//       title,
//       content: fileUrl,
//       description
//     })

//     if (dbError) return alert('Error saving to database')
//     alert('✅ Resume uploaded successfully!')

//     // Call n8n webhook
// let json: any = {}

// const webhookRes = await fetch("http://localhost:5678/webhook-test/resume-tailor", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     resume_url: fileUrl,
//     job_description: description,
//     title,
//     user_id: user.id
//   })
// })

// if (webhookRes.ok) {
//   json = await webhookRes.json()
//   setTailoredResume(json.tailored_resume || 'No tailored resume returned')
// } else {
//   alert("Webhook call failed")
// }

// // ✅ Save tailored resume to MongoDB// Save tailored text (after upload or n8n completes)
// const saveTailoredText = async (text: string) => {
//   const res = await fetch('/api/save-tailored-resume', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       user_id: user.id,
//       tailored_text: text,
//     }),
//   })

//   const data = await res.json()
//   if (!res.ok) console.error('❌ Failed to save tailored resume:', data)
// }

// // Fetch tailored resume
// useEffect(() => {
//   const fetchTailoredResume = async () => {
//     const res = await fetch(`/api/get-tailored-resume?user_id=${user.id}`)
//     const data = await res.json()

//     if (!res.ok) {
//       console.error('❌ Error fetching tailored resume:', data)
//     } else {
//       setResumeText(data.tailored_text || 'No tailored resume found')
//     }
//   }

//   if (user?.id) fetchTailoredResume()
// }, [user])


// // Show tailored resume
// if (json.tailored_resume) {
//   setResumeText(json.tailored_resume)
// } else {
//   setResumeText('No tailored resume returned')
// }

//   }

//   const downloadText = (text: string, filename: string) => {
//     const element = document.createElement("a")
//     const file = new Blob([text], { type: "text/plain" })
//     element.href = URL.createObjectURL(file)
//     element.download = filename
//     document.body.appendChild(element)
//     element.click()
//     document.body.removeChild(element)
//   }

//   const downloadPdf = async (text: string, filename: string) => {
//     const pdfDoc = await PDFDocument.create()
//     const page = pdfDoc.addPage()
//     const { width, height } = page.getSize()

//     const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
//     const fontSize = 12

//     const lines = text.match(/.{1,90}/g) || ['No content']
//     let y = height - 40

//     for (const line of lines) {
//       if (y < 40) {
//         page.drawText('...Text truncated...', { x: 50, y, size: fontSize, font })
//         break
//       }

//       page.drawText(line, { x: 50, y, size: fontSize, font, color: rgb(0, 0, 0) })
//       y -= 20
//     }

//     const pdfBytes = await pdfDoc.save()
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' })

//     const link = document.createElement('a')
//     link.href = URL.createObjectURL(blob)
//     link.download = filename
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//   }

// useEffect(() => {
//   const fetchTailored = async () => {
//     const {
//       data: { user },
//       error
//     } = await supabase.auth.getUser()
//     if (!user) return

//     const res = await fetch(`/api/get-tailored-resume?user_id=${user.id}`)
//     const data = await res.json()

//     if (res.ok) {
//       setResumeText(data.tailored_text || 'No tailored resume found')
//     } else {
//       console.error("❌ Error fetching tailored resume:", data)
//     }
//   }

//   fetchTailored()
// }, [])

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-[#1f1b3a] to-[#0f0c29] text-white">
//       <h1 className="text-3xl font-bold mb-6">📤 Upload Resume (File)</h1>

//       <form onSubmit={handleUpload} className="space-y-4 max-w-lg">
//         <input
//           className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-300"
//           placeholder="Resume Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           className="w-full h-32 p-3 rounded bg-white/10 text-white placeholder-gray-300"
//           placeholder="Optional: Description or Summary"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />

//         <input
//           type="file"
//           accept=".pdf,.doc,.docx"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="w-full p-3 rounded bg-white/10 text-white"
//         />

//         <button
//           type="submit"
//           className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition"
//         >
//           Upload Resume File
//         </button>
//       </form>

//       {resumeText && (
//         <div className="mt-8 bg-white/10 p-4 rounded">
//           <h2 className="text-xl font-semibold mb-2">📄 Extracted Resume Text</h2>
//           <textarea
//             readOnly
//             className="w-full h-64 p-3 text-black bg-white rounded whitespace-pre-wrap"
//             value={resumeText || 'Loading or no text found.'}
//           />
//           <div className="flex gap-4 mt-2">
//             <button
//               onClick={() => navigator.clipboard.writeText(resumeText || '')}
//               className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded"
//             >
//               📋 Copy
//             </button>
//             <button
//               onClick={() => downloadText(resumeText || '', 'extracted-resume.txt')}
//               className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded"
//             >
//               💾 Download .txt
//             </button>
//             <button
//               onClick={() => downloadPdf(resumeText || '', 'extracted-resume.pdf')}
//               className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 rounded"
//             >
//               🧾 Download as PDF
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabaseClient"

// export default function UploadResumePage() {
//   const [file, setFile] = useState<File | null>(null)
//   const [description, setDescription] = useState("")
//   const [title, setTitle] = useState("")
//   const [tailoredText, setTailoredText] = useState("")
//   const [userId, setUserId] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase.auth.getUser()
//       if (error || !data.user) {
//         alert("You are not logged in")
//         return
//       }
//       setUserId(data.user.id)
//     }
//     fetchUser()
//   }, [])

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
    
//     try {
//       if (!file || !userId || !title || !description) {
//         throw new Error("Please fill in all fields and upload a file")
//       }

//       // 1. Upload to Supabase Storage
//       const filePath = `${userId}/${Date.now()}_${file.name}`
//       const { error: uploadErr } = await supabase.storage
//         .from("resumes")
//         .upload(filePath, file)

//       if (uploadErr) throw new Error("File upload failed")

//       const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${filePath}`

//       // 2. Save file metadata in Supabase DB
//       const { error: insertError } = await supabase
//         .from("resumes")
//         .insert({
//           user_id: userId,
//           title,
//           description,
//           content: fileUrl,
//         })

//       if (insertError) throw new Error("Error saving file record")

//       console.log("📤 Sending to n8n with:", {
//         resume_url: fileUrl,
//         job_description: description,
//         user_id: userId,
//       })

//       // 3. Send to n8n webhook
//       const webhookRes = await fetch("http://localhost:5678/webhook-test/resume-tailor", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           resume_url: fileUrl,
//           job_description: description,
//           user_id: userId,
//         }),
//       })

//       if (!webhookRes.ok) {
//         throw new Error(`Webhook failed with status ${webhookRes.status}`)
//       }

//       const rawText = await webhookRes.text()
//       console.log("⬇️ Raw response:", rawText)

//       // NEW: Ultra-reliable parsing approach
//       let text = "";
      
//       // Approach 1: Direct JSON parsing
//       try {
//         const parsed = JSON.parse(rawText);
//         text = parsed.answer || parsed.response?.answer || parsed.data?.answer;
//       } catch (e) {
//         console.log("Standard JSON parse failed, trying alternative methods");
//       }

//       // Approach 2: Regex extraction if JSON parse fails
//       if (!text) {
//         const answerMatch = rawText.match(/"answer"\s*:\s*"([^"]*)"/);
//         if (answerMatch && answerMatch[1]) {
//           text = answerMatch[1];
//         }
//       }

//       // Approach 3: Last resort - find the longest string between quotes
//       if (!text) {
//         const potentialAnswers = rawText.match(/"([^"]*)"/g) || [];
//         if (potentialAnswers.length > 0) {
//           // Find the longest string that looks like a paragraph
//           text = potentialAnswers
//             .map(s => s.replace(/"/g, ''))
//             .reduce((longest, current) => 
//               current.length > longest.length ? current : longest, "");
//         }
//       }

//       if (!text) {
//         console.error("Could not extract answer from:", rawText);
//         throw new Error("Could not process the response from the server");
//       }

//       console.log("✅ Extracted text:", text);
//       setTailoredText(text);

//       // 4. Save to MongoDB
//       const saveRes = await fetch("/api/save-tailored-resume", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id: userId,
//           title,
//           tailored_text: text,
//         }),
//       })

//       if (!saveRes.ok) {
//         throw new Error("Failed to save tailored resume")
//       }

//       alert("✅ Resume processed and saved successfully!")
//     } catch (error) {
//       console.error("❌ Error:", error)
//       alert(`Error: ${error.message}`)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       <h1 className="text-2xl font-bold mb-4">Upload Resume</h1>

//       <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
//         <input
//           type="text"
//           placeholder="Job Title (e.g. Frontend Intern)"
//           className="w-full p-2 bg-gray-800 rounded"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Job Description"
//           className="w-full p-2 bg-gray-800 rounded min-h-[120px]"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <div>
//           <label className="block mb-2 text-sm font-medium">
//             Resume File (PDF, DOC, DOCX)
//           </label>
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="w-full p-2 bg-gray-800 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <>
//               <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               Processing...
//             </>
//           ) : (
//             "Submit"
//           )}
//         </button>
//       </form>

//       {tailoredText && (
//         <div className="mt-8 bg-gray-800 p-4 rounded-lg border border-gray-700">
//           <div className="flex justify-between items-center mb-3">
//             <h2 className="text-lg font-semibold">Tailored Resume</h2>
//             <button 
//               onClick={() => navigator.clipboard.writeText(tailoredText)}
//               className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
//             >
//               Copy
//             </button>
//           </div>
//           <div className="bg-gray-900 p-4 rounded whitespace-pre-wrap text-gray-100 font-mono text-sm">
//             {tailoredText}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import jsPDF from "jspdf"

export default function UploadResumePage() {
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [tailoredText, setTailoredText] = useState("")
  const [userId, setUserId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data.user) {
        alert("You are not logged in")
        return
      }
      setUserId(data.user.id)
    }
    fetchUser()
  }, [])

  const downloadAsTxt = () => {
    const element = document.createElement("a")
    const file = new Blob([tailoredText], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `tailored-resume-${title || 'untitled'}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const downloadAsPdf = () => {
    const doc = new jsPDF()
    const lines = doc.splitTextToSize(tailoredText, 180)
    doc.text(lines, 10, 10)
    doc.save(`tailored-resume-${title || 'untitled'}.pdf`)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      if (!file || !userId || !title || !description) {
        throw new Error("Please fill in all fields and upload a file")
      }

      const filePath = `${userId}/${Date.now()}_${file.name}`
      const { error: uploadErr } = await supabase.storage
        .from("resumes")
        .upload(filePath, file)

      if (uploadErr) throw new Error("File upload failed")

      const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${filePath}`

      const { error: insertError } = await supabase
        .from("resumes")
        .insert({
          user_id: userId,
          title,
          description,
          content: fileUrl,
        })

      if (insertError) throw new Error("Error saving file record")

      const webhookRes = await fetch("http://localhost:5678/webhook-test/resume-tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resume_url: fileUrl,
          job_description: description,
          user_id: userId,
        }),
      })

      if (!webhookRes.ok) {
        throw new Error(`Webhook failed with status ${webhookRes.status}`)
      }

      const rawText = await webhookRes.text()
      let text = ""

      try {
        const parsed = JSON.parse(rawText)
        text = parsed.answer || parsed.response?.answer || parsed.data?.answer
      } catch (_) {
        console.log("Standard JSON parse failed, trying regex fallback")
      }

      if (!text) {
        const match = rawText.match(/"answer"\s*:\s*"([^"]*)"/)
        if (match?.[1]) text = match[1]
      }

      // Approach 3: Last resort - find the longest string between quotes
      if (!text) {
        const potentialAnswers = rawText.match(/"([^"]*)"/g) || [];
        if (potentialAnswers.length > 0) {
          // Find the longest string that looks like a paragraph
          text = potentialAnswers
            .map(s => s.replace(/"/g, ''))
            .reduce((longest, current) => 
              current.length > longest.length ? current : longest, "");
        }
      }

      if (!text) throw new Error("Could not extract answer from the server response")

      setTailoredText(text)

      const saveRes = await fetch("/api/save-tailored-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          title,
          tailored_text: text,
        }),
      })

      if (!saveRes.ok) {
        throw new Error("Failed to save tailored resume")
      }

      alert("✅ Resume processed and saved successfully!")
    } catch (error: any) {
      console.error("❌ Error:", error)
      alert(`Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Resume</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          type="text"
          placeholder="Job Title (e.g. Frontend Intern)"
          className="w-full p-2 bg-gray-800 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          className="w-full p-2 bg-gray-800 rounded min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div>
          <label className="block mb-2 text-sm font-medium">
            Resume File (PDF, DOC, DOCX)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 bg-gray-800 rounded file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {tailoredText && (
        <div className="mt-8 bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Tailored Resume</h2>
            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(tailoredText)}
                className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                Copy
              </button>
              <button
                onClick={downloadAsTxt}
                className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                Download .txt
              </button>
              <button
                onClick={downloadAsPdf}
                className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              >
                Download .pdf
              </button>
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded whitespace-pre-wrap text-gray-100 font-mono text-sm">
            {tailoredText}
          </div>
        </div>
      )}
    </div>
  )
}
