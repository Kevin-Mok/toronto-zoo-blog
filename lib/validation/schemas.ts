import { z } from 'zod';

const mediaAssetSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(['image', 'video']),
  src: z.string().min(1),
  posterSrc: z.string().optional(),
  alt: z.string().min(1),
  caption: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  credit: z.string().optional(),
  durationLabel: z.string().optional(),
});

const animalTalkSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  paragraphs: z.tuple([z.string().min(1), z.string().min(1)]).rest(z.string().min(1)),
  photos: z.union([z.tuple([]), z.tuple([mediaAssetSchema, mediaAssetSchema])]),
  video: mediaAssetSchema.optional(),
});

export const blogPostSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  publishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  authorName: z.string().min(1),
  weatherSummary: z.string().min(1).optional(),
  category: z.enum(['field-notes', 'conservation', 'engineering']),
  tags: z.array(z.string().min(1)).min(1),
  readingMinutes: z.number().int().positive(),
  hero: mediaAssetSchema,
  content: z.object({
    intro: z.array(z.string().min(1)).min(1),
    sections: z.array(animalTalkSchema),
    preservationLens: z.array(z.string().min(1)).min(1),
  }),
});

export const blogPostsSchema = z.array(blogPostSchema);

export const revalidatePayloadSchema = z.object({
  token: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
});

export const contactPayloadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(320),
  company: z.string().min(1).max(200),
  message: z.string().min(10).max(4000),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
