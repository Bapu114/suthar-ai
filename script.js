let prompts = {
    classical: "luxury classical neoclassical bungalow, beige limestone facade, columns, ornate architectural details, ultra realistic architectural render",
    modern: "modern luxury contemporary bungalow, glass facade, concrete and wood materials, minimalist architecture, ultra realistic architectural render",
    neoclassical: "modern neoclassical luxury bungalow, symmetrical facade, elegant columns, premium architecture, ultra realistic architectural render"
};

async function generateDesign(){
    let type = document.getElementById("designType").value;
    if(!type){
        alert("Please select design type");
        return;
    }

    document.getElementById("loading").innerText = "Generating AI Design... Please wait 5–10 seconds";

    try {
        // We use the relative path '/generate'
        let response = await fetch("/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: prompts[type] })
        });

        if (!response.ok) throw new Error('Server response was not ok');

        let data = await response.json();

        if(data.image) {
            localStorage.setItem("generatedImage", data.image);
            window.location.href = "result.html";
        } else {
            throw new Error('No image data');
        }
    } catch(error) {
        console.error("Error:", error);
        alert("Server error. Please try again.");
        document.getElementById("loading").innerText = "";
    }
}
