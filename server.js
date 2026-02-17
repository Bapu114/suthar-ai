const express = require("express");
const cors = require("cors");

// enable fetch
const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));


// generate image route
app.post("/generate", async (req, res) => {

try {

const { prompt } = req.body;

console.log("Generating image for:", prompt);

// Pollinations image URL
const url =
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&seed=${Math.random()}`;

// fetch image
const response = await fetch(url);

if (!response.ok) {
throw new Error("Image fetch failed");
}

// convert to base64
const buffer = Buffer.from(await response.arrayBuffer());

const base64 = buffer.toString("base64");

const image = `data:image/png;base64,${base64}`;

console.log("Image generated successfully");

// send base64 image
res.json({ image });

} catch (error) {

console.log("ERROR:", error);

res.status(500).json({
error: "Image generation failed"
});

}

});


// test route
app.get("/", (req, res) => {
res.send("Backend running OK");
});


app.listen(3000, () => {
console.log("Server running on port 3000");
});
