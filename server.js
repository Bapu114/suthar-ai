const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({limit:"10mb"}));


// Generate AI image using Stable Diffusion XL (Pollinations FREE)
app.post("/generate", async (req, res) => {

try{

const { prompt } = req.body;

console.log("Prompt received:", prompt);

// Generate image URL
const imageUrl =
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}.png?width=1024&height=1024&seed=${Math.random()}`;

console.log("Generated image URL:", imageUrl);

// Return image URL
res.json({
image: imageUrl
});

}catch(error){

console.log(error);

res.status(500).json({
error: error.toString()
});

}

});


// test route
app.get("/", (req,res)=>{

res.send("Stable Diffusion backend running");

});


app.listen(3000, ()=>{

console.log("Server running on port 3000");

});
