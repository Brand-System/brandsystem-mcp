#!/usr/bin/env node
/**
 * Lane I6 — Voice/messaging extraction quality audit
 */

import { createServer } from "../dist/server.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { mkdtemp, rm, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

const BRANDS = [
  { name: "Linear", url: "https://linear.app" },
  { name: "Vercel", url: "https://vercel.com" },
  { name: "Superhuman", url: "https://superhuman.com" },
];

async function runMessagingAudit(brand) {
  const tmpDir = await mkdtemp(join(tmpdir(), `msg-audit-${brand.name.toLowerCase()}-`));

  await mkdir(join(tmpDir, ".brand"), { recursive: true });
  await writeFile(join(tmpDir, ".brand", "brand.config.yaml"),
    `schema_version: "0.1.0"\nsession: 1\nclient_name: "${brand.name}"\nwebsite_url: "${brand.url}"\ncreated_at: "${new Date().toISOString()}"\n`
  );
  await writeFile(join(tmpDir, ".brand", "core-identity.yaml"),
    `schema_version: "0.1.0"\ncolors: []\ntypography: []\nlogo: []\nspacing: null\n`
  );

  const originalCwd = process.cwd;
  process.cwd = () => tmpDir;

  const server = createServer();
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "msg-audit", version: "1.0.0" });
  await server.connect(serverTransport);
  await client.connect(clientTransport);

  const startTime = Date.now();
  let data;

  try {
    const response = await client.callTool({
      name: "brand_extract_messaging",
      arguments: { url: brand.url },
    });
    data = JSON.parse(response.content[0]?.text || "{}");
  } catch (err) {
    data = { error: err.message };
  }

  const duration = Date.now() - startTime;
  process.cwd = originalCwd;
  await client.close();
  await rm(tmpDir, { recursive: true, force: true });

  return { brand: brand.name, url: brand.url, duration, data };
}

async function main() {
  console.log("Lane I6 — Voice/Messaging Extraction Quality Audit\n");

  const results = [];

  for (const brand of BRANDS) {
    process.stdout.write(`  ${brand.name}... `);
    const r = await runMessagingAudit(brand);
    const d = r.data;
    console.log(`${r.duration}ms (${d.total_sentences || 0} sentences, ${d.total_words || 0} words)`);

    const vf = d.voice_fingerprint || {};
    console.log(`    Voice: formality ${vf.formality_score ?? '?'}/10, active ${vf.active_voice_pct ?? '?'}%, hedging ${vf.hedging_density ?? '?'}%, jargon ${vf.jargon_density ?? '?'}%`);
    console.log(`    Sentence length: avg ${vf.avg_sentence_length ?? '?'} words`);

    const vocab = d.vocabulary || {};
    console.log(`    Vocab: ${vocab.top_terms?.length ?? 0} top terms, ${vocab.distinctive?.length ?? 0} distinctive, ${vocab.overused?.length ?? 0} overused`);
    if (vocab.distinctive?.length > 0) {
      console.log(`      Distinctive: ${vocab.distinctive.slice(0, 5).map(v => v.term || v).join(', ')}`);
    }
    if (vocab.overused?.length > 0) {
      console.log(`      Overused: ${vocab.overused.map(v => v.term || v).join(', ')}`);
    }

    const claims = d.claims_summary || {};
    console.log(`    Claims: ${claims.explicit_count ?? 0} explicit, ${claims.implicit_count ?? 0} implicit, ${claims.contradictions?.length ?? 0} contradictions`);

    console.log(`    AI-isms: ${d.ai_isms_found ?? 0} patterns`);

    const gaps = d.gaps || [];
    console.log(`    Gaps: ${gaps.length} identified`);
    for (const g of gaps) {
      console.log(`      - ${g}`);
    }

    results.push(r);
    console.log();
  }

  // Save results
  const outputDir = join(import.meta.dirname, "audit-results");
  await mkdir(outputDir, { recursive: true });
  await writeFile(
    join(outputDir, "messaging-audit.json"),
    JSON.stringify(results, null, 2),
  );
  console.log("Results saved to scripts/audit-results/messaging-audit.json");
}

main().catch(console.error);
