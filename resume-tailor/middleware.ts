// // middleware.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { createServerClient } from '@supabase/ssr'

// export const runtime = 'nodejs'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll: () => req.cookies.getAll(),
//         setAll: (cookies) => {
//           cookies.forEach(({ name, value, options }) =>
//             res.cookies.set(name, value, options)
//           )
//         },
//       },
//     }
//   )

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   if (!user && req.nextUrl.pathname !== '/login') {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }

//   return res
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// }
// middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { createServerClient } from '@supabase/ssr'

// export const runtime = 'nodejs'

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next()

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get(name) {
//           return req.cookies.get(name)?.value
//         },
//         set(name, value, options) {
//           res.cookies.set(name, value, options)
//         },
//         remove(name) {
//           res.cookies.set(name, '', { maxAge: -1 })
//         },
//       },
//     }
//   )

//   const { data: { user } } = await supabase.auth.getUser()

//   if (!user && req.nextUrl.pathname !== '/login') {
//     return NextResponse.redirect(new URL('/login', req.url))
//   }

//   return res
// }

// export const config = {
//   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
// }
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  return NextResponse.next();
}
