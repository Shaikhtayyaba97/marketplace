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
              name: 'product',
              type: 'reference',
              to: [{ type: 'product' }],
              title: 'Product',
            },
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
              name: 'image',
              title: ' Image',
              type: 'image',
              options: {
                hotspot: true,
              },
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