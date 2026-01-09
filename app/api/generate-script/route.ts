import { NextRequest, NextResponse } from 'next/server';
import { generateBurmeseScript } from '@/lib/openai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json();

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      );
    }

    const script = await generateBurmeseScript(transcript);

    return NextResponse.json({ script });
  } catch (error) {
    console.error('Error in generate-script route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate script' },
      { status: 500 }
    );
  }
}
