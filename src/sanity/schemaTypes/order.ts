// Sanity Schema for Order (orderdetail)
export default {
    name: 'orderdetail',
    type: 'document',
    title: 'Order Details',
    fields: [
      { name: 'name', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'address', type: 'text' },
      { name: 'phoneNumber', type: 'string' },
      { name: 'cartItems', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }] },
      { name: 'totalPrice', type: 'number' },
      { name: 'createdAt', type: 'datetime' },
      { name: 'orderStatus', type: 'string', options: { list: ['pending', 'completed', 'canceled'], layout: 'radio' } }
    ]
  };