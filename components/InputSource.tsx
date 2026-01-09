'use client';

import { useState } from 'react';

interface InputSourceProps {
  onTranscriptFetched: (transcript: string) => void;
}

export default function InputSource({ onTranscriptFetched }: InputSourceProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState<string>('');

  const handleFetchTranscript = async () => {
    if (!youtubeUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/fetch-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: youtubeUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch transcript');
      }

      onTranscriptFetched(data.transcript);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transcript');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setError('');
    setUploadProgress('');

    // Check for 25MB Whisper API limit
    const whisperLimit = 26214400; // 25MB
    if (file.size > whisperLimit) {
      setError('Video file is too large for direct transcription. OpenAI Whisper API has a 25MB limit. Please use a shorter video or compress the file.');
      e.target.value = ''; // Reset file input
      return;
    }

    setLoading(true);
    setUploadProgress('Uploading video...');

    try {
      // Create form data for upload
      const formData = new FormData();
      formData.append('video', file);

      setUploadProgress('Processing video...');

      // Send to our API endpoint
      const response = await fetch('/api/process-video', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process video');
      }

      setUploadProgress('Transcription complete!');
      onTranscriptFetched(data.transcript);
      setError('');
      
      // Clear progress message after 2 seconds
      setTimeout(() => setUploadProgress(''), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process video');
      setUploadProgress('');
    } finally {
      setLoading(false);
      e.target.value = ''; // Reset file input
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <svg className="w-6 h-6 text-red-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        <h2 className="text-xl font-semibold text-white">Input Source</h2>
      </div>

      {/* YouTube URL Input */}
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-medium mb-2">
          YouTube URL
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="Paste YouTube video URL here..."
            className="flex-1 bg-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            onClick={handleFetchTranscript}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 py-2 rounded font-medium transition-colors"
          >
            {loading ? 'Fetching...' : 'Fetch'}
          </button>
        </div>
      </div>

      {/* File Upload */}
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-medium mb-2">
          Or Upload Video File
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileUpload}
          disabled={loading}
          className="block w-full text-sm text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-medium
            file:bg-red-600 file:text-white
            hover:file:bg-red-700
            file:cursor-pointer cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="text-gray-500 text-xs mt-2">
          Supported formats: mp4, mkv, avi, mov, webm. Max file size: 25MB (Whisper API limit).
        </p>
      </div>

      {/* Upload Progress */}
      {uploadProgress && (
        <div className="mb-4 bg-blue-900/30 border border-blue-600 text-blue-400 px-4 py-3 rounded">
          {uploadProgress}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/30 border border-red-600 text-red-400 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
