'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import InputSource from '@/components/InputSource';
import TranscriptPreview from '@/components/TranscriptPreview';
import CatchyHooks from '@/components/CatchyHooks';
import RecapScript from '@/components/RecapScript';

export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [hooks, setHooks] = useState<string[]>([]);
  const [script, setScript] = useState('');
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateScript = async () => {
    if (!transcript.trim()) {
      setError('Please provide a transcript first');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      // Generate both script and hooks in parallel
      const [scriptResponse, hooksResponse] = await Promise.all([
        fetch('/api/generate-script', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript }),
        }),
        fetch('/api/generate-hooks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript }),
        }),
      ]);

      const scriptData = await scriptResponse.json();
      const hooksData = await hooksResponse.json();

      if (!scriptResponse.ok) {
        throw new Error(scriptData.error || 'Failed to generate script');
      }
      if (!hooksResponse.ok) {
        throw new Error(hooksData.error || 'Failed to generate hooks');
      }

      setScript(scriptData.script);
      setHooks(hooksData.hooks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setGenerating(false);
    }
  };

  const handleClearAll = () => {
    setTranscript('');
    setHooks([]);
    setScript('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Header />

        <div className="mt-8">
          <InputSource onTranscriptFetched={setTranscript} />

          <TranscriptPreview 
            transcript={transcript} 
            onTranscriptChange={setTranscript}
          />

          {/* Generate Button */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleGenerateScript}
              disabled={generating || !transcript.trim()}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              {generating ? 'Generating...' : 'Generate Burmese Script'}
            </button>
            <button
              onClick={handleClearAll}
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/30 border border-red-600 text-red-400 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <CatchyHooks hooks={hooks} />

          <RecapScript script={script} onScriptChange={setScript} />
        </div>
      </div>
    </div>
  );
}
