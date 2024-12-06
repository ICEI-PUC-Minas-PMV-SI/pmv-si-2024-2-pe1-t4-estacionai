const idUser = localStorage.getItem("userId");
const cargo = localStorage.getItem("cargo");

const meusDadosItem = document.getElementById("meusDadosItem");
const minhasVagas = document.getElementById("minhasVagas");
const cadastraLoginLi = document.getElementById("cadastra-login-li");
const profile = document.getElementById("profile");

if (!idUser) {
    window.location.href = "./login.html";
} else {
    meusDadosItem.style.display = "block";
    cadastraLoginLi.style.display = "none";
    profile.style.display = "block";
}

if (cargo !== 'admin') {
    localStorage.clear();
    window.location.href = "./login.html";
} else {
    minhasVagas.style.display = "block";
}






// Array para armazenar as vagas
let vagas = [
    {
        id: 1,
        title: 'Vaga 1',
        address: 'Rua A, 123',
        priceHourly: '',
        priceDaily: '10',
        priceMonthly: '',
        size: 15,
        status: 'Ativa',
        hoursType: '24',
        openTime: '',
        closeTime: ''
    },
    {
        id: 2,
        title: 'Vaga 2',
        address: 'Rua B, 456',
        priceHourly: '15',
        priceDaily: '',
        priceMonthly: '',
        size: 20,
        status: 'Ativa',
        hoursType: 'specific',
        openTime: '08:00',
        closeTime: '20:00'
    },
    {
        id: 3,
        title: 'Vaga 3',
        address: 'Rua C, 789',
        priceHourly: '12',
        priceDaily: '250',
        priceMonthly: '',
        size: 25,
        status: 'Inativa',
        hoursType: '24',
        openTime: '',
        closeTime: ''
    }
];

// Função para renderizar as vagas na lista
async function renderVagas() {
    const vagaList = document.getElementById('vagaList');
    vagaList.innerHTML = '';
    const userId = localStorage.getItem('userId');

    try {
        const response = await fetch('https://estacionai-bd.onrender.com/estacionamentos');
        const estacionamentos = await response.json();

        const userEstacionamentos = estacionamentos.filter(est => est.idAdmin === userId);

        if (userEstacionamentos.length === 0) {
            const noVagasMessage = document.createElement('div');
            noVagasMessage.className = 'alert alert-info text-center';
            noVagasMessage.textContent = 'Você Não Possui Vagas Cadastradas';
            vagaList.appendChild(noVagasMessage);
            return;
        }

        userEstacionamentos.forEach(estacionamento => {
            estacionamento.vagas.forEach((vaga, index) => {
                const newVagaItem = document.createElement('div');
                newVagaItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                newVagaItem.innerHTML = `
                    <div>
                        <h5>Vaga ${index + 1} - ${estacionamento.nome}</h5>
                        <p><strong>Endereço:</strong> ${estacionamento.endereco}</p>
                        <p><strong>Preço:</strong> ${formatCurrency(estacionamento.valor)}${typePaymentPeriod(estacionamento.valor_tipo)}</p>
                        <span class="badge text-bg-${!vaga.status ? 'danger' : 'success'}"><strong>Status:</strong> ${!vaga.status ? 'Ocupada' : 'Livre'}</span>
                    </div>
                    <div>
                        <button class="btn btn-${!vaga.status ? 'success' : 'warning'}" onclick="toggleStatus('${estacionamento.id}', '${index}', '${vaga.status}')">
                            ${!vaga.status ? 'Liberar' : 'Ocupar'}
                        </button>
                        <button class="btn btn-primary" onclick="confirmDelete('${estacionamento.id}', '${index}')">Excluir</button>
                    </div>
                `;
                vagaList.appendChild(newVagaItem);
            });
        });
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger text-center';
        errorMessage.textContent = 'Erro ao carregar vagas';
        vagaList.appendChild(errorMessage);
    }
}

// Chama a função para renderizar as vagas na inicialização
document.addEventListener('DOMContentLoaded', renderVagas);

function openAddModal() {
    document.getElementById('addVagaForm').reset();
    toggleHourInputs(); // Resetar a exibição dos campos de horário
    const addVagaModal = new bootstrap.Modal(document.getElementById('addVagaModal'));
    addVagaModal.show();
}

function openEditModal(vagaId) {
    const vaga = vagas.find(v => v.id === vagaId);
    document.getElementById('editVagaTitle').value = vaga.title;
    document.getElementById('editVagaAddress').value = vaga.address;
    document.getElementById('editPriceHourlyInput').value = vaga.priceHourly;
    document.getElementById('editPriceDailyInput').value = vaga.priceDaily;
    document.getElementById('editPriceMonthlyInput').value = vaga.priceMonthly;
    document.getElementById('editVagaSize').value = vaga.size;
    document.getElementById('editVagaHoursType').value = vaga.hoursType;
    document.getElementById('editVagaOpenTime').value = vaga.openTime;
    document.getElementById('editVagaCloseTime').value = vaga.closeTime;

    toggleEditHourInputs(); // Mostrar ou ocultar campos específicos
    const editVagaModal = new bootstrap.Modal(document.getElementById('editVagaModal'));
    editVagaModal.show();
}

function addVaga() {
    const title = document.getElementById('vagaTitle').value;
    const address = document.getElementById('vagaAddress').value;
    const priceHourly = document.getElementById('vagaPriceHourly').value;
    const priceDaily = document.getElementById('vagaPriceDaily').value;
    const priceMonthly = document.getElementById('vagaPriceMonthly').value;
    const size = document.getElementById('vagaSize').value;
    const hoursType = document.getElementById('vagaHoursType').value;
    const openTime = document.getElementById('vagaOpenTime').value;
    const closeTime = document.getElementById('vagaCloseTime').value;

    const newVaga = {
        id: vagas.length + 1, // Simples incremento, pode ser melhorado
        title,
        address,
        priceHourly,
        priceDaily,
        priceMonthly,
        size,
        status: 'Ativa',
        hoursType,
        openTime,
        closeTime
    };

    vagas.push(newVaga);
    renderVagas(); // Atualiza a lista
    const addVagaModal = bootstrap.Modal.getInstance(document.getElementById('addVagaModal'));
    addVagaModal.hide();
}

function updateVaga() {
    const vagaId = vagas.findIndex(v => v.id === parseInt(document.getElementById('editVagaTitle').dataset.id));
    if (vagaId < 0) return;

    const updatedVaga = {
        id: vagas[vagaId].id,
        title: document.getElementById('editVagaTitle').value,
        address: document.getElementById('editVagaAddress').value,
        priceHourly: document.getElementById('editPriceHourlyInput').value,
        priceDaily: document.getElementById('editPriceDailyInput').value,
        priceMonthly: document.getElementById('editPriceMonthlyInput').value,
        size: document.getElementById('editVagaSize').value,
        status: vagas[vagaId].status, // Mantém o status atual
        hoursType: document.getElementById('editVagaHoursType').value,
        openTime: document.getElementById('editVagaOpenTime').value,
        closeTime: document.getElementById('editVagaCloseTime').value
    };

    vagas[vagaId] = updatedVaga;
    renderVagas(); // Atualiza a lista
    const editVagaModal = bootstrap.Modal.getInstance(document.getElementById('editVagaModal'));
    editVagaModal.hide();
}

function toggleHourInputs() {
    const specificHours = document.getElementById('specificHours');
    specificHours.style.display = document.getElementById('vagaHoursType').value === 'specific' ? 'block' : 'none';
}

function toggleEditHourInputs() {
    const editSpecificHours = document.getElementById('editSpecificHours');
    editSpecificHours.style.display = document.getElementById('editVagaHoursType').value === 'specific' ? 'block' : 'none';
}

async function toggleStatus(estacionamentoId, vagaIndex) {
    try {
        const response = await fetch(`https://estacionai-bd.onrender.com/estacionamentos/${estacionamentoId}`);
        const estacionamento = await response.json();

        estacionamento.vagas[vagaIndex].status = estacionamento.vagas[vagaIndex].status ? 0 : 1;

        const updateResponse = await fetch(`https://estacionai-bd.onrender.com/estacionamentos/${estacionamentoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estacionamento)
        });

        if (updateResponse.ok) {
            renderVagas();
        } else {
            throw new Error('Erro ao atualizar status da vaga');
        }
    } catch (error) {
        alert('Erro ao atualizar status da vaga: ' + error.message);
    }
}
function confirmDelete(estacionamentoId, vagaIndex) {
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    confirmDeleteModal.show();

    document.getElementById('confirmDeleteButton').onclick = function () {
        deleteVaga(estacionamentoId, vagaIndex);
        confirmDeleteModal.hide();
    };
}

async function deleteVaga(estacionamentoId, vagaIndex) {
    try {
        const response = await fetch(`https://estacionai-bd.onrender.com/estacionamentos/${estacionamentoId}`);
        const estacionamento = await response.json();

        estacionamento.vagas.splice(vagaIndex, 1);

        const updateResponse = await fetch(`https://estacionai-bd.onrender.com/estacionamentos/${estacionamentoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estacionamento)
        });

        if (updateResponse.ok) {
            renderVagas();
            alert('Vaga excluída com sucesso!');
        } else {
            throw new Error('Erro ao excluir vaga');
        }
    } catch (error) {
        alert('Erro ao excluir vaga: ' + error.message);
    }
}
