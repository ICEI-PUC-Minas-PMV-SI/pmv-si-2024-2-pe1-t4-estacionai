const idUser = localStorage.getItem("userId");

if (!idUser) {
    window.location.href = "./login.html";
}


const API_URL = "https://estacionai-bd.onrender.com/historico_reservas";

// Pega a lista toda https://estacionai-bd.onrender.com/historico_reservas
// Pega um item https://estacionai-bd.onrender.com/historico_reservas/:id

// Função para enviar os dados para o servidor
async function submitSearch() {
    const local = document.getElementById("local").value;
    const veiculo = document.getElementById("veiculo").value;
    const placa = document.getElementById("placa").value;

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Limpar resultados anteriores

    const userId = localStorage.getItem('userId');
    //const idUsuario = "2584";

    


    try {

        // https://estacionai-bd.onrender.com/historico_reservas?idUsuario=2584&veiculo=Corolla


        let filter = `?userId=${userId}`

        if (local) {
            filter = filter + `&estacionamento=${local}`;
        }
        if (veiculo) {
            filter = filter + `&veiculo=${veiculo}`;
        }
        if (placa) {
            filter = filter + `&placa=${placa}`;
        }


        const url = API_URL + filter;
        const response = await fetch(url);

        if (!response.ok) {
            alert('Erro ao buscar vagas. Tente novamente.');
            console.error(response.text);
            return;
        }

        const data = await response.json();

        console.log(data); // Verificar o que está sendo retornado pelo servidor

        // Verifica se a resposta é um array
        if (Array.isArray(data)) {
            if (data.length === 0) {
                resultsContainer.innerHTML = "<p>Nenhum histórico encontrado.</p>";
            } else {
                data.forEach(renderResult); // Função para exibir cada resultado individualmente
            }
        } else if (typeof data === "object") {
            renderResult(data); // Exibe um único resultado, se data for objeto
        } else {
            resultsContainer.innerHTML = "<p>Erro: resposta inesperada do servidor.</p>";
        }

        showHistory();
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        resultsContainer.innerHTML = "<p>Erro ao buscar dados. Tente novamente.</p>";
    }

}

// Função para renderizar cada entrada de resultado
function renderResult(entry) {

    const formatterPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    const resultsContainer = document.getElementById("results");

    const formattedDate = new Date(entry.data).toLocaleDateString("pt-BR");

    const resultItem = document.createElement("li");
    resultItem.classList.add("result-item");
    resultItem.id = entry.id
    resultItem.innerHTML = `
        <h2>${entry.local}</h2>
        <p>Data: ${formattedDate}</p>
        <p>Veículo: ${entry.veiculo}</p>
        <p>Placa: ${entry.placa}</p>
        <p>Horário: ${entry.horario}</p>
        <p>Valor: ${formatterPrice.format(entry.valor)}</p>
        <button onclick="viewReceipt(${entry.id})">Ver Recibo</button>
    `;
    resultsContainer.appendChild(resultItem);
}

// Função para exibir o recibo com dados fixos
async function viewReceipt(id) {

    const url = API_URL + `/${id}`;
    const res = await fetch(url);
    const item = await res.json();

    const resultsContainer = document.getElementById("receiptContent");

    // Formatar data no formato "dia/mês/ano"
    const formattedDate = new Date(item.data).toLocaleDateString("pt-BR");
    const formatterPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    resultsContainer.innerHTML = `
        <h3 class="text-center">Recibo de Reserva</h3>
        <p style="text-align: center; font-size: 24px; font-weight: bold;">${formatterPrice.format(item.valor)}</p>
        <div class="details">
            <p><strong>Local:</strong> ${item.local}</p>
            <p><strong>Data de Reserva:</strong> ${formattedDate}</p>
            <p><strong>Veículo:</strong> ${item.veiculo}</p>
            <p><strong>Placa:</strong> ${item.placa}</p>
            <p><strong>Horário:</strong> ${item.horario}</p>
            <p><strong>Método de Pagamento:</strong> No Local</p>
            <p><strong>Total de horas:</strong> 1:00h</p>
            <p><strong>Locador:</strong> ${item.locador || "Não divulgado"}</p>
            <p><strong>Total:</strong> ${formatterPrice.format(item.valor)}</p>
            <p><strong>Valor hora:</strong> ${formatterPrice.format(item.valor)}</p>
        </div>
    `;
    new bootstrap.Modal(document.getElementById('receiptModal')).show();
}

// Função para exibir a seção de histórico
function showHistory() {
    document.getElementById("searchForm").style.display = "none";
    document.getElementById("historySection").style.display = "block";
}

// Função para mostrar o formulário de busca novamente
function showSearchForm() {
    document.getElementById("searchForm").style.display = "block";
    document.getElementById("historySection").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    const idUser = localStorage.getItem("userId");
    const cargo = localStorage.getItem("cargo");
    const meusDadosItem = document.getElementById("meusDadosItem");
    const minhasVagas = document.getElementById("minhasVagas");
    const cadastraLoginLi = document.getElementById("cadastra-login-li");
    const profile = document.getElementById("profile");

    if (idUser) {
        meusDadosItem.style.display = "block";
        cadastraLoginLi.style.display = "none";
        profile.style.display = "block";
    }

    if(cargo === 'admin') {
        minhasVagas.style.display = "block";
    }
});