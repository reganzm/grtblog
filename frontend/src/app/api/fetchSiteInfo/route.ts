import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const icon = $('link[rel="icon"]').attr('href') || `${url}/favicon.ico`;
    const name = $('title').text() || '';
    const title = $('meta[property="og:title"]').attr('content') || '';
    const subtitle = $('meta[name="description"]').attr('content') || '';

    return NextResponse.json({
      icon: icon.startsWith('http') ? icon : new URL(icon, url).href,
      name,
      title,
      subtitle,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch site info' }, { status: 500 });
  }
}
