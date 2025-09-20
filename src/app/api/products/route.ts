import { NextResponse } from 'next/server';
import { SAMPLE_PRODUCTS } from '@/data/products';

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    return NextResponse.json({
      success: true,
      data: SAMPLE_PRODUCTS,
      message: 'Products fetched successfully'
    });
  } catch {
    // @TODO: Log error and Handle error
    return NextResponse.json(
      {
        success: false,
        data: null,
        message: 'Failed to fetch products'
      },
      { status: 500 }
    );
  }
}
