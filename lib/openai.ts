import OpenAI from 'openai';

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY environment variable');
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export async function generateBurmeseScript(transcript: string): Promise<string> {
  try {
    const openai = getOpenAIClient();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert in creating engaging movie recap scripts in Burmese (Myanmar language). 
Your task is to translate and transform English movie transcripts into entertaining Burmese recap scripts.
Format the script with timestamps and sections like:
### **A New Beginning (08:14 - 08:35)**

The script should be written in a storytelling format that is engaging and easy to follow.
Use natural Burmese language that sounds native and compelling.`
        },
        {
          role: "user",
          content: `Please create a movie recap script in Burmese from this transcript:\n\n${transcript}`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating Burmese script:', error);
    throw new Error('Failed to generate Burmese script');
  }
}

export async function generateCatchyHooks(transcript: string): Promise<string[]> {
  try {
    const openai = getOpenAIClient();
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert in creating catchy, engaging hook sentences in Burmese for social media.
Create 3-5 short, compelling hook sentences that will grab attention and make people want to watch the video.
Each hook should be on a new line and be a complete, standalone sentence in Burmese.
Make them dramatic, intriguing, or emotionally engaging.`
        },
        {
          role: "user",
          content: `Create catchy hook sentences in Burmese for this movie transcript:\n\n${transcript.substring(0, 1000)}`
        }
      ],
      temperature: 0.8,
      max_tokens: 500,
    });

    const content = completion.choices[0].message.content || '';
    return content.split('\n').filter(line => line.trim().length > 0);
  } catch (error) {
    console.error('Error generating catchy hooks:', error);
    throw new Error('Failed to generate catchy hooks');
  }
}
