import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'

export function middleware(request: NextRequest) {
    // Extract the year, month, day, and slug from the old URL pattern
    const oldUrlPattern = /^\/(\d{4})\/(\d{2})\/(\d{2})\/(.*)/
    const match = request.nextUrl.pathname.match(oldUrlPattern)

    if (match) {
        const [, , , , slug] = match
        // Create the new URL with /posts/ prefix
        const newUrl = new URL(`/posts/${slug}`, request.url)

        // Return 301 permanent redirect
        return NextResponse.redirect(newUrl, {
            status: 301,
            headers: {
                // Add cache control header to ensure browsers cache the redirect
                'Cache-Control': 'public, max-age=31536000',
            },
        })
    }

    return NextResponse.next()
}

// Configure matcher for the middleware
export const config = {
    matcher: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug*',
}
