'use client';

interface TranscriptPreviewProps {
  transcript: string;
  onTranscriptChange: (transcript: string) => void;
}

export default function TranscriptPreview({ transcript, onTranscriptChange }: TranscriptPreviewProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Transcript Preview</h2>
      <textarea
        value={transcript}
        onChange={(e) => onTranscriptChange(e.target.value)}
        placeholder="Content will appear here after fetching/uploading or paste manually..."
        className="w-full h-64 bg-gray-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
      />
      <p className="text-gray-500 text-xs mt-2">
        You can edit or paste your transcript directly here.
      </p>
    </div>
  );
}
