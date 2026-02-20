import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

const ALLOWED_PDFS = [
  'Politique_annulation_FR.pdf',
  'Cancellation_Policy_EN.pdf',
] as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;
  if (!filename || !ALLOWED_PDFS.includes(filename as (typeof ALLOWED_PDFS)[number])) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  try {
    const filePath = path.join(process.cwd(), 'public', 'documents', filename);
    const buffer = await readFile(filePath);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
