import { NextResponse } from 'next/server';

// Simple in-memory rate store (for a single server instance)
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

export async function POST(req: Request) {
  try {
    // SECURITY CHECK 28: Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
    const now = Date.now();
    const limitRecord = rateLimitMap.get(ip) || { count: 0, timestamp: now };
    
    if (now - limitRecord.timestamp > RATE_LIMIT_WINDOW) {
      limitRecord.count = 1;
      limitRecord.timestamp = now;
    } else {
      limitRecord.count++;
      if (limitRecord.count > MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
      }
    }
    rateLimitMap.set(ip, limitRecord);

    const body = await req.json();
    const { text } = body;

    // SECURITY CHECK 34: APIs + User Input Validation
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: "Invalid input payload" }, { status: 400 });
    }
    
    // Strict Length Limit to prevent memory exhaustion / DoS
    if (text.length > 5000) {
      return NextResponse.json({ error: "Input exceeds maximum allowed length of 5000 characters." }, { status: 413 });
    }
    
    // Basic Sanitization (strip potentially dangerous system commands if sent to an LLM)
    const sanitizedText = text.replace(/(rm -rf|mkfifo|wget|curl)/gi, "[REDACTED]");

    // In a real implementation, this would call the Gemini API:
    // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    // const prompt = `Parse this client request into a JSON object with: intent (New Project or Scope Creep), estimatedHours, suggestedQuote, summary, clientTone. \n\nRequest: ${text}`;
    // const result = await model.generateContent(prompt);
    // const parsedData = JSON.parse(result.response.text());

    // Mocking the AI response for demonstration
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate AI latency
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Configuration Required: Gemini API key is missing. Cannot parse request." },
        { status: 501 }
      );
    }
    
    // TODO: Implement actual Gemini SDK call when key is provided
    return NextResponse.json(
      { error: "AI Parsing is not yet fully implemented with the real SDK." },
      { status: 501 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Failed to parse request" }, { status: 500 });
  }
}
