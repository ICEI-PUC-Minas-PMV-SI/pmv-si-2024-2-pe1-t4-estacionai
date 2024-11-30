const apiUrl = "https://estacionai-bd.onrender.com/estacionamentos";

const loadEstacionamentos = async () => {
    try {
        const response = await fetch(apiUrl);
        const estacionamentos = await response.json();
        return estacionamentos;
    } catch (error) {
        console.error("Erro ao carregar os estacionamentos:", error);
    }
};

const displayEstacionamentos = (estacionamentos) => {
    const vagasList = document.querySelector(".vagas-list");
    vagasList.innerHTML = "";

    estacionamentos.forEach(el => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "px-5", "py-3", "d-sm-inline-flex", "align-items-center", "justify-content-between");
        li.setAttribute("data-bs-toggle", "modal");
        li.setAttribute("data-bs-target", "#modalEstacionamento");
        li.setAttribute("data-id", el.id);

        li.innerHTML = `
            <div>
              <h5>${el.nome}</h5>
              <p>${el.endereco}</p>
            </div>
            <div>
              <h5>Valor</h5>
              <span>${formatCurrency(el.valor) + typePaymentPeriod(el.valor_tipo) || "N/A"}</span>
            </div>
        `;
        vagasList.appendChild(li);
    });
};

const handleSearch = (estacionamentos) => {
    const searchBox = document.getElementById("search-box");
    const suggestionsBox = document.getElementById("suggestions-box");

    searchBox.addEventListener("input", () => {
        const query = searchBox.value.toLowerCase();

        const filteredEstacionamentos = estacionamentos.filter(est =>
            est.nome.toLowerCase().includes(query) || est.endereco.toLowerCase().includes(query)
        );

        displayEstacionamentos(filteredEstacionamentos);

        if (filteredEstacionamentos.length > 0) {
            suggestionsBox.classList.remove("d-none");
        } else {
            suggestionsBox.classList.add("d-none");
        }
    });
};

const saveReserva = async (estacionamentoId, tempoDesejado) => {
    try {
        const reserva = {
            idEstacionamento: estacionamentoId,
            tempo: tempoDesejado,
            status: "pendente"
        };

        const response = await fetch("https://estacionai-bd.onrender.com/reservas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reserva)
        });

        if (response.ok) {
            const data = await response.json();
            alert("Reserva realizada com sucesso!");
        } else {
            throw new Error(`Erro ao salvar a reserva: ${response.status}`);
        }
    } catch (error) {
        console.error("Erro ao salvar reserva:", error);
        alert("Não foi possível realizar a reserva. Tente novamente.");
    }
};

const handleModal = (estacionamentos) => {
    const modal = new bootstrap.Modal(document.getElementById("modalEstacionamento"));
    const modalNome = document.getElementById("modalEstacionamentoLabel");
    const modalEndereco = document.getElementById("modal-endereco");
    const modalValor = document.getElementById("modal-valor");
    const modalHorario = document.getElementById("modal-horario");
    const modalCapacidade = document.getElementById("modal-capacidade");

    const modalConfirmacao = new bootstrap.Modal(document.getElementById("modalConfirmacao"));
    const tempoDesejadoInput = document.getElementById("tempo-desejado");
    const tempoDesejadoLab = document.getElementById("tempo-desejado-lab");

    let estacionamentoSelecionado = null;

    document.getElementById("vagas-list").addEventListener("click", function (event) {
        const li = event.target.closest("li");
        if (li) {
            const id = li.getAttribute("data-id");
            estacionamentoSelecionado = estacionamentos.find(est => est.id == id);

            if (estacionamentoSelecionado) {
                modalNome.textContent = estacionamentoSelecionado.nome;
                modalEndereco.textContent = estacionamentoSelecionado.endereco;
                modalValor.textContent = formatCurrency(estacionamentoSelecionado.valor);
                modalHorario.textContent = estacionamentoSelecionado.horario || "Não informado";
                modalCapacidade.textContent = estacionamentoSelecionado.capacidade || "Não informado";
                tempoDesejadoLab.textContent = `Tempo Desejado (em ${estacionamentoSelecionado.valor_tipo})`;

                modal.show();
            } else {
                alert("Estacionamento não encontrado.");
            }
        }
    });

    document.getElementById("confirmar-btn").addEventListener("click", function () {
        const tempoDesejado = parseInt(tempoDesejadoInput.value, 10);
        if (!tempoDesejado || tempoDesejado <= 0) {
            alert("Por favor, insira um tempo válido para a vaga.");
            return;
        }

        if (estacionamentoSelecionado) {
            saveReserva(estacionamentoSelecionado.id, tempoDesejado);
            modal.hide();
        } else {
            alert("Nenhum estacionamento selecionado.");
        }
    });
};

const startUpdatingEstacionamentos = async () => {
    let items = await loadEstacionamentos();

    displayEstacionamentos(items);

    handleSearch(items);

    handleModal(items);

    setInterval(async () => {
        items = await loadEstacionamentos();
        displayEstacionamentos(items);
        handleModal(items);
    }, 30000);
};

document.addEventListener("DOMContentLoaded", () => {
    startUpdatingEstacionamentos();
});
