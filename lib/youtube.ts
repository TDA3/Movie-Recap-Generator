import { YoutubeTranscript } from 'youtube-transcript';

export async function fetchYoutubeTranscript(url: string): Promise<string> {
  try {
    // Extract video ID from URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      throw new Error('Invalid YouTube URL');
    }

    // Fetch transcript
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    // Combine all transcript text
    const fullTranscript = transcript.map(item => item.text).join(' ');
    
    return fullTranscript;
  } catch (error) {
    console.error('Error fetching YouTube transcript:', error);
    throw new Error('Failed to fetch YouTube transcript. The video may not have captions available.');
  }
}

function extractVideoId(url: string): string | null {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

export function isValidYoutubeUrl(url: string): boolean {
  return extractVideoId(url) !== null;
}
