import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { apiVersion, dataset, projectId, token } from '../env';

// Create Sanity client
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

// Initialize image URL builder
const builder = imageUrlBuilder(client);

// Create function to get image URL
export const urlFor = (source: any) => builder.image(source);