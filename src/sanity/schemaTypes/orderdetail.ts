// schemas/order.ts
export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { name: 'name', title: 'Customer Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'address', title: 'Address', type: 'text' },
    { name: 'phone', title: 'Phone', type: 'string' },
    { name: 'products', title: 'Products', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }] },
    { name: 'totalAmount', title: 'Total Amount', type: 'number' },
    { name: 'status', title: 'Order Status', type: 'string', options: { list: ['pending', 'shipped', 'delivered'] } },
  ],
};