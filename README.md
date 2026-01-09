# Movie Recap Generator

A complete web application that allows users to generate Burmese movie recap scripts from YouTube videos or uploaded video files.

## Features

- **YouTube Integration**: Fetch transcripts directly from YouTube videos
- **Video Upload Support**: Upload video files (up to 1GB)
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
   - Paste a YouTube URL and click "Fetch" to extract the transcript
   - Or upload a video file (note: video processing is currently limited)
   - Or manually paste a transcript

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
- **AI**: OpenAI GPT-4
- **YouTube**: youtube-transcript library
- **Deployment**: Vercel-ready

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── fetch-transcript/route.ts  # YouTube transcript fetching
│   │   ├── generate-script/route.ts   # Burmese script generation
│   │   └── generate-hooks/route.ts    # Catchy hooks generation
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
│   ├── youtube.ts                     # YouTube utilities
│   └── utils.ts                       # Common utilities
└── package.json
```

## Environment Variables

- `OPENAI_API_KEY` (Required): Your OpenAI API key for GPT-4 access
- `YOUTUBE_API_KEY` (Optional): YouTube Data API key (currently not used)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
