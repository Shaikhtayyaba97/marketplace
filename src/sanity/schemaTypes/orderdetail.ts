import { Rule } from 'sanity';

export default {
  name: 'orderDetails',
  title: 'Order Details',
  type: 'document',
  fields: [
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(3).max(100), // Required and length validation
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email(), // Required and email format
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(10).max(15), // Required and length validation
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().min(3).max(10), // Required and min/max validation
    },
    {
      name: 'cartItems',
      title: 'Cart Items',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1), // Ensure there is at least one cart item
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().positive(), // Required and positive number validation
    },
  ],
};