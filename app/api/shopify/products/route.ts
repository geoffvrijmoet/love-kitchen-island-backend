import { NextResponse } from 'next/server';
import { getShopifyProducts } from '@/lib/shopify';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const session = await auth();
  
  if (!session?.userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const products = await getShopifyProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return new NextResponse('Error fetching products', { status: 500 });
  }
} 