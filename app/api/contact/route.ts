import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { contactPayloadSchema } from '@/lib/validation/schemas';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactPayloadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ ok: false, error: 'DATABASE_URL is not configured' }, { status: 503 });
  }

  const saved = await prisma.contactSubmission
    .create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        message: parsed.data.message,
      },
    })
    .catch(() => null);

  if (!saved) {
    return NextResponse.json(
      { ok: false, error: 'Contact storage unavailable. Ensure Prisma migrations are applied.' },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, id: saved.id });
}
