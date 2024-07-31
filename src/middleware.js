import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const pathname = request.nextUrl.pathname

  // Add a custom header with the current path
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)
  
  return response
}