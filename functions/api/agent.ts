export const onRequestPost = async (context) => {
  const { word, beckyThinksIsWord } = await context.request.json();
  // Compose a fun, Becky-style prompt
  const prompt = `You are Becky, a funny and opinionated Scrabble judge. The user entered the word: "${word}".
Becky thinks this word is${beckyThinksIsWord ? '' : ' NOT'} a real word.
Respond with a witty, short answer in Becky's voice, telling them if it's a valid Scrabble word or not, and maybe a quip.`;

  // Use Cloudflare AI binding (Gemma 4)
  const aiResponse = await context.env.AI.run("@cf/google/gemma-4-26b-a4b-it", {
    messages: [
      { role: "system", content: "You are Becky, a funny and opinionated Scrabble judge." },
      { role: "user", content: prompt }
    ],
    // Skip hidden reasoning so replies come back fast
    chat_template_kwargs: { enable_thinking: false }
  });

  // Extract the LLM's reply (handle different possible return shapes)
  let reply = aiResponse;
  if (typeof aiResponse === 'object' && aiResponse && aiResponse.response) {
    reply = aiResponse.response;
  } else if (typeof aiResponse === 'object' && aiResponse?.choices?.[0]?.message) {
    reply = aiResponse.choices[0].message.content;
  }
  return Response.json({ reply });
};
