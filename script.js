// IMPORTANT: paste your backend URL here
const BACKEND_URL = "https://suthar-ai01.onrender.com";

let prompts = {

classical:
"Redesign my existing bungalow into luxury classical neoclassical villa, ultra realistic architectural render",

modern:
"Redesign my existing bungalow into modern luxury contemporary villa, ultra realistic architectural render",

neoclassical:
"Redesign my existing bungalow into modern neoclassical luxury villa, ultra realistic architectural render"

};

let uploadedBase64 = "";

// when user uploads image
document.getElementById("imageUpload").onchange = function(e) {

let file = e.target.files[0];

let reader = new FileReader();

reader.onload = function() {

uploadedBase64 = reader.result;

// show preview
document.getElementById("preview").src = uploadedBase64;

};

reader.readAsDataURL(file);

};


// generate design
async function generateDesign() {

let type = document.getElementById("designType").value;

if (!uploadedBase64) {

alert("Please upload image first");

return;

}

if (!type) {

alert("Please select design type");

return;

}

document.getElementById("loading").innerText = "Generating design...";

// remove data:image/jpeg;base64,
let base64 = uploadedBase64.split(",")[1];

try {

let response = await fetch(BACKEND_URL + "/generate", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({
image: base64,
prompt: prompts[type]
})

});

let data = await response.json();

console.log("Backend response:", data);

// save image and open result page
if (data.image) {

localStorage.setItem("generatedImage", data.image);

window.location.href = "result.html";

} else {

alert("Generation failed. No image returned.");

}

} catch (error) {

console.log(error);

alert("Connection error");

}

}
