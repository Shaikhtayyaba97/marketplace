import { client } from '@/sanity/lib/client';
import { NextApiRequest, NextApiResponse } from 'next';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderData {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  cartItems: CartItem[];
  totalPrice: number;
  createdAt: string;
  orderStatus: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, address, phoneNumber, cartItems, totalPrice }: OrderData = req.body;

    try {
      // Log to check the incoming data
      console.log("Received Order Data:", req.body);

      const orderData = {
        _type: 'orderdetail',
        name,
        email,
        address,
        phoneNumber,
        cartItems,
        totalPrice,
        createdAt: new Date().toISOString(),
        orderStatus: 'pending',
      };

      const response = await client.create(orderData);

      // Log the response from Sanity
      console.log("Sanity Response:", response);

      res.status(200).json({ message: "Order placed successfully", order: response });
    } catch (error: any) {
      // Error handling with detailed message
      console.error("Error placing order:", error);

      // Check if error is an instance of Error to access the message property
      if (error instanceof Error) {
        res.status(500).json({ error: `Something went wrong: ${error.message}` });
      } else {
        res.status(500).json({ error: "Unknown error occurred" });
      }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}