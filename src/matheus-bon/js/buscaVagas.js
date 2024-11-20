const apiUrl = "https://estacionai-bd.onrender.com/estacionamentos";

const loadEstacionamentos = async () => {
    try {
        const response = await fetch(apiUrl);
        const estacionamentos = await response.json();

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

        return estacionamentos;
    } catch (error) {
        console.error("Erro ao carregar os estacionamentos:", error);
    }
}

const handleModal = (estacionamentos) => {
    document
        .getElementById("confirmar-btn")
        .addEventListener("click", function () {
            const modalConfirmacao = new bootstrap.Modal(
                document.getElementById("modalConfirmacao")
            );
            modalConfirmacao.show();
        });

    const modal = new bootstrap.Modal(document.getElementById("modalEstacionamento"));
    const modalNome = document.getElementById("modalEstacionamentoLabel");
    const modalEndereco = document.getElementById("modal-endereco");
    const modalValor = document.getElementById("modal-valor");
    const modalHorario = document.getElementById("modal-horario");
    const modalCapacidade = document.getElementById("modal-capacidade");

    document.getElementById("vagas-list").addEventListener("click", function (event) {
        const li = event.target.closest("li");
        if (li) {
            const id = li.getAttribute("data-id");
            const estacionamento = estacionamentos.find(est => est.id == id);

            modalNome.textContent = estacionamento.nome;
            modalEndereco.textContent = estacionamento.endereco;
            modalValor.textContent = formatCurrency(estacionamento.valor);
            modalHorario.textContent = estacionamento.horario;
            modalCapacidade.textContent = estacionamento.capacidade;

            modal.show();
        }
    });
}

const main = async () => {
    const estacionamentos = await loadEstacionamentos();
    handleModal(estacionamentos);
    return;
}

setInterval(main, 10000);