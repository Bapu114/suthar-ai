const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({limit:"10mb"}));


// Generate image and return base64
app.post("/generate", async (req, res) => {

try {

const { prompt } = req.body;

console.log("Prompt:", prompt);

// Pollinations image URL
const imageUrl =
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&seed=${Math.random()}`;

// Fetch image
const response = await fetch(imageUrl);

const arrayBuffer = await response.arrayBuffer();

const base64 = Buffer.from(arrayBuffer).toString("base64");

const imageBase64 = `data:image/png;base64,${base64}`;

res.json({
image: imageBase64
});

} catch (error) {

console.log(error);

res.status(500).json({
error: error.toString()
});

}

});


app.get("/", (req,res)=>{

res.send("Backend running");

});


app.listen(3000, ()=>{

console.log("Server running");

});
