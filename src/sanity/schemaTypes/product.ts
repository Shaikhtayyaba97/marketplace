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
          
            { title: 'Male Ring', value: 'malering' },
            { title: 'Women Ring', value: 'womenring' },
            { title: 'Men Watch', value: 'menwatch' },
            { title: 'Women Watch', value: 'womenwatch' },
            { title: 'Kids Watch', value: 'kidswatch' },
            { title: 'Men Bracelet', value: 'menbraclet' },
            { title: 'Women Bracelet', value: 'womenbraclet' },
            { title: 'Men Locket', value: 'menlocket' },
            { title: 'Women Locket', value: 'womenlocket' },
            { title: 'Cufflink', value: 'cufflink' },
            { title: 'Wallet', value: 'wallet' },
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
        title: 'Original Price',
        name: 'originalPrice',
        type: 'number'
      },
      {
        title: 'Discounted Price',
        name: 'discountedPrice',
        type: 'number'
      },
      {
        title: 'size',
        name: 'Size',
        type: 'number'
      },
      
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'stock',
        title: 'Stock Quantity',
        type: 'number',
        validation: (Rule:any) => Rule.min(0).warning('Stock cannot be negative'),
      },
      
      {
        name: 'image',
        title: 'Product Image',
        type: 'string',
        description: 'Cloudinary Image URL'
      },
    ],
  };