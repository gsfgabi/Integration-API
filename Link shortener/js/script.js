async function encurtarUrl() {
    const url = document.getElementById("url").value;
    const resultado = document.getElementById("resultado");
    const carregando = document.getElementById("carregando");

    // Resetando a exibição de erros e resultados anteriores
    resultado.innerHTML = '';
    document.getElementById("url").classList.remove("border-red-500");
    document.getElementById("url").classList.add("border-gray-300");

    if (!url) {
        alert("Por favor, insira uma URL!");
        return;
    }

    const regexUrl = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,4}(\/[^\s]*)?$/i;
    if (!regexUrl.test(url)) {
        alert("Por favor, insira uma URL válida!");
        document.getElementById("url").classList.add("border-red-500");
        return;
    }

    carregando.style.display = "block";

    try {
        const resposta = await fetch("http://localhost:3001/encurtar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url })
        });

        const data = await resposta.json();

        if (resposta.ok) {
            resultado.innerHTML =
                `<a href="${data.shortUrl}" target="_blank" class="text-blue-500 hover:underline">${data.shortUrl}</a>`;
        } else {
            resultado.innerHTML =
                `Erro ao encurtar a URL: ${data.message || 'Tente novamente mais tarde.'}`;
            resultado.classList.add("text-red-500");
        }
    } catch (error) {
        resultado.innerHTML =
            `Erro: ${error.message}. Verifique sua conexão.`;
        resultado.classList.add("text-red-500");
    } finally {
        carregando.style.display = "none";
    }
}

function limparCampos() {
    document.getElementById("url").value = ''; 
    document.getElementById("resultado").innerHTML = ''; 
    document.getElementById("carregando").style.display = 'none'; 
    document.getElementById("url").classList.remove("border-red-500");
    document.getElementById("url").classList.add("border-gray-300"); 
}
