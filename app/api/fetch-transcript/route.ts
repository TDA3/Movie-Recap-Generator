import { NextRequest, NextResponse } from 'next/server';
import { fetchYoutubeTranscript } from '@/lib/youtube';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    const transcript = await fetchYoutubeTranscript(url);

    return NextResponse.json({ transcript });
  } catch (error) {
    console.error('Error in fetch-transcript route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch transcript' },
      { status: 500 }
    );
  }
}
