import { NextResponse } from 'next/server';
import { getProducts } from '@/features/products/get-products';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({
      success: true,
      data: products,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
