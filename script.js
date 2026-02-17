// IMPORTANT: Replace with your real backend URL
const BACKEND_URL = "https://suthar-ai01.onrender.com";

let prompts = {

classical:
"luxury classical neoclassical bungalow, beige limestone facade, columns, ornate architectural details, ultra realistic architectural render",

modern:
"modern luxury contemporary bungalow, glass facade, concrete and wood materials, minimalist architecture, ultra realistic architectural render",

neoclassical:
"modern neoclassical luxury bungalow, symmetrical facade, elegant columns, premium architecture, ultra realistic architectural render"

};


// show uploaded image preview
document.getElementById("imageUpload").onchange = function(e){

let reader = new FileReader();

reader.onload = function(){

document.getElementById("preview").src = reader.result;

};

reader.readAsDataURL(e.target.files[0]);

};


// generate AI design
async function generateDesign(){

let type = document.getElementById("designType").value;

if(!type){

alert("Please select design type");

return;

}

document.getElementById("loading").innerText =
"Generating AI Design... Please wait 5–10 seconds";

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

console.log("Backend returned:", data);

// save base64 image
if(data.image){

localStorage.setItem("generatedImage", data.image);

// go to result page
window.location.href = "result.html";

}else{

alert("Image generation failed");

}

}catch(error){

console.log(error);

alert("Connection error");

}

}
