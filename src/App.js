import React from "react";
// import fetch from "node-fetch"; // Import fetch from node-fetch module

import "./App.css";

function App() {
  const callApi = () => {
    const prompt =
      'The followings are the location coordinates and priority (HIGH, LOW) of some service calls I have to engage. Can you give me the most efficient order I can visit them, always give the top priority to locations with "HIGH", my current location is (-38.103179, 145.225357). Always assume the newly visited location is my current location. Use google maps API to calculate the distance between locations. {LOC1, LOW,-38.08039743174168, 145.2792105223707381}, {LOC2, HIGH,-38.07508367670604, 145.249708711921282}, {LOC3, High,-38.08925283209689, 145.33321383641483}, {LOC4, LOW,-38.0648486902882, 145.3002118111653384}, {LOC5, LOW,-38.101648590578314, 145.32421328407344}. The given format is {Location name, Priority, latitude, longitude} Please create a location order list to this format {location name}. Only provide an array with locations. no extra strings.';
    const temperature = 0.3;
    const maxTokens = 256;
    const topP = 1;
    const frequencyPenalty = 0;
    const presencePenalty = 0;
    const model = "text-davinci-003";
    const apiKey = "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";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      model: model,
      prompt: prompt,
      temperature: temperature,
      max_tokens: maxTokens,
      top_p: topP,
      frequency_penalty: frequencyPenalty,
      presence_penalty: presencePenalty,
    };
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        const textData = json.choices[0].text;
        console.log(textData);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <button onClick={callApi}>Click Me</button>
    </div>
  );
}

export default App;
