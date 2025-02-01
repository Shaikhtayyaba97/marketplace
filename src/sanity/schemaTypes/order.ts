export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'cartItems',
      title: 'Cart Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'productId',
              title: 'Product ID',
              type: 'string',
            },
            {
              name: 'name',
              title: 'Product Name',
              type: 'string',
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
            },
            
            {
              name: 'image',
              title: 'Product Image',
              type: 'string',
            },
            {
              name: 'uniqueId',
              title: 'Unique ID',
              type: 'string', // We will use this field for the unique key
            },
          ],
        },
      ],
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
    },
    {
      name: 'orderDate',
      tittle: 'Order Date',
      type: 'datetime'
    },
    { name: "status", type: "string", title: "Order Status", initialValue: "Pending" },
    
  ],
};