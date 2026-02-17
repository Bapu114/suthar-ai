const express = require("express");
const cors = require("cors");
const https = require("https");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));


// Generate AI image route
app.post("/generate", (req, res) => {

try {

const prompt = req.body.prompt;

console.log("Prompt:", prompt);

const url =
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&seed=${Math.random()}`;

// Fetch image using https module
https.get(url, (response) => {

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

}).on("error", (error) => {

console.log("Fetch error:", error);

res.status(500).json({
error: "Image fetch failed"
});

});

} catch (error) {

console.log("Server error:", error);

res.status(500).json({
error: "Server error"
});

}

});


// Test route
app.get("/", (req, res) => {
res.send("Backend working correctly");
});


app.listen(3000, () => {
console.log("Server running on port 3000");
});
