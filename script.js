const BACKEND_URL = "https://suthar-ai01.onrender.com";

let prompts = {

classical:
"luxury classical neoclassical bungalow, beige limestone facade, columns, ornate details, ultra realistic architectural render",

modern:
"modern luxury contemporary bungalow, glass facade, concrete and wood materials, minimalist architecture, ultra realistic",

neoclassical:
"modern neoclassical luxury bungalow, symmetrical facade, elegant columns, premium architecture, ultra realistic"

};


document.getElementById("imageUpload").onchange = function(e){

let reader = new FileReader();

reader.onload = function(){

document.getElementById("preview").src = reader.result;

};

reader.readAsDataURL(e.target.files[0]);

};


async function generateDesign(){

let type = document.getElementById("designType").value;

if(!type){

alert("Select design type");

return;

}

document.getElementById("loading").innerText = "Generating AI Design...";

try{

let response = await fetch(BACKEND_URL + "/generate", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
prompt: prompts[type]
})

});

let data = await response.json();

if(data.image){

localStorage.setItem("generatedImage", data.image);

window.location.href = "result.html";

}else{

alert("Generation failed");

}

}catch(e){

alert("Connection error");

console.log(e);

}

}

