// // // 'use client'

// // // import { useEffect, useState } from 'react'
// // // import { supabase } from '@/lib/supabaseClient'
// // // import { useRouter } from 'next/navigation'

// // // export default function Dashboard() {
// // //   const [userEmail, setUserEmail] = useState('')
// // //   const router = useRouter()

// // //   useEffect(() => {
// // //     const getUser = async () => {
// // //       const { data } = await supabase.auth.getSession()
// // //       const session = data.session
// // //       if (!session?.user) {
// // //         router.replace('/login')
// // //       } else {
// // //         setUserEmail(session.user.email || '')
// // //       }
// // //     }

// // //     getUser()
// // //   }, [])

// // //   return (
// // //     <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-4">
// // //       <div className="backdrop-blur-lg bg-white/10 p-10 rounded-2xl border border-white/20 shadow-xl w-full max-w-2xl animate-fade-in-up">
// // //         <h1 className="text-4xl font-bold mb-4">Welcome to your Dashboard</h1>
// // //         <p className="text-lg text-gray-300 mb-6">Logged in as <span className="font-medium text-white">{userEmail}</span></p>
// // //         <a
// // //           href="/"
// // //           className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
// // //         >
// // //           Go to Home
// // //         </a>
// // //       </div>
// // //     </main>
// // //   )
// // // }
// // // app/dashboard/page.tsx

// 'use client'

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { supabase } from '@/lib/supabaseClient'
// import Link from 'next/link'
// import React from 'react'

// function DashboardCard({ title, description, href }: { title: string; description: string; href: string }) {
//   return (
//     <Link
//       href={href}
//       className="block p-6 rounded-2xl border border-white/10 bg-white/10 hover:bg-purple-800/30 transition transform hover:-translate-y-1 hover:shadow-lg"
//     >
//       <h2 className="text-xl font-semibold mb-2">{title}</h2>
//       <p className="text-sm text-gray-300">{description}</p>
//     </Link>
//   )
// }

// export default function Dashboard() {
//   const [userEmail, setUserEmail] = useState('')
//   const router = useRouter()

//   useEffect(() => {
//     const getUser = async () => {
//       const { data } = await supabase.auth.getSession()
//       const session = data.session
//       if (!session?.user) {
//         router.replace('/login')
//       } else {
//         setUserEmail(session.user.email || '')
//       }
//     }

//     getUser()
//   }, [router])

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-6 py-10">
//       <div className="max-w-5xl mx-auto">
//         <header className="mb-12">
//           <h1 className="text-4xl font-bold">Welcome back 👋</h1>
//           <p className="text-gray-300 mt-2">Logged in as <span className="text-white font-medium">{userEmail}</span></p>
//         </header>

//         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <DashboardCard title="📝 Resume Builder" description="Tailor and upload your resumes easily." href="/resume" />
//           <DashboardCard title="📂 My Resumes" description="View or manage your uploaded resumes." href="/resume/folder" />
//           <DashboardCard title="👤 Profile Settings" description="Manage your account preferences." href="/profile" />
//         </section>
//       </div>
//     </main>
//   )
// // }
// 'use client'

// import { useEffect, useState } from 'react'
// import { supabase } from '@/lib/supabaseClient'
// import { useRouter } from 'next/navigation'
// import { LogOut, FileText, Settings } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'

// export default function DashboardPage() {
//   const [user, setUser] = useState<any>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const getUser = async () => {
//       const { data } = await supabase.auth.getUser()
//       if (data?.user) {
//         setUser(data.user)
//       } else {
//         router.push('/login')
//       }
//     }
//     getUser()
//   }, [])

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//     router.push('/login')
//   }

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white transition-all duration-500">
//       {/* Sidebar */}
//       <aside className="w-64 bg-zinc-900 shadow-lg p-6 hidden md:flex flex-col justify-between">
//         <div>
//           <h2 className="text-3xl font-bold mb-10 text-white tracking-wide">ResumeTailor</h2>
//           <nav className="space-y-6">
//             <Link href="/dashboard" className="block text-lg hover:text-purple-300 transition">Dashboard</Link>
//             <Link href="/resume" className="block text-lg hover:text-purple-300 transition flex items-center gap-2">
//               <FileText size={18} />
//               Resumes
//             </Link>
//             <Link href="/settings" className="block text-lg hover:text-purple-300 transition flex items-center gap-2">
//               <Settings size={18} />
//               Settings
//             </Link>
//           </nav>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="mt-10 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition"
//         >
//           <LogOut size={16} />
//           Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 md:p-12 animate-fade-in-up">
//         <header className="mb-8">
//           <h1 className="text-4xl font-bold mb-2 tracking-tight">Welcome 👋</h1>
//           <p className="text-lg text-gray-300">You're logged in as <strong>{user?.email}</strong></p>
//         </header>

//         <section className="bg-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md transition-all">
//           <h2 className="text-2xl font-semibold mb-4">What would you like to do?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//             <Link href="/resume" className="bg-gradient-to-r from-purple-700 to-indigo-700 p-6 rounded-xl shadow-lg hover:scale-105 transform transition text-white">
//               <h3 className="text-xl font-bold mb-2">Tailor Your Resume</h3>
//               <p>Use AI to adjust your resume to match job descriptions.</p>
//             </Link>
//             <Link href="/resume" className="bg-gradient-to-r from-indigo-700 to-purple-700 p-6 rounded-xl shadow-lg hover:scale-105 transform transition text-white">
//               <h3 className="text-xl font-bold mb-2">View Saved Resumes</h3>
//               <p>Check resumes you have generated or uploaded.</p>
//             </Link>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import React from 'react'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      } else {
        router.push('/login')
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f1b3a] via-[#4c1d95] to-[#0f0c29] text-white px-6 py-8 animate-fadeIn transition-all duration-500">
      <header className="flex flex-col sm:flex-row items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-purple-300 drop-shadow-lg">Dashboard</h1>
          <p className="text-sm text-gray-300 mt-1">Logged in as <strong>{user?.email}</strong></p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg shadow hover:scale-105 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link
          href="/resume"
          className="bg-white/10 backdrop-blur-xl border border-purple-500 hover:border-purple-400 hover:shadow-purple-500/30 text-white p-6 rounded-2xl shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold mb-2">📄 My Resumes</h2>
          <p className="text-sm text-gray-300">Generate, edit, and manage tailored resumes.</p>
        </Link>

        <Link
          href="/profile"
          className="bg-white/10 backdrop-blur-xl border border-purple-500 hover:border-purple-400 hover:shadow-purple-500/30 text-white p-6 rounded-2xl shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold mb-2">⚙️ Profile</h2>
          <p className="text-sm text-gray-300">Update your personal details and settings.</p>
        </Link>

        <Link
          href="/about"
          className="bg-white/10 backdrop-blur-xl border border-purple-500 hover:border-purple-400 hover:shadow-purple-500/30 text-white p-6 rounded-2xl shadow-md transition-all duration-300 transform hover:scale-105"
        >
          <h2 className="text-2xl font-semibold mb-2">📘 About</h2>
          <p className="text-sm text-gray-300">Understand how ResumeTailor works for you.</p>
        </Link>
      </section>
    </div>
  )
}
