const express = require("express");
const cors = require("cors");
const https = require("https");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));


// generate image route
app.post("/generate", (req, res) => {

const prompt = req.body.prompt;

console.log("Generating image for:", prompt);

const imageUrl =
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&seed=${Math.random()}`;

https.get(imageUrl, (response) => {

const contentType = response.headers["content-type"];

if (!contentType || !contentType.startsWith("image")) {

console.log("Invalid response, not an image");

return res.json({
error: "Image generation failed"
});

}

let data = [];

response.on("data", chunk => {
data.push(chunk);
});

response.on("end", () => {

const buffer = Buffer.concat(data);

const base64 = buffer.toString("base64");

const image = `data:image/png;base64,${base64}`;

console.log("Image generated successfully");

res.json({ image });

});

}).on("error", (err) => {

console.log("Fetch error:", err);

res.json({
error: "Image fetch failed"
});

});

});


// test route
app.get("/", (req, res) => {
res.send("Backend working");
});


app.listen(3000, () => {
console.log("Server running on port 3000");
});
