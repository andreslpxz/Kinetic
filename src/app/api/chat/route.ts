import { createGroq } from '@ai-sdk/groq';
import { streamText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, model, context } = await req.json();

  const fullSystemPrompt = `${system}\n\nYou are part of a drag-and-drop application. Current UI state: ${JSON.stringify(context)}. Use this context to answer questions about the app or interact with its components.`;

  const result = await streamText({
    model: groq(model || 'moonshotai/kimi-k2-instruct-0905') as any,
    messages,
    system: fullSystemPrompt,
  });

  return result.toDataStreamResponse();
}
