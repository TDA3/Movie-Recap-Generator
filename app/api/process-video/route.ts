import { NextRequest, NextResponse } from 'next/server';
import { transcribeAudio } from '@/lib/whisper';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Increase max size to handle large video files (1GB)
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

    // Validate file size (max 1GB = 1073741824 bytes)
    const maxSize = 1073741824;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 1GB limit' },
        { status: 400 }
      );
    }

    // OpenAI Whisper has a 25MB limit, but we'll try to process the file
    // For files larger than 25MB, we might need to implement chunking or audio extraction
    // For now, we'll let OpenAI handle it and provide appropriate error messages
    if (file.size > 26214400) { // 25MB
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
