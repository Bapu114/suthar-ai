const express = require("express");
const cors = require("cors");

// IMPORTANT: add fetch support
const fetch = (...args) =>
import("node-fetch").then(({default: fetch}) => fetch(...args));

const app = express();

app.use(cors());
app.use(express.json({limit:"10mb"}));


// Generate image and return base64
app.post("/generate", async (req, res) => {

try {

const { prompt } = req.body;

console.log("Prompt received:", prompt);

// Generate image URL
const imageUrl =
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&seed=${Math.random()}`;

console.log("Fetching image:", imageUrl);

// Fetch image from Stable Diffusion
const response = await fetch(imageUrl);

const buffer = await response.arrayBuffer();

const base64 = Buffer.from(buffer).toString("base64");

const imageBase64 = `data:image/png;base64,${base64}`;

console.log("Image converted to base64");

// Send base64 image
res.json({
image: imageBase64
});

} catch (error) {

console.log("ERROR:", error);

res.status(500).json({
error: error.toString()
});

}

});


app.get("/", (req,res)=>{

res.send("Stable Diffusion backend running");

});


app.listen(3000, ()=>{

console.log("Server running on port 3000");

});

