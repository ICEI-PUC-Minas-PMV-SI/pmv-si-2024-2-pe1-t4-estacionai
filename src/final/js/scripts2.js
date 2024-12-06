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


// Array para armazenar os estacionamentos
let estacionamentos = [
    {
        id: 1,
        title: 'Estacionamento 1',
        address: 'Rua A, 123',
        priceHourly: '',
        priceDaily: '10',
        priceMonthly: '',
        size: 15,
        vagas: 5,
        ocupadas: 3,
        image: 'images/ImagemEstacionamento.png',
        status: 'Ativo',
        hoursType: '24',
        openTime: '',
        closeTime: ''
    },
    {
        id: 2,
        title: 'Estacionamento 2',
        address: 'Rua B, 456',
        priceHourly: '15',
        priceDaily: '',
        priceMonthly: '',
        size: 20,
        vagas: 10,
        ocupadas: 0, // nova propriedade
        image: 'images/ImagemEstacionamento.png',
        status: 'Ativo',
        hoursType: 'specific',
        openTime: '08:00',
        closeTime: '20:00'
    },
    {
        id: 3,
        nome: 'Estacionamento 3',
        endereco: 'Rua C, 789',
        priceHourly: '12',
        priceDaily: '250',
        priceMonthly: '',
        size: 25,
        vagas: 15,
        ocupadas: 5, // exemplo de vagas ocupadas
        image: 'images/ImagemEstacionamento.png',
        status: 'Inativo',
        hoursType: '24',
        openTime: '',
        closeTime: ''
    }
];

// Função para renderizar os estacionamentos na lista
async function renderEstacionamentos() {
    const estacionamentoList = document.getElementById('estacionamentoList');
    estacionamentoList.innerHTML = '';

    try {
        const response = await fetch('https://estacionai-bd.onrender.com/estacionamentos');
        const estacionamentos = await response.json();

        if (estacionamentos.length === 0) {
            const noEstacionamentosMessage = document.createElement('div');
            noEstacionamentosMessage.className = 'alert alert-info text-center';
            noEstacionamentosMessage.textContent = 'Você Não Possui Estacionamentos';
            estacionamentoList.appendChild(noEstacionamentosMessage);
            return;
        }

        estacionamentos.forEach(estacionamento => {

            const valor = formatCurrency(estacionamento.valor) + typePaymentPeriod(estacionamento.valor_tipo);
            const newEstacionamentoItem = document.createElement('div');
            newEstacionamentoItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            newEstacionamentoItem.innerHTML = `
                <div>
                    <h5>${estacionamento.nome}</h5>
                    <p><strong>Endereço:</strong> ${estacionamento.endereco}</p>
                    <p><strong>Preço:</strong> ${valor}</p>
                    <p><strong>Número de Vagas:</strong> ${estacionamento.vagas.length}</p>
                </div>
                <div>
                    <button class="btn btn-primary me-2" onclick="openEditModal('${estacionamento.id}')">Editar</button>
                    <button class="btn btn-primary" onclick="confirmDelete('${estacionamento.id}')">Excluir</button>
                </div>
            `;
            estacionamentoList.appendChild(newEstacionamentoItem);
        });
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger text-center';
        errorMessage.textContent = 'Erro ao carregar estacionamentos';
        estacionamentoList.appendChild(errorMessage);
    }
}



// Chama a função para renderizar os estacionamentos na inicialização
document.addEventListener('DOMContentLoaded', renderEstacionamentos);

function openAddModal() {
    document.getElementById('addEstacionamentoForm').reset();
    toggleHourInputs(); // Resetar a exibição dos campos de horário
    const addEstacionamentoModal = new bootstrap.Modal(document.getElementById('addEstacionamentoModal'));
    addEstacionamentoModal.show();
}

async function openEditModal(estacionamentoId) {
    console.log(estacionamentoId)
    try {
        const response = await fetch(`https://estacionai-bd.onrender.com/estacionamentos/${estacionamentoId}`);
        const estacionamento = await response.json();

        document.getElementById('editEstacionamentoTitle').dataset.id = estacionamentoId;

        const valorTp = estacionamento.valor_tipo;
        const inptValor = valorTp === 'hora' ? "editPriceHourlyInput" :
            valorTp === "diaria" ? "editPriceDailyInput" :
                valorTp === "mes" ? "editPriceMonthlyInput" : "editPriceHourlyInput";

        document.getElementById('editEstacionamentoTitle').value = estacionamento.nome;
        document.getElementById('editEstacionamentoAddress').value = estacionamento.endereco;

        document.getElementById('editEstacionamentoVagas').value = estacionamento.vagas.length;
        document.getElementById('editEstacionamentoHoursType').value = estacionamento.hoursType || '24';
        document.getElementById('editEstacionamentoOpenTime').value = estacionamento.openTime || '';
        document.getElementById('editEstacionamentoCloseTime').value = estacionamento.closeTime || '';

        toggleEditHourInputs();
        const editEstacionamentoModal = new bootstrap.Modal(document.getElementById('editEstacionamentoModal'));
        editEstacionamentoModal.show();
    } catch (error) {
        alert('Erro ao carregar dados do estacionamento');
    }
}


