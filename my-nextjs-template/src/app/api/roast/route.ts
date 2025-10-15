// Next.js API Route - Proxy to Flask backend for GitHub roasting
import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.username || typeof body.username !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: GitHub username is required', success: false },
        { status: 400 }
      );
    }

    // Call Flask backend for roasting
    const flaskResponse = await fetch(`${config.flaskApiUrl}/api/roast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(config.apiTimeout),
    });

    if (!flaskResponse.ok) {
      throw new Error(`Flask API error: ${flaskResponse.status}`);
    }

    const data = await flaskResponse.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('API Route Error:', error);
    
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timeout', success: false },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to generate roast',
        success: false,
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
