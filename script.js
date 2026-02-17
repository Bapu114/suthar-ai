const BACKEND_URL="PASTE_YOUR_RENDER_BACKEND_URL_HERE";
let prompts={
classical:"Redesign bungalow into luxury classical villa, ultra realistic, 4k render",
modern:"Redesign bungalow into modern luxury contemporary villa, ultra realistic, 4k render",
neoclassical:"Redesign bungalow into modern neoclassical luxury villa, ultra realistic, 4k render"
};
let uploadedBase64="";
document.getElementById("imageUpload").onchange=function(e){
let reader=new FileReader();
reader.onload=function(){uploadedBase64=reader.result;document.getElementById("preview").src=uploadedBase64;};
reader.readAsDataURL(e.target.files[0]);
};
async function generateDesign(){
let type=document.getElementById("designType").value;
if(!uploadedBase64){alert("Upload image first");return;}
if(type==""){alert("Select design type");return;}
document.getElementById("loading").innerText="Generating design...";
let base64=uploadedBase64.split(",")[1];
let response=await fetch(BACKEND_URL+"/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({image:base64,prompt:prompts[type]})});
let data=await response.json();
if(data.image){localStorage.setItem("generatedImage",data.image);window.location.href="result.html";}
else{alert("Generation failed");}
}