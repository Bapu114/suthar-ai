const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(express.json({limit:"20mb"}));

const API_KEY = "AIzaSyBLLQLPv9ACqbw-uLpIYskcjzMIp18dQQQ";

app.post("/generate", async (req, res) => {

try {

const {image, prompt} = req.body;

const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${API_KEY}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{text:prompt},
{
inline_data:{
mime_type:"image/jpeg",
data:image
}
}
]
}
]
})
});

const data = await response.json();

console.log(data);

if(data.candidates){

const imagePart = data.candidates[0].content.parts.find(
part => part.inline_data
);

if(imagePart){

res.json({
image:"data:image/png;base64," + imagePart.inline_data.data
});

return;

}

}

res.json({error:"No image returned", full:data});

}
catch(e){

console.log(e);

res.json({error:e.toString()});

}

});

app.get("/", (req,res)=>{
res.send("Backend running");
});

app.listen(3000, ()=>{
console.log("Server started");
});

