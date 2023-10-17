document.addEventListener("DOMContentLoaded", async (event) => {
    let response = await fetch("http://localhost:5500/templates/navbar.html");

    do {
        if (response.ok)
        {
            let innerHtml = await response.text();
            document.getElementById("navbar").innerHTML = innerHtml;
        }
    } while (!response.ok);
});