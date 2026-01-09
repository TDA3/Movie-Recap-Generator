import { NextRequest, NextResponse } from 'next/server';
import { generateCatchyHooks } from '@/lib/openai';

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

    const hooks = await generateCatchyHooks(transcript);

    return NextResponse.json({ hooks });
  } catch (error) {
    console.error('Error in generate-hooks route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate hooks' },
      { status: 500 }
    );
  }
}
