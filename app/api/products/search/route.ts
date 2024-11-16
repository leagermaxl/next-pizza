import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // console.log(req.nextUrl);
  const query = req.nextUrl.searchParams.get('query') || '';

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
  });

  return NextResponse.json(products);
}