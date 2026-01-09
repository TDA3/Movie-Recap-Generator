'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

interface CatchyHooksProps {
  hooks: string[];
}

export default function CatchyHooks({ hooks }: CatchyHooksProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    try {
      await copyToClipboard(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (hooks.length === 0) return null;

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h2 className="text-xl font-semibold text-white">
          Catchy Hooks <span className="text-gray-500 text-sm">(အဖွင့်စကားလုံးများ)</span>
        </h2>
      </div>

      <div className="space-y-3">
        {hooks.map((hook, index) => (
          <div key={index} className="bg-gray-700 rounded-lg p-4 flex justify-between items-start">
            <p className="text-white flex-1 pr-4">{hook}</p>
            <button
              onClick={() => handleCopy(hook, index)}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex-shrink-0"
            >
              {copiedIndex === index ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
