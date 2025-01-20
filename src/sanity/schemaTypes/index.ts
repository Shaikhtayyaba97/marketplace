import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import orderdetail from './orderdetail'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,orderdetail],
}
