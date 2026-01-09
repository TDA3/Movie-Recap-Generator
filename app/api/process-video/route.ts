import { NextRequest, NextResponse } from 'next/server';
import { transcribeAudio } from '@/lib/whisper';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Whisper API has a 25MB file size limit
export const maxDuration = 300; // 5 minutes timeout for processing

export async function POST(request: NextRequest) {
  try {
    // Get the uploaded file from form data
    const formData = await request.formData();
    const file = formData.get('video') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska', 'video/webm'];
    const allowedExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
    const hasValidType = allowedTypes.includes(file.type) || 
                        allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    
    if (!hasValidType) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a video file (mp4, mov, avi, mkv, webm)' },
        { status: 400 }
      );
    }

    // OpenAI Whisper has a 25MB limit
    const whisperLimit = 26214400; // 25MB
    if (file.size > whisperLimit) {
      return NextResponse.json(
        { 
          error: 'Video file is too large for direct transcription. OpenAI Whisper API has a 25MB limit. Please use a shorter video or compress the file.',
          details: 'For production use, consider implementing server-side audio extraction using FFmpeg to extract and compress audio before sending to Whisper API.'
        },
        { status: 413 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Send to Whisper API for transcription
    const transcript = await transcribeAudio(buffer, file.name);

    return NextResponse.json({ 
      transcript,
      filename: file.name,
      size: file.size 
    });

  } catch (error) {
    console.error('Error in process-video route:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process video',
        details: 'Please ensure your OpenAI API key is valid and has access to the Whisper API.'
      },
      { status: 500 }
    );
  }
}
