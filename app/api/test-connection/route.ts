import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Attempt a simple database query
    await prisma.$connect();
    
    // Log success messages
    console.log('Database connection successful!');
    console.log('Database URL:', process.env.DATABASE_URL?.substring(0, 20) + '...');

    return NextResponse.json({ 
      status: 'success', 
      message: 'Database connection successful',
      dbType: 'PostgreSQL'
    });
  } catch (error) {
    console.error('Database connection failed:', error);
    
    return NextResponse.json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 