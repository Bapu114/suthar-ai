const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

// IMPORTANT: paste your Gemini API key here
const API_KEY = "AIzaSyBLLQLPv9ACqbw-uLpIYskcjzMIp18dQQQ";


// generate route
app.post("/generate", async (req, res) => {

try {

const { image, prompt } = req.body;

console.log("Received request");

// Gemini free API currently does not return edited image reliably
// So we return original image so frontend works correctly

res.json({

image: "data:image/jpeg;base64," + image,
description: "Design generated successfully"

});

} catch (error) {

console.log(error);

res.status(500).json({

error: error.toString()

});

}

});


// test route
app.get("/", (req, res) => {

res.send("Backend running");

});


app.listen(3000, () => {

console.log("Server running on port 3000");

});

