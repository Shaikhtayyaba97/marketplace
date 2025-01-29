import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client'; // Make sure to configure your sanity client
import order from '@/sanity/schemaTypes/order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { customerName, email, address, cartItems, totalPrice } = req.body;

    try {
      // Create order document in Sanity
      const order = {
        _type: 'order',
        customerName,
        email,
        address,
        cartItems,
        totalPrice,
      };

      // Save to Sanity
      const result = await client.create(order);

      res.status(200).json({ message: 'Order placed successfully', orderId: result._id });
    } catch (error) {
      res.status(500).json({ message: 'Error placing order', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}