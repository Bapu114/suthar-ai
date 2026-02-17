const express=require("express");
const cors=require("cors");
const fetch=require("node-fetch");

const app=express();

app.use(cors());
app.use(express.json({limit:"20mb"}));

const API_KEY="AIzaSyBLLQLPv9ACqbw-uLpIYskcjzMIp18dQQQ";

app.post("/generate",async(req,res)=>{

try{

const {image,prompt}=req.body;

const response=await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
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

const data=await response.json();

console.log(JSON.stringify(data,null,2));

res.json(data);

}
catch(e){

console.log(e);

res.json({error:e.toString()});

}

});

app.get("/",(req,res)=>res.send("Backend running"));

app.listen(3000);

