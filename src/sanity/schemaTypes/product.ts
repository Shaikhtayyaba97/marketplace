export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
         maxLength:200,
      },
      },
      
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            { title: 'Lipstick', value: 'lipstick' },
            { title: 'Face Powder', value: 'facepowder' },
            { title: 'Nail Paint', value: 'nailpaint' },
            { title: 'Foundation', value: 'foundation' },
            { title: 'Blush', value: 'blush' },
            { title: 'Male Ring', value: 'malering' },
            { title: 'Women Ring', value: 'womenring' },
            { title: 'Men Watch', value: 'menwatch' },
            { title: 'Women Watch', value: 'womenwatch' },
            { title: 'Kids Watch', value: 'kidswatch' },
            { title: 'Men Bracelet', value: 'menbraclet' },
            { title: 'Women Bracelet', value: 'womenbraclet' },
            { title: 'Men Locket', value: 'menlocket' },
            { title: 'Women Locket', value: 'womenlocket' },
            { title: 'Fake Nails', value: 'fakenails' },
            { title: 'Men Shampoo', value: 'mshampoo' },
            { title: 'Women Shampoo', value: 'wshampoo' },
            { title: 'Kids Shampoo', value: 'kshampoo' },
            { title: 'Men Cream', value: 'mcream' },
            { title: 'Women Cream', value: 'wcream' },
            { title: 'Facial', value: 'facial' },
            { title: 'Face Mask', value: 'facemask' },
            { title: 'Men Face Wash', value: 'mfacewash' },
            { title: 'Face Wash', value: 'facewash' },
            { title: 'Men Perfume', value: 'mperfume' },
            { title: 'Women Perfume', value: 'wperfume' },
            { title: 'Men Body Spray', value: 'mbodyspray' },
            { title: 'Women Body Spray', value: 'wbodyspray' },
            { title: 'Pads', value: 'pads' },
            { title: 'Men Undergarments', value: 'mundergarments' },
            { title: 'Women Undergarments', value: 'wundergarments' },
            { title: 'Men Razor', value: 'mrazor' },
            { title: 'Women Razor', value: 'wrazor' },
            { title: 'Cufflink', value: 'cufflink' },
            { title: 'Wallet', value: 'wallet' },
            { title: 'Hair Gel', value: 'hairgel' },
            { title: 'Soaks', value: 'soaks' },
            { title: 'Kids Lotion', value: 'klotion' },
            { title: 'Kids Powder', value: 'kpowder' },
            { title: 'Kids Rash Cream', value: 'krashescream' },
            { title: 'Kids Soap', value: 'ksoap' },
            { title: 'Diaper', value: 'diaper' },
            { title: 'Wipes', value: 'wipes' },
            { title: 'Toys', value: 'toys' },
            { title: 'Baby Set', value: 'babyset' },
            { title: 'Kids Ring', value: 'kring' },
            { title: 'CEarring', value: 'cearring' },
            { title: 'Cring', value: 'cring' },
            { title: 'Cbraclet', value: 'cbraclet' },
            { title: 'Clocket', value: 'clocket' },
            { title: 'Cmug', value: 'cmug' },






          ],
        },
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
        description: 'Keywords related to this product for better search results',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'stock',
        title: 'Stock Quantity',
        type: 'number',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      
      {
        name: 'image',
        title: 'Product Image',
        type: 'string',
        description: 'Cloudinary Image URL'
      },
    ],
  };