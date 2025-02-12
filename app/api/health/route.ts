import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
  try {
    const startTime = process.hrtime(); // Start measuring response time

    // 🔹 1. Check Database Connection
    try {
      await db.$queryRaw`SELECT 1`; // Simple query to test DB
    } catch (dbError: unknown) {
      console.error('❌ Database connection failed:', dbError);
      return NextResponse.json(
        {
          status: 'unhealthy',
          error: 'Database connection failed',
          details: (dbError as Error).message,
        },
        { status: 500 }
      );
    }

    // 🔹 2. Check Server Metrics
    const memoryUsage = process.memoryUsage().rss / 1024 / 1024; // Convert to MB
    const cpuLoad = os.loadavg()[0]; // 1-minute average load

    // 🔹 3. Performance & Health Flags
    const highMemoryUsage = memoryUsage > 500; // Example threshold: 500MB
    const highCpuLoad = cpuLoad > 2.5; // Example threshold: High CPU load

    // 🔹 4. Calculate Response Time
    const responseTime = process.hrtime(startTime);
    const responseTimeMs = (
      responseTime[0] * 1e3 +
      responseTime[1] / 1e6
    ).toFixed(2); // Convert to ms

    // 🔹 5. Prepare Response
    const healthData = {
      status: highMemoryUsage || highCpuLoad ? 'warning' : 'healthy',
      uptime: process.uptime(), // Server uptime in seconds
      memoryUsage: `${memoryUsage.toFixed(2)} MB`,
      cpuLoad: cpuLoad.toFixed(2),
      database: 'connected',
      responseTime: `${responseTimeMs} ms`,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error: unknown) {
    console.error('❌ Unexpected error in health check:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Internal server error',
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
