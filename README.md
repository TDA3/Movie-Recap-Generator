# Movie Recap Generator

A complete web application that allows users to generate Burmese movie recap scripts from YouTube videos or uploaded video files.

## Features

- **YouTube Integration**: Fetch transcripts directly from YouTube videos
- **Video Upload Support**: Upload video files and automatically transcribe using OpenAI Whisper
  - Supports common video formats: mp4, mov, avi, mkv, webm
  - Maximum file size: 25MB (Whisper API limit)
  - Automatic speech-to-text transcription
- **Transcript Preview**: View and edit transcripts before generating
- **AI-Powered Translation**: Generate Burmese scripts using OpenAI GPT-4
- **Catchy Hooks**: Generate engaging Burmese hook sentences for social media
- **Editable Scripts**: Edit and customize the generated recap scripts
- **Dark Theme UI**: Modern, responsive design with red accents
- **Copy Functionality**: Easy copy-to-clipboard for hooks and scripts

## Getting Started

### Prerequisites

- Node.js 18+ installed
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/TDA3/Movie-Recap-Generator.git
cd Movie-Recap-Generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: The same OpenAI API key is used for both GPT-4 script generation and Whisper API video transcription.

### Running the Application

Development mode:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

Build for production:
```bash
npm run build
npm start
```

## Usage

1. **Input Source**: 
   - **YouTube URL**: Paste a YouTube URL and click "Fetch" to extract the transcript
   - **Video Upload**: Upload a video file (mp4, mov, avi, mkv, webm - max 25MB) for automatic transcription using OpenAI Whisper
   - **Manual Input**: Or manually paste a transcript directly into the preview area

2. **Transcript Preview**: 
   - Review and edit the fetched/uploaded transcript
   - You can directly paste content here

3. **Generate Script**: 
   - Click "Generate Burmese Script" to create both the recap script and catchy hooks
   - Wait for the AI to generate content (may take 30-60 seconds)

4. **Catchy Hooks**: 
   - Review the generated Burmese hook sentences
   - Click "Copy" on any hook to copy it to clipboard

5. **Recap Script**: 
   - Edit the generated script as needed
   - Click "Copy Script" to copy the entire script

6. **Clear All**: 
   - Reset all inputs and outputs to start fresh

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: OpenAI GPT-4 (script generation), OpenAI Whisper (video transcription)
- **YouTube**: youtube-transcript library
- **Deployment**: Vercel-ready

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── fetch-transcript/route.ts  # YouTube transcript fetching
│   │   ├── generate-script/route.ts   # Burmese script generation
│   │   ├── generate-hooks/route.ts    # Catchy hooks generation
│   │   └── process-video/route.ts     # Video upload & transcription
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Main page
├── components/
│   ├── Header.tsx                     # App header
│   ├── InputSource.tsx                # URL/file input
│   ├── TranscriptPreview.tsx          # Transcript viewer
│   ├── CatchyHooks.tsx                # Hooks display
│   └── RecapScript.tsx                # Script editor
├── lib/
│   ├── openai.ts                      # OpenAI integration
│   ├── whisper.ts                     # Whisper API integration
│   ├── youtube.ts                     # YouTube utilities
│   └── utils.ts                       # Common utilities
└── package.json
```

## Environment Variables

- `OPENAI_API_KEY` (Required): Your OpenAI API key for GPT-4 and Whisper API access
  - Used for generating Burmese scripts and hooks
  - Used for transcribing uploaded video files
  - Get your key from: https://platform.openai.com/api-keys
- `YOUTUBE_API_KEY` (Optional): YouTube Data API key (currently not used, youtube-transcript library works without it)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
