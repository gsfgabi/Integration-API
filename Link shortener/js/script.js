async function encurtarUrl() {
    const url = document.getElementById("url").value;

    if (!url) {
        alert("Por favor, insira uma URL!");
        return;
    }

    const regexUrl = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,4}(\/[^\s]*)?$/i;
    if (!regexUrl.test(url)) {
        alert("Por favor, insira uma URL válida!");
        return;
    }

    document.getElementById("carregando").style.display = "block";
    document.getElementById("resultado").innerHTML = "";

    try {
        const resposta = await fetch("http://localhost:3001/encurtar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        });

        const data = await resposta.json();

        if (resposta.ok) {
            document.getElementById("resultado").innerHTML = 
                `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
        } else {
            document.getElementById("resultado").innerHTML = 
                `Erro ao encurtar a URL: ${data.message || 'Tente novamente mais tarde.'}`;
        }
    } catch (error) {
        document.getElementById("resultado").innerHTML = 
            `Erro: ${error.message}. Verifique sua conexão.`;
    } finally {
        document.getElementById("carregando").style.display = "none";
    }
}
