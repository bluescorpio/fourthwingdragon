import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';
const publication = z.enum(['draft', 'published']).default('draft');
const characterSchema = z.object({
  fullName: z.string().optional(),
  knownAs: z.string(),
  slugName: z.string().regex(/^[a-z]+(?:-[a-z]+)*$/),
  role: z.string().optional(),
  squad: z.string().optional(),
  wing: z.string().optional(),
  signet: z.string().optional(),
  dragon: z.string().optional(),
  dragonColor: z.string().optional(),
  firstAppearance: z.enum(['fourth-wing', 'iron-flame', 'onyx-storm', 'unknown']).default('unknown'),
  spoilersThrough: z.enum(['fourth-wing', 'iron-flame', 'onyx-storm']).default('fourth-wing'),
  homeProvince: z.string().optional(),
  family: z.string().optional(),
  status: z.string().optional(),
  related: z.array(z.object({
    name: z.string(),
    slug: z.string().optional(),
    href: z.string().optional(),
  })).default([]),
  accentColor: z.string().default('#c9a227'),
  targetKeyword: z.string(),
  title: z.string(),
  description: z.string().max(160),
  sources: z.array(z.object({
    label: z.string(),
    url: z.string().url(),
    primary: z.boolean(),
  })).default([]),
  verificationNotes: z.array(z.string()).default([]),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  contentStatus: publication,
});
const dragonSchema = z.object({
  name: z.string(),
  slugName: z.string(),
  summary: z.string(),
  traits: z.array(z.string()).default([]),
  targetKeyword: z.string(),
  title: z.string(),
  description: z.string(),
  sources: z.array(z.object({ label: z.string(), url: z.string().url(), primary: z.boolean() })).default([]),
  contentStatus: publication,
});
export const collections = {
  characters: defineCollection({ loader: glob({ base: './src/content/characters', pattern: '**/*.md' }), schema: characterSchema }),
  dragons: defineCollection({ loader: glob({ base: './src/content/dragons', pattern: '**/*.md' }), schema: dragonSchema }),
};
