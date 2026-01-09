import OpenAI from 'openai';
import { toFile } from 'openai/uploads';

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable. Please add it to your .env.local file.');
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

/**
 * Transcribe audio from a video file using OpenAI Whisper API
 * @param audioFile - File buffer to transcribe
 * @param filename - Original filename for the audio
 * @returns Transcribed text
 */
export async function transcribeAudio(audioFile: Buffer, filename: string): Promise<string> {
  try {
    const openai = getOpenAIClient();
    
    // Convert Buffer to File using OpenAI's toFile utility
    const file = await toFile(audioFile, filename);
    
    // Use OpenAI Whisper API for transcription
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      language: "en", // Auto-detect language, but prefer English
      response_format: "text",
    });
    
    return transcription;
  } catch (error) {
    console.error('Error transcribing audio with Whisper:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to transcribe audio: ${error.message}`);
    }
    throw new Error('Failed to transcribe audio');
  }
}
