import { z } from "zod";

export const CompositionSpecSchema = z.object({
  energy: z.string(),
  negative_space: z.string(),
  grid: z.string(),
  layout_preference: z.string(),
});

export const PatternSpecSchema = z.object({
  type: z.string(),
  usage: z.string(),
  assets: z.array(z.string()),
});

export const IllustrationSpecSchema = z.object({
  style: z.string(),
  function: z.string(),
  assets: z.array(z.string()),
});

export const PhotographySpecSchema = z.object({
  style: z.string(),
  anti_patterns: z.array(z.string()),
});

export const SignatureSpecSchema = z.object({
  description: z.string(),
  elements: z.array(z.string()),
});

export const AntiPatternRuleSchema = z.object({
  rule: z.string(),
  severity: z.enum(["hard", "soft"]),
  preflight_id: z.string().optional(),
});

export const VisualIdentitySchema = z.object({
  schema_version: z.string(),
  session: z.number(),
  composition: CompositionSpecSchema.nullable(),
  patterns: PatternSpecSchema.nullable(),
  illustration: IllustrationSpecSchema.nullable(),
  photography: PhotographySpecSchema.nullable(),
  signature: SignatureSpecSchema.nullable(),
  anti_patterns: z.array(AntiPatternRuleSchema),
  positioning_context: z.string(),
});

export type VisualIdentityData = z.infer<typeof VisualIdentitySchema>;
