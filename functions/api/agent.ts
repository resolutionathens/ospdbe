export const onRequestPost = async (context) => {
  const { word, beckyThinksIsWord } = await context.request.json();
  // Compose a fun, Becky-style prompt
  const prompt = `You are Becky, a funny and opinionated Scrabble judge. The user entered the word: "${word}".
Becky thinks this word is${beckyThinksIsWord ? '' : ' NOT'} a real word.
Respond with a witty, short answer in Becky's voice, telling them if it's a valid Scrabble word or not, and maybe a quip.`;

  // Use Cloudflare AI binding (Llama 3)
  const aiResponse = await context.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    messages: [
      { role: "system", content: "You are Becky, a funny and opinionated Scrabble judge." },
      { role: "user", content: prompt }
    ]
  });

  // Extract the LLM's reply (handle different possible return shapes)
  let reply = aiResponse;
  if (typeof aiResponse === 'object' && aiResponse && aiResponse.response) {
    reply = aiResponse.response;
  }
  return Response.json({ reply });
};
