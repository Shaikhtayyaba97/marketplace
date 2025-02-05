import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client'; // Adjust the import to point to the right file
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique keys

export async function POST(request: Request) {
  const orderData = await request.json();

  try {
    // Add unique keys to each cart item
    const cartItemsWithKeys = orderData.cartItems.map((item: any) => ({
      ...item,
      _key: uuidv4(), // Generate a unique key for each item
    }));

    // Create the order in Sanity
    const order = await client.create({
      _type: 'order',
      customerName: orderData.name,
      email: orderData.email,
      city: orderData.city,
      address: orderData.address,
      phoneNumber: orderData.phoneNumber,
      cartItems: cartItemsWithKeys, // Use updated cart items with keys
      totalPrice: orderData.totalPrice,
    });

    return NextResponse.json({ message: 'Order placed successfully!', order });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Failed to place order', error }, { status: 500 });
  }
}