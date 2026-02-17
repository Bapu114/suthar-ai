const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

const API_KEY = "AIzaSyBLLQLPv9ACqbw-uLpIYskcjzMIp18dQQQ";

app.post("app.post("/generate", async (req, res) => {
  try {

    const { image, prompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: image,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    // Return original image so frontend can display
    res.json({
      image: "data:image/jpeg;base64," + image
    });

  } catch (error) {

    console.log(error);

    res.json({
      error: error.toString()
    });

  }
});
", async (req, res) => {
  try {
    const { image, prompt } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: "image/jpeg",
                    data: image,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini response:", JSON.stringify(data, null, 2));

    // Gemini FREE returns text description, not image
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No design generated";

    res.json({
      image: image, // return original image for now
      description: text,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error.toString(),
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(3000, () => {
  console.log("Server started");
});

