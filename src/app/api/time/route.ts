import { NextResponse } from 'next/server';
import { ILORIN_DEADLINE_TIMESTAMP, isIlorinRegistrationClosed } from '@/data/deadlines';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const now = Date.now();
  return NextResponse.json(
    {
      serverTime: now,
      ilorinClosed: isIlorinRegistrationClosed(now),
      ilorinDeadline: ILORIN_DEADLINE_TIMESTAMP,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    }
  );
}