function toggleHourInputs() {
    const hoursType = document.getElementById('estacionamentoHoursType').value;
    document.getElementById('specificHours').style.display = hoursType === 'specific' ? 'block' : 'none';
}

function toggleEditHourInputs() {
    const hoursType = document.getElementById('editEstacionamentoHoursType').value;
    document.getElementById('editSpecificHours').style.display = hoursType === 'specific' ? 'block' : 'none';
}

async function addEstacionamento() {
    const newEstacionamento = {
        nome: document.getElementById('estacionamentoTitle').value,
        endereco: document.getElementById('estacionamentoAddress').value,
        valor: parseFloat(document.getElementById('valor').value),
        valor_tipo: document.getElementById('editEstacionamentoValorTipo').value,
        vagas: Array(parseInt(document.getElementById('estacionamentoVagas').value)).fill(null).map((_, index) => ({
            id: index,
            nome: `vaga-${index}`,
            status: 0
        })),
        hoursType: document.getElementById('estacionamentoHoursType').value,
        openTime: document.getElementById('estacionamentoOpenTime').value,
        closeTime: document.getElementById('estacionamentoCloseTime').value,
        idAdmin: localStorage.getItem('userId')
    };

    try {
        const response = await fetch('https://estacionai-bd.onrender.com/estacionamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEstacionamento)
        });

        if (response.ok) {
            renderEstacionamentos();
            const addEstacionamentoModal = bootstrap.Modal.getInstance(document.getElementById('addEstacionamentoModal'));
            addEstacionamentoModal.hide();
            alert('Estacionamento cadastrado com sucesso!');
        } else {
            throw new Error('Erro ao salvar estacionamento');
        }
    } catch (error) {
        alert('Erro ao cadastrar estacionamento: ' + error.message);
    }
}

async function updateEstacionamento() {
    const estacionamentoId = document.getElementById('editEstacionamentoTitle').dataset.id;
    const updatedEstacionamento = {
        nome: document.getElementById('editEstacionamentoTitle').value,
        endereco: document.getElementById('editEstacionamentoAddress').value,
        valor: document.getElementById('valor').value,
        valor_tipo: document.getElementById('editEstacionamentoValorTipo').value,
        vagas: Array(parseInt(document.getElementById('editEstacionamentoVagas').value)).fill(null),
        hoursType: document.getElementById('editEstacionamentoHoursType').value,
        openTime: document.getElementById('editEstacionamentoOpenTime').value,
        closeTime: document.getElementById('editEstacionamentoCloseTime').value
    };

    try {
        const response = await fetch(`https://estacionai-bd.onrender.com/estacionamentos/${estacionamentoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEstacionamento)
        });

        if (response.ok) {
            renderEstacionamentos();
            const editEstacionamentoModal = bootstrap.Modal.getInstance(document.getElementById('editEstacionamentoModal'));
            editEstacionamentoModal.hide();
            alert('Estacionamento atualizado com sucesso!');
        } else {
            throw new Error('Erro ao atualizar estacionamento');
        }
    } catch (error) {
        alert('Erro ao atualizar estacionamento: ' + error.message);
    }
}

function toggleStatus(estacionamentoId) {
    const estacionamento = estacionamentos.find(e => e.id === estacionamentoId);
    estacionamento.status = estacionamento.status === 'Ativo' ? 'Inativo' : 'Ativo';
    renderEstacionamentos();
}

function confirmDelete(estacionamentoId) {
    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    confirmDeleteModal.show();

    document.getElementById('confirmDeleteButton').onclick = function () {
        deleteEstacionamento(estacionamentoId);
        confirmDeleteModal.hide();
    };
}

async function deleteEstacionamento(estacionamentoId) {
    try {
        const response = await fetch(`https://estacionai-bd.onrender.com/estacionamentos/${estacionamentoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            renderEstacionamentos();
            alert('Estacionamento excluído com sucesso!');
        } else {
            throw new Error('Erro ao excluir estacionamento');
        }
    } catch (error) {
        alert('Erro ao excluir estacionamento: ' + error.message);
    }
}
