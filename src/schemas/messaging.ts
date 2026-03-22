import { z } from "zod";

export const PerspectiveSchema = z.object({
  worldview: z.string(),
  tension: z.string(),
  resolution: z.string(),
  audience: z.string(),
  positioning: z.string(),
  one_liner: z.string(),
});

export const ToneSpecSchema = z.object({
  descriptors: z.array(z.string()),
  register: z.string(),
  never_sounds_like: z.string(),
  sentence_patterns: z.object({
    prefer: z.array(z.string()),
    avoid: z.array(z.string()),
  }),
  conventions: z.object({
    person: z.string(),
    founder_voice: z.string().optional(),
    reader_address: z.string(),
    oxford_comma: z.boolean(),
    sentence_length: z.number(),
    paragraph_length: z.number(),
  }),
});

export const AnchorTermSchema = z.object({
  use: z.string(),
  not: z.string(),
  reason: z.string(),
});

export const NeverSayTermSchema = z.object({
  word: z.string(),
  reason: z.string(),
});

export const VoiceCodexSchema = z.object({
  tone: ToneSpecSchema,
  vocabulary: z.object({
    anchor: z.array(AnchorTermSchema),
    never_say: z.array(NeverSayTermSchema),
    jargon_policy: z.string(),
    placeholder_defaults: z.object({
      headline: z.string(),
      subhead: z.string(),
      cta: z.string(),
      body_paragraph: z.string(),
    }),
  }),
  ai_ism_detection: z.object({
    patterns: z.array(z.string()),
    instruction: z.string(),
  }),
});

export const BrandStorySchema = z.object({
  origin: z.string(),
  tension: z.string(),
  resolution: z.string(),
  vision: z.string(),
  tagline: z.string(),
});

export const MessagingSchema = z.object({
  schema_version: z.string(),
  session: z.number(),
  perspective: PerspectiveSchema.nullable(),
  voice: VoiceCodexSchema.nullable(),
  brand_story: BrandStorySchema.nullable(),
});

export type MessagingData = z.infer<typeof MessagingSchema>;
export type PerspectiveData = z.infer<typeof PerspectiveSchema>;
export type VoiceCodexData = z.infer<typeof VoiceCodexSchema>;
export type BrandStoryData = z.infer<typeof BrandStorySchema>;
