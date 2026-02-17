let prompts = {
    classical: "luxury classical neoclassical bungalow, beige limestone facade, columns, ornate architectural details, ultra realistic architectural render",
    modern: "modern luxury contemporary bungalow, glass facade, concrete and wood materials, minimalist architecture, ultra realistic architectural render",
    neoclassical: "modern neoclassical luxury bungalow, symmetrical facade, elegant columns, premium architecture, ultra realistic architectural render"
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
        alert("Please select design type");
        return;
    }

    document.getElementById("loading").innerText = "Generating AI Design... Please wait 5–10 seconds";

    try {
        // We use '/generate' instead of the full URL because they share the same server
        let response = await fetch("/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompts[type] })
        });

        let data = await response.json();

        if(data.image) {
            localStorage.setItem("generatedImage", data.image);
            window.location.href = "result.html";
        } else {
            alert("Generation failed");
            document.getElementById("loading").innerText = "";
        }
    } catch(error) {
        console.error(error);
        alert("Server error. Please try again.");
    }
}

