const openai = require("openai");

const configuration = new openai.Configuration({
  organization: process.env.ORGANISATION_KEY,
  apiKey: process.env.OPEN_API_KEY,
});

// Configure the OpenAI API client with your API key
const openaiClient = new openai.OpenAIApi(configuration);

exports.chat = async (req, res) => {
  const completion = await openaiClient.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a bot. You can answer the questions asked very accurately",
      },
      { role: "user", content: req.body.value },
    ],
  });

  res.json({
    result: completion.data.choices[0].message.content,
  });
};

//   .then((completion) => {
//     console.log(completion.data.choices[0].message);
//   });
