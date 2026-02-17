const express = require("express");
const cors = require("cors");
const https = require("https");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate", (req, res) => {

const prompt = req.body.prompt;

console.log("Prompt:", prompt);

const url =
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

https.get(url, (response) => {

let chunks = [];

response.on("data", (chunk) => {
chunks.push(chunk);
});

response.on("end", () => {

const buffer = Buffer.concat(chunks);

// Check if buffer is valid image
if (buffer.length < 1000) {

console.log("Invalid image received");

return res.json({
error: "Image generation failed"
});

}

const base64 = buffer.toString("base64");

const image = `data:image/png;base64,${base64}`;

console.log("Image success");

res.json({
image: image
});

});

}).on("error", (err) => {

console.log("Fetch error:", err);

res.json({
error: "Fetch failed"
});

});

});


app.get("/", (req, res) => {
res.send("Backend OK");
});


app.listen(3000, () => {
console.log("Server running");
});
