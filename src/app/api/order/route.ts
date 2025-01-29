import { NextResponse } from 'next/server';
import {client} from '@/sanity/lib/client' // Adjust the import to point to the right file

export async function POST(request: Request) {
  const orderData = await request.json();

  try {
    // Create the order in Sanity
    const order = await client.create({
      _type: 'order',
      customerName: orderData.name,
      email: orderData.email,
      city: orderData.city,
      address: orderData.address,
      phoneNumber: orderData.phoneNumber,
      cartItems: orderData.cartItems,
      totalPrice: orderData.totalPrice,
    });

    return NextResponse.json({ message: 'Order placed successfully!', order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Failed to place order', error }, { status: 500 });
  }
}