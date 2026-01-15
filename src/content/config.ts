import { z, defineCollection } from "astro:content";
const schema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.string().optional(),
    heroImage: z.string().optional(),
    badge: z.string().optional(),
    tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
        message: 'tags must be unique',
    }).optional(),
});

export type BlogSchema = z.infer<typeof schema>;
export type ProjectSchema = z.infer<typeof schema>;

const blogCollection = defineCollection({ schema: schema });
const projectCollection = defineCollection({ schema: schema });

export const collections = {
    'blog': blogCollection,
    'project': projectCollection,
}