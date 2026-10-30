// Regression: Cloudflare removed @cf/meta/llama-3.1-8b-instruct, which made /api/agent throw (error 1101).
// Verifies the model used by the agent function still exists in the Workers AI catalog.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

test('agent uses a model available in Workers AI', () => {
    const source = readFileSync(new URL('../functions/api/agent.ts', import.meta.url), 'utf8');
    const model = source.match(/AI\.run\("([^"]+)"/)[1];
    const models = JSON.parse(execSync('npx wrangler ai models --json', { encoding: 'utf8' }));
    assert.ok(models.some((m) => m.name === model), `${model} is not in the Workers AI catalog`);
});
