const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json({limit:"20mb"}));

app.post("/generate", async (req, res) => {

try {

const { prompt } = req.body;

// Stable Diffusion XL via Pollinations (FREE)
const imageUrl =
`https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&model=stable-diffusion-xl&seed=${Math.random()}`;

res.json({
image: imageUrl
});

} catch (error) {

console.log(error);

res.json({
error: error.toString()
});

}

});

app.get("/", (req,res)=>{
res.send("Stable Diffusion backend running");
});

app.listen(3000, ()=>{
console.log("Server running");
});

