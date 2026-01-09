'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

interface RecapScriptProps {
  script: string;
  onScriptChange: (script: string) => void;
}

export default function RecapScript({ script, onScriptChange }: RecapScriptProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(script);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!script) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          <h2 className="text-xl font-semibold text-white">
            Recap Script <span className="text-gray-500 text-sm">(Editable)</span>
          </h2>
        </div>
        <button
          onClick={handleCopy}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Script'}
        </button>
      </div>

      <textarea
        value={script}
        onChange={(e) => onScriptChange(e.target.value)}
        className="w-full h-96 bg-gray-700 text-white rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 resize-none font-mono text-sm"
      />
    </div>
  );
}
