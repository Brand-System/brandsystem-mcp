import { z } from "zod";

const PolicyRuleSchema = z.object({
  id: z.string(),
  rule: z.string(),
  severity: z.enum(["hard", "soft"]),
  category: z.enum(["visual", "voice", "content"]),
});

const VoicePolicyRulesSchema = z.object({
  never_say: z.array(z.string()),
  ai_ism_patterns: z.array(z.string()),
  tone_constraints: z.object({
    never_sounds_like: z.string(),
    avoid_patterns: z.array(z.string()),
  }).nullable(),
  sentence_patterns: z.object({
    prefer: z.array(z.string()),
    avoid: z.array(z.string()),
  }).nullable(),
});

const ContentPolicyRulesSchema = z.object({
  claims_policies: z.array(z.object({
    stage: z.string(),
    max_per_piece: z.number().nullable(),
  })),
  persona_count: z.number(),
});

export const InteractionPolicySchema = z.object({
  version: z.string(),
  compiled_at: z.string(),
  visual_rules: z.array(PolicyRuleSchema),
  voice_rules: VoicePolicyRulesSchema,
  content_rules: ContentPolicyRulesSchema,
});

export type InteractionPolicyData = z.infer<typeof InteractionPolicySchema>;
