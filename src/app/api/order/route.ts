import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const orderData = await request.json();

  console.log("🛠 Received Order Data:", JSON.stringify(orderData, null, 2));

  try {
    // Check if cartItems exist
    if (!orderData.cartItems || !Array.isArray(orderData.cartItems)) {
      console.error("❌ cartItems is missing or invalid!");
      return NextResponse.json({ message: 'Invalid cart items' }, { status: 400 });
    }

    console.log("🔹 Raw cartItems received:", orderData.cartItems);

    // Add unique keys to each cart item
    const cartItemsWithKeys = orderData.cartItems.map((item: any) => ({
      ...item,
      _key: uuidv4(),
    }));

    console.log("✅ Cart Items with _key before saving:", cartItemsWithKeys);

    // ✅ Order ko Sanity me save karein
    const order = await client.create({
      _type: 'order',
      customerName: orderData.name,
      email: orderData.email,
      city: orderData.city,
      address: orderData.address,
      phoneNumber: orderData.phoneNumber,
      cartItems: cartItemsWithKeys,
      totalPrice: orderData.totalPrice,
    });

    console.log("✅ Order successfully saved in Sanity:", order);

    // ✅ Stock update karein har product ka
    for (const item of orderData.cartItems) {
      const productId = item.id; // Product ka ID
      const quantity = item.quantity; // Kitna order hua hai

      await client
        .patch(productId) // Sanity me product ko update karein
        .dec({ stock: quantity }) // Stock kam karein
        .commit();

      console.log(`🔻 Reduced stock for Product ID: ${productId} by ${quantity}`);
    }

    return NextResponse.json({ message: 'Order placed successfully!', order });

  } catch (error) {
    console.error('❌ Error creating order:', error);
    return NextResponse.json({ message: 'Failed to place order', error }, { status: 500 });
  }
}