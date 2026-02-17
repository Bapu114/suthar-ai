const express = require("express");
const cors = require("cors");

// enable fetch in Node
const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));


// Generate Stable Diffusion image
app.post("/generate", async (req, res) => {

try {

const { prompt } = req.body;

console.log("Prompt:", prompt);

// FORCE PNG image
const imageUrl =
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}.png?width=512&height=512&seed=${Math.random()}`;

console.log("Fetching:", imageUrl);

const response = await fetch(imageUrl);

// Check if response is image
const contentType = response.headers.get("content-type");

if (!contentType || !contentType.includes("image")) {

throw new Error("Pollinations did not return an image");

}

// Convert image to base64
const buffer = await response.arrayBuffer();

const base64 = Buffer.from(buffer).toString("base64");

const finalImage = `data:image/png;base64,${base64}`;

res.json({
image: finalImage
});

} catch (error) {

console.log("ERROR:", error);

// fallback image so frontend never breaks
res.json({
image:
"https://image.pollinations.ai/prompt/modern luxury bungalow architecture.png"
});

}

});


app.get("/", (req, res) => {
res.send("Backend working");
});


app.listen(3000, () => {
console.log("Server running");
});

