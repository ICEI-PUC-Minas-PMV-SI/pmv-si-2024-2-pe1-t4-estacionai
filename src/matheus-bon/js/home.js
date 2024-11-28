const apiUrl = "https://estacionai-bd.onrender.com/estacionamentos";

const loadEstacionamentos = async () => {
    try {
        const response = await fetch(apiUrl);
        const estacionamentos = await response.json();
        return estacionamentos;
    } catch (error) {
        console.error("Erro ao carregar os estacionamentos:", error);
        return [];
    }
};


const displaySuggestions = (estacionamentos) => {
    const suggestionsList = document.getElementById("suggestions-list");
    suggestionsList.innerHTML = ''; 

    estacionamentos.forEach(estacionamento => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "w-100");
        li.textContent = estacionamento.nome;
        suggestionsList.appendChild(li);
    });

    document.getElementById("suggestions-box").classList.remove("d-none");
};

const searchBox = document.getElementById("search-box");

searchBox.addEventListener("focus", async function () {
    const estacionamentos = await loadEstacionamentos();
    displaySuggestions(estacionamentos);
});

document.addEventListener("click", function (event) {
    if (!event.target.closest(".search-container")) {
        document.getElementById("suggestions-box").classList.add("d-none");
    }
});
