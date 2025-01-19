import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';

export async function POST(request: Request) {
  try {
    // Customer data from request body
    const { customerName, email, phone, address, cartItems, totalPrice } = await request.json();

    // Validate required fields
    if (!customerName || !email || !cartItems || !totalPrice) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    console.log('Customer Data:', customerName, email, phone, address);
    console.log('Cart Items:', cartItems);
    console.log('Total Price:', totalPrice);

    // Sanity order creation
    const order = await client.create({
      _type: 'order',
      customerName,
      email,
      phone,
      address,
      cartItems: cartItems.map((item: any) => ({
        slug: item.slug, // Product slug
        name: item.name, // Product name
        category: item.category, // Product category
        quantity: item.quantity, // Quantity ordered
        price: item.price, // Product price
      })),
      totalPrice,
      status: 'pending', // Default status
      createdAt: new Date().toISOString(), // Timestamp
    });

    // Success response
    return NextResponse.json({ message: 'Order placed successfully!', order });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: 'Error placing order', error: error.message }, { status: 500 });
  }
}