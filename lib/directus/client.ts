import { createDirectus, rest, staticToken } from '@directus/sdk';
import type { DirectusSchema } from '@/lib/directus/schema';

export function getDirectusClient() {
  const directusUrl = process.env.DIRECTUS_URL;
  const directusToken = process.env.DIRECTUS_TOKEN;

  if (!directusUrl) {
    throw new Error('DIRECTUS_URL is required for Directus-backed content fetching');
  }

  const client = createDirectus<DirectusSchema>(directusUrl).with(rest());
  return directusToken ? client.with(staticToken(directusToken)) : client;
}
