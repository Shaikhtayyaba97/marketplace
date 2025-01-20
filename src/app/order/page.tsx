'use client';
import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client'; // Sanity client ko import karein

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await client.fetch(`*[_type == "orderDetails"]`);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {orders.map((order) => (
        <div key={order._id}>
          <h3>Order ID: {order.orderId}</h3>
          <p>Customer Name: {order.customerName}</p>
          <p>Total Amount: {order.totalAmount}</p>
          <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;