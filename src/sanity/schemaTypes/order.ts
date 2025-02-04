export default {
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    { name: "customerName", title: "Customer Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "phoneNumber", title: "Phone Number", type: "string" },
    { name: "city", title: "City", type: "string" },
    { name: "address", title: "Address", type: "text" },
    { name: "status", title: "Status", type: "string" },
    { name: "totalPrice", title: "Total Order Price", type: "number" }, // Total order price
    {
      name: "items",
      title: "Cart Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Product Name", type: "string" },
            { name: "quantity", title: "Quantity", type: "number" },
            { name: "price", title: "Price", type: "number" },
            {
              name: "totalPrice",
              title: "Total Price (Item)",
              type: "number", // Total price for this item (quantity * price)
            },
            {
              name: "image",
              title: "Product Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
};