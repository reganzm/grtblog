import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    // 如果不是以 http 开头的，就加上协议
    const response = await fetch(url.startsWith('http') ? url : `https://${url}`);
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
    console.log('Failed to fetch site info');
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch site info' }, { status: 500 });
  }
}
