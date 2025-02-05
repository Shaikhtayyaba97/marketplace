export default {
  name: 'order',
  type: 'document',
  title: 'Order',
  fields: [
    {
      name: 'customerName',
      type: 'string',
      title: 'Customer Name',
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
    },
    {
      name: 'city',
      type: 'string',
      title: 'City',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address',
    },
    {
      name: 'phoneNumber',
      type: 'string',
      title: 'Phone Number',
    },
    {
      name: 'cartItems',
      type: 'array',
      title: 'Cart Items',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Product Name',
            },
            {
              name: 'price',
              type: 'number',
              title: 'Product Price',
            },
            {
              name: 'quantity',
              type: 'number',
              title: 'Quantity',
            },
            {
              name: 'uniqueKey', // Changed from _key to uniqueKey
              type: 'string',
              title: 'Unique Key',
            },
          ],
        },
      ],
    },
    {
      name: 'totalPrice',
      type: 'number',
      title: 'Total Price',
    },
  ],
};