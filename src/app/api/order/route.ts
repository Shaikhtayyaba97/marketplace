import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const orderData = await request.json();

  console.log("🛠 Received Order Data:", orderData);

  try {
    // Check if cartItems exist
    if (!orderData.cartItems || !Array.isArray(orderData.cartItems)) {
      console.error("❌ cartItems is missing or invalid!");
      return NextResponse.json({ message: 'Invalid cart items' }, { status: 400 });
    }

    // Add unique keys to each cart item
    const cartItemsWithKeys = orderData.cartItems.map((item: any) => ({
      ...item,
      _key: uuidv4(), // Generate unique key
    }));

    console.log("✅ Cart Items with _key:", cartItemsWithKeys);

    // Create the order in Sanity
    const order = await client.create({
      _type: 'order',
      customerName: orderData.name,
      email: orderData.email,
      city: orderData.city,
      address: orderData.address,
      phoneNumber: orderData.phoneNumber,
      cartItems: cartItemsWithKeys, // Ensure _key is added
      totalPrice: orderData.totalPrice,
    });

    return NextResponse.json({ message: 'Order placed successfully!', order });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    return NextResponse.json({ message: 'Failed to place order', error }, { status: 500 });
  }
}