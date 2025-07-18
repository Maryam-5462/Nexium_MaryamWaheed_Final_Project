
// "use client"
// import { useState } from 'react'
// import { supabase } from '@/lib/supabaseClient'
// import { useRouter } from 'next/navigation'

// export default function UploadResumePage() {
//   const [title, setTitle] = useState('')
//   const [file, setFile] = useState<File | null>(null)
//   const router = useRouter()
// console.log("heyyyyyyyyy")


//   const handleUpload = async (e: React.FormEvent) => {
//     e.preventDefault()

//     console.log("🚀 Upload triggered")
//     console.log("Title:", title)
//     console.log("File:", file)

//     // Get current user
//     const {
//       data: { user },
//       error: authError
//     } = await supabase.auth.getUser()
// if (!user) {
//   console.error("User not found")
//   alert("You are not logged in")
//   return
// }

//     if (authError) {
//       console.error("❌ Auth error:", authError)
//       return alert('Authentication error')
//     }

//     if (!user) {
//       console.warn("⚠️ No user found")
//       return alert('Not logged in')
//     }

//     if (!file) {
//       console.warn("⚠️ No file selected")
//       return alert('Please select a file')
//     }

//     const filePath = `${user.id}/${Date.now()}_${file.name}`

//     console.log("📂 File Path:", filePath)
//     console.log("📄 File Type:", file.type)

//     // Upload to Supabase Storage
// const { data: storageData, error: storageError } = await supabase.storage
//   .from('resumes')
//   .upload(filePath, file)

// if (storageError) {
//   console.error("❌ Storage upload error:", storageError)
//   alert(`Error uploading file: ${storageError.message || 'Unknown error'}`)
//   return
// }


//     const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${filePath}`
//     console.log("✅ File uploaded. Public URL:", fileUrl)
// console.log("User ID:", user?.id)  // Add this
// console.log("Inserting into resumes:", {
//   user_id: user?.id,
//   title,
//   file_url: fileUrl,
// })
//     // Save file info to database
//     const { error: dbError } = await supabase.from('resumes').insert({
//       user_id: user.id,
//       title,
//       content: fileUrl,
//     })

//     if (dbError) {
//       console.error("❌ DB insert error:", dbError)
//       return alert('Error saving to database')
//     }

//     console.log("✅ Resume info saved to DB")
//     alert('Resume uploaded!')
//     router.push('/resume/saved')
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
"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function UploadResumePage() {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    // Get current user
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (!user) {
      console.error("User not found")
      return alert("You are not logged in")
    }

    if (authError) {
      console.error("❌ Auth error:", authError)
      return alert('Authentication error')
    }

    if (!file) {
      console.warn("⚠️ No file selected")
      return alert('Please select a file')
    }

    const filePath = `${user.id}/${Date.now()}_${file.name}`

    // Upload to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('resumes')
      .upload(filePath, file)

    if (storageError) {
      console.error("❌ Storage upload error:", storageError)
      return alert(`Error uploading file: ${storageError.message || 'Unknown error'}`)
    }

    const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resumes/${filePath}`

    // Save resume info to Supabase table
    const { error: dbError } = await supabase.from('resumes').insert({
      user_id: user.id,
      title,
      content: fileUrl,
      description
    })

    if (dbError) {
      console.error("❌ DB insert error:", dbError)
      return alert('Error saving to database')
    }

    alert('✅ Resume uploaded successfully!')
    router.push('/resume/saved')
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#1f1b3a] to-[#0f0c29] text-white">
      <h1 className="text-3xl font-bold mb-6">📤 Upload Resume (File)</h1>
      <form onSubmit={handleUpload} className="space-y-4 max-w-lg">
        <input
          className="w-full p-3 rounded bg-white/10 text-white placeholder-gray-300"
          placeholder="Resume Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <textarea
          className="w-full h-32 p-3 rounded bg-white/10 text-white placeholder-gray-300"
          placeholder="Optional: Description or Summary"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-3 rounded bg-white/10 text-white"
        />
        
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded transition"
        >
          Upload Resume File
        </button>
      </form>
    </div>
  )
}
