export type Confidence = "confirmed" | "high" | "medium" | "low";
export type Source = "web" | "figma" | "manual";

export interface ColorEntry {
  name: string;
  value: string; // hex
  role: "primary" | "secondary" | "accent" | "neutral" | "surface" | "text" | "action" | "unknown";
  source: Source;
  confidence: Confidence;
  figma_variable_id?: string;
  css_property?: string;
}

export interface TypographyEntry {
  name: string;
  family: string;
  size?: string;
  weight?: number;
  line_height?: string;
  source: Source;
  confidence: Confidence;
  figma_style_id?: string;
}

export interface LogoVariant {
  name: string; // e.g. "dark", "light"
  file?: string; // relative path in .brand/assets/logo/
  inline_svg?: string;
  data_uri?: string;
}

export interface LogoSpec {
  type: "wordmark" | "logomark";
  source: Source;
  confidence: Confidence;
  variants: LogoVariant[];
}

export interface SpacingSpec {
  base_unit?: string;
  scale?: number[];
  source: Source;
  confidence: Confidence;
}

export interface CoreIdentity {
  schema_version: string;
  colors: ColorEntry[];
  typography: TypographyEntry[];
  logo: LogoSpec[];
  spacing: SpacingSpec | null;
}

export interface BrandConfig {
  schema_version: string;
  session: number;
  client_name: string;
  industry?: string;
  website_url?: string;
  figma_file_key?: string;
  created_at: string;
}

export interface ClarificationItem {
  id: string;
  field: string;
  question: string;
  source: string;
  priority: "high" | "medium" | "low";
}

export interface NeedsClarification {
  schema_version: string;
  items: ClarificationItem[];
}

// --- Session 2: Visual Identity ---

export interface CompositionSpec {
  energy: string; // e.g. "high-tension, asymmetric"
  negative_space: string; // e.g. "minimum 35%"
  grid: string; // e.g. "8px base, flexible columns"
  layout_preference: string; // e.g. "asymmetric tension"
}

export interface PatternSpec {
  type: "geometric" | "organic" | "photographic" | "none" | string;
  usage: "structural" | "decorative" | "both" | string;
  assets: string[]; // references to .brand/assets/patterns/
}

export interface IllustrationSpec {
  style: string; // e.g. "flat", "dimensional", "hand-drawn", "collage"
  function: string; // e.g. "explanatory", "atmospheric", "both"
  assets: string[];
}

export interface PhotographySpec {
  style: string; // e.g. "studio", "lifestyle", "documentary", "abstract", "none"
  anti_patterns: string[];
}

export interface SignatureSpec {
  description: string; // what makes the brand recognizable beyond tokens
  elements: string[]; // specific signature moves
}

export interface AntiPatternRule {
  rule: string; // e.g. "no drop shadows"
  severity: "hard" | "soft"; // hard = auto-enforced, soft = flagged
  preflight_id?: string; // ID for automated checking
}

export interface AssetManifestEntry {
  file: string;
  description: string;
  usage: string; // e.g. "hero sections", "blog headers", "general purpose"
  theme: "dark" | "light" | "both";
  dimensions?: string;
  type?: string; // e.g. "illustration", "sticker", "pattern", "icon"
}

export interface VisualIdentity {
  schema_version: string;
  session: number;
  composition: CompositionSpec | null;
  patterns: PatternSpec | null;
  illustration: IllustrationSpec | null;
  photography: PhotographySpec | null;
  signature: SignatureSpec | null;
  anti_patterns: AntiPatternRule[];
  positioning_context: string; // from Session 1 interview Q3
}

// --- Session 3: Core Messaging ---

export interface Perspective {
  worldview: string;
  tension: string;
  resolution: string;
  audience: string;
  positioning: string;
  one_liner: string;
}

export interface ToneSpec {
  descriptors: string[]; // exactly 3 words
  register: string; // how the brand speaks to its audience
  never_sounds_like: string; // negative tone constraint
  sentence_patterns: {
    prefer: string[];
    avoid: string[];
  };
  conventions: {
    person: string; // "we" | "I" | "they"
    founder_voice?: string; // "I" for founder channels
    reader_address: string; // "you"
    oxford_comma: boolean;
    sentence_length: number; // target average words
    paragraph_length: number; // target sentences
  };
}

export interface AnchorTerm {
  use: string; // the preferred word
  not: string; // words it replaces
  reason: string; // why this word matters
}

export interface NeverSayTerm {
  word: string;
  reason: string;
}

export interface VoiceCodex {
  tone: ToneSpec;
  vocabulary: {
    anchor: AnchorTerm[];
    never_say: NeverSayTerm[];
    jargon_policy: string; // e.g. "define on first use"
    placeholder_defaults: {
      headline: string;
      subhead: string;
      cta: string;
      body_paragraph: string;
    };
  };
  ai_ism_detection: {
    patterns: string[];
    instruction: string;
  };
}

export interface BrandStory {
  origin: string;
  tension: string;
  resolution: string;
  vision: string;
  tagline: string;
}

export interface MessagingAuditResult {
  voice_fingerprint: {
    formality: number; // 1-10
    jargon_density: string;
    avg_sentence_length: number;
    active_voice_pct: number;
    hedging_frequency: string;
    tone_by_channel: Record<string, string>;
  };
  vocabulary_frequency: Array<{ term: string; count: number; assessment: string }>;
  claims: {
    explicit: Array<{ claim: string; frequency: number; issues: string[] }>;
    implicit: Array<{ claim: string; evidence: string; status: string }>;
    contradictions: string[];
  };
  gaps: string[];
}

/** DTCG token value */
export interface DTCGToken {
  $value: string | number;
  $type: string;
  $description?: string;
  $extensions?: Record<string, unknown>;
}

export interface McpResponseData {
  what_happened: string;
  next_steps: string[];
  data?: Record<string, unknown>;
}
