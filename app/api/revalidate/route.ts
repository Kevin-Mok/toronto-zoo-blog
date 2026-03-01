import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { revalidatePayloadSchema } from '@/lib/validation/schemas';
import { prisma } from '@/lib/prisma/client';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = revalidatePayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  if (parsed.data.token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  for (const tag of parsed.data.tags) {
    revalidateTag(tag);
  }

  if (process.env.DATABASE_URL) {
    try {
      await prisma.revalidationEvent.create({
        data: {
          tags: parsed.data.tags,
        },
      });
    } catch {
      // Revalidation remains successful even when audit persistence is unavailable.
    }
  }

  return NextResponse.json({ ok: true, revalidated: parsed.data.tags });
}
