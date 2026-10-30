// Regression: newer Workers AI models return OpenAI-style { choices: [...] }, which the UI rendered as [object Object].
// Verifies the agent function always replies with plain text.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/agent.ts';

const call = async (aiResponse) => {
    const res = await onRequestPost({
        request: new Request('http://x/api/agent', { method: 'POST', body: JSON.stringify({ word: 'qi', beckyThinksIsWord: true }) }),
        env: { AI: { run: async () => aiResponse } }
    });
    return (await res.json()).reply;
};

test('extracts reply from chat.completion responses', async () => {
    assert.equal(await call({ choices: [{ message: { role: 'assistant', content: 'Valid!' } }] }), 'Valid!');
});

test('extracts reply from legacy { response } responses', async () => {
    assert.equal(await call({ response: 'Valid!' }), 'Valid!');
});
