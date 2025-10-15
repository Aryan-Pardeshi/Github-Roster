// Health check endpoint
import { NextResponse } from 'next/server';
import { config } from '@/lib/config';

export async function GET() {
  try {
    // Check Flask backend health
    const flaskResponse = await fetch(`${config.flaskApiUrl}/health`, {
      signal: AbortSignal.timeout(5000),
    });
    
    const isFlaskHealthy = flaskResponse.ok;
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        nextjs: 'healthy',
        flask: isFlaskHealthy ? 'healthy' : 'unhealthy',
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'degraded',
      timestamp: new Date().toISOString(),
      services: {
        nextjs: 'healthy',
        flask: 'unreachable',
      }
    }, { status: 503 });
  }
}
