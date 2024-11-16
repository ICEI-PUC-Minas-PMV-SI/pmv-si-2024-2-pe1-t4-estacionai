const API_URL = "https://estacionai-bd.onrender.com/hisorico_reservas";

// Pega a lista toda https://estacionai-bd.onrender.com/hisorico_reservas
// Pega um item https://estacionai-bd.onrender.com/hisorico_reservas/:id

// Função para enviar os dados para o servidor
async function submitSearch() {
    const local = document.getElementById("local").value;
    const veiculo = document.getElementById("veiculo").value;
    const placa = document.getElementById("placa").value;

    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Limpar resultados anteriores

    // const idUsuario = localStorage.getItem('idUsuario');
    const idUsuario = "2584";

    


    try {

        popularBancoHistorico();
        //apagarBancoHistorico();

        // https://estacionai-bd.onrender.com/hisorico_reservas?idUsuario=2584&veiculo=Corolla


        let filter = `?idUsuario=${idUsuario}`

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
            <p><strong>Ref. Vaga:</strong> ${item.vaga}</p>
            <p><strong>Data de Reserva:</strong> ${formattedDate}</p>
            <p><strong>Veículo:</strong> ${item.veiculo}</p>
            <p><strong>Placa:</strong> ${item.placa}</p>
            <p><strong>Horário:</strong> ${item.horario}</p>
            <p><strong>Método de Pagamento:</strong> No Local</p>
            <p><strong>Total de horas:</strong> 1:00h</p>
            <p><strong>Locador:</strong> ${item.locador}</p>
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

const receiptFixedData = [{
    id: "1",
    idUsuario: "2584",
    data: new Date("2024/09/28"),
    local: "Estacionamento Esperança",
    veiculo: "Corolla",
    placa: "HPP-2031",
    horario: "08:35hs - 09:35hs",
    valor: 20.00,
    vaga: "Vaga A",
    locador: "Carlos Silva"
},
{
    id: "2",
    idUsuario: "2584",
    data: new Date("2024/07/28"),
    local: "Estacionamento Esperança",
    veiculo: "HRV",
    placa: "HPC-1530",
    horario: "08:35hs - 09:35hs",
    valor: 25.00,
    vaga: "Vaga B",
    locador: "Pedro Paulo"
},
{
    id: "3",
    idUsuario: "1452",
    data: new Date("2024/10/15"),
    local: "Estacionamento Central",
    veiculo: "Civic",
    placa: "ABC-1234",
    horario: "12:00hs - 13:00hs",
    valor: 27.00,
    vaga: "Vaga C",
    locador: "José Almeida"
},
{
    id: "4",
    idUsuario: "3689",
    data: new Date("2024/11/01"),
    local: "Estacionamento da Praia",
    veiculo: "Fiesta",
    placa: "KLM-5678",
    horario: "09:00hs - 10:30hs",
    valor: 17.00,
    vaga: "Vaga D",
    locador: "Maria Souza"
},
{
    id: "5",
    idUsuario: "9876",
    data: new Date("2024/08/20"),
    local: "Shopping Norte",
    veiculo: "EcoSport",
    placa: "XYZ-4321",
    horario: "14:30hs - 16:00hs",
    valor: 23.00,
    vaga: "Vaga E",
    locador: "Luiz Fernando"
},
{
    id: "6",
    idUsuario: "2345",
    data: new Date("2024/12/05"),
    local: "Aeroporto Internacional",
    veiculo: "Hilux",
    placa: "QWE-7654",
    horario: "06:45hs - 08:15hs",
    valor: 22.00,
    vaga: "Vaga F",
    locador: "Fernanda Ribeiro"
},
{
    id: "7",
    idUsuario: "5637",
    data: new Date("2024/09/20"),
    local: "Estacionamento Esperança",
    veiculo: "Onix",
    placa: "RTY-6789",
    horario: "10:00hs - 11:30hs",
    valor: 24.00,
    vaga: "Vaga G",
    locador: "Ricardo Lima"
},
{
    id: "8",
    idUsuario: "8721",
    data: new Date("2024/06/17"),
    local: "Estacionamento da Universidade",
    veiculo: "Corsa",
    placa: "UIO-3456",
    horario: "08:00hs - 09:30hs",
    valor: 18.00,
    vaga: "Vaga H",
    locador: "Ana Clara"
},
{
    id: "9",
    idUsuario: "1452",
    data: new Date("2024/05/10"),
    local: "Centro Empresarial",
    veiculo: "Golf",
    placa: "QAZ-1122",
    horario: "07:00hs - 08:00hs",
    valor: 17.00,
    vaga: "Vaga I",
    locador: "Bruno Costa"
},
{
    id: "10",
    idUsuario: "2584",
    data: new Date("2024/03/22"),
    local: "Estacionamento Esperança",
    veiculo: "HB20",
    placa: "OPL-9934",
    horario: "15:30hs - 17:00hs",
    valor: 29.00,
    vaga: "Vaga J",
    locador: "Paula Marques"
}];

// Função para popular o banco de dados
async function popularBancoHistorico() {
    for (const vaga of receiptFixedData) {
        const options = {
            method: "POST",
            header: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vaga)
        }

        const res = await fetch(API_URL, options);

        if (!res.ok) {
            console.log('error')
            continue;
        }

        console.log(vaga);
    }
}

// Função para excluir os dados do banco de dados referente ao dados de receiptFixedData
async function apagarBancoHistorico() {
    for (const vaga of receiptFixedData) {
        const options = {
            method: "DELETE",
        }

        const url = API_URL + `/${vaga.id}`
        const res = await fetch(url, options);

        if (!res.ok) {
            console.log('error')
            continue;
        }

        console.log('Banco de dados apagado!');
    }
}

