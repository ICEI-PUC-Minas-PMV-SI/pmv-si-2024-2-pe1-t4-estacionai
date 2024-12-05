let reservations = [];
let users = [];
let vagas = [];
let estacionamentos = [];

// Função para carregar os usuários do servidor
async function fetchUsers() {
    try {
        const response = await fetch('https://estacionai-bd.onrender.com/usuarios');
        if (!response.ok) {
            throw new Error(`Erro ao carregar os usuários: ${response.status}`);
        }
        const data = await response.json();
        users = data;
        console.log('Usuários carregados:', users);
    } catch (error) {
        console.error('Erro ao carregar os usuários:', error);
    }
}

// Função para carregar as vagas do servidor
async function fetchVagas() {
    try {
        const response = await fetch('https://estacionai-bd.onrender.com/vagas');
        if (!response.ok) {
            throw new Error(`Erro ao carregar as vagas: ${response.status}`);
        }
        const data = await response.json();
        vagas = data;
        console.log('Vagas carregadas:', vagas);
    } catch (error) {
        console.error('Erro ao carregar as vagas:', error);
    }
}

// Função para carregar os estacionamentos do servidor
async function fetchEstacionamentos() {
    try {
        const response = await fetch('https://estacionai-bd.onrender.com/estacionamentos');
        if (!response.ok) {
            throw new Error(`Erro ao carregar os estacionamentos: ${response.status}`);
        }
        const data = await response.json();
        estacionamentos = data;
        console.log('Estacionamentos carregados:', estacionamentos);
    } catch (error) {
        console.error('Erro ao carregar os estacionamentos:', error);
    }
}

// Função para carregar as reservas do servidor
async function fetchReservations() {
    try {
        const response = await fetch('https://estacionai-bd.onrender.com/reservas');
        if (!response.ok) {
            throw new Error(`Erro ao carregar as reservas: ${response.status}`);
        }
        const data = await response.json();
        reservations = data;
        console.log('Reservas carregadas:', reservations);
        await fetchUsers(); // Carrega os usuários antes de renderizar as reservas
        await fetchVagas(); // Carrega as vagas
        await fetchEstacionamentos(); // Carrega os estacionamentos
        renderReservations();
    } catch (error) {
        console.error('Erro ao carregar as reservas:', error);
    }
}

// Função para renderizar as reservas na página
function renderReservations() {
    const reservationsList = document.getElementById('reservationsList');
    reservationsList.innerHTML = '';

    reservations.forEach(reservation => {
        // Apenas processa reservas com status 'pendente'
        if (reservation.status !== 'pendente') {
            return;
        }

        // Encontra o usuário associado à reserva
        const user = users.find(u => u.id === reservation.idUsuario);
        const userName = user ? user.nome : 'Cliente Anônimo';

        // Encontra o estacionamento associado à reserva
        const estacionamento = estacionamentos.find(e => e.id === reservation.idEstacionamento);
        const estacionamentoNome = estacionamento ? estacionamento.nome : 'Estacionamento Desconhecido';

        // Formata a data e o horário, usando a data e hora atuais se não estiverem presentes
        const dataReserva = reservation.data ? formatDate(reservation.data) : formatCurrentDateBrasilia();
        const horarioReserva = reservation.horario ? reservation.horario : formatCurrentTimeBrasilia();

        // Log para depuração
        console.log('Processando reserva:', reservation);

        const listItem = document.createElement('div');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-person-circle me-3" style="font-size: 2rem; color: #6c757d;"></i>
                <div>
                    <h5 class="mb-1">${userName}</h5>
                    <small>${dataReserva} | ${horarioReserva}</small><br>
                    <small>${estacionamentoNome}</small>
                </div>
            </div>
            <div>
                <button class="btn btn-aprov me-2" onclick="openConfirmModal('${reservation.id}')">Aprovar</button>
                <button class="btn btn-secondary" onclick="rejectReservation('${reservation.id}')">Recusar</button>
            </div>
        `;
        reservationsList.appendChild(listItem);
    });
}

// Função para formatar a data
function formatDate(dateString) {
    if (!dateString) return 'Data não informada';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo' };
    const date = new Date(dateString);
    if (isNaN(date)) return 'Data inválida';
    return date.toLocaleDateString('pt-BR', options);
}

// Função para obter a data atual no fuso horário de Brasília
function formatCurrentDateBrasilia() {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo' };
    const now = new Date();
    return new Intl.DateTimeFormat('pt-BR', options).format(now);
}

// Função para obter o horário atual no fuso horário de Brasília
function formatCurrentTimeBrasilia() {
    const options = { hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo' };
    const now = new Date();
    return new Intl.DateTimeFormat('pt-BR', options).format(now);
}

// Carrega as reservas ao carregar a página
document.addEventListener('DOMContentLoaded', fetchReservations);

// Função para abrir o modal de confirmação
function openConfirmModal(reservationId) {
    document.getElementById('reservationId').value = reservationId;
    populateVagaSelect(reservationId);
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    confirmModal.show();
}

// Função para popular o select de vagas disponíveis
function populateVagaSelect(reservationId) {
    const vagaSelect = document.getElementById('vagaSelect');
    vagaSelect.innerHTML = '<option value="" disabled selected>Escolha uma opção...</option>';

    // Encontra a reserva atual
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return;

    // Filtrar vagas não ocupadas e do estacionamento correspondente
    const vagasDisponiveis = vagas.filter(v => v.ocupado == 0 && v.idEstacionamento === reservation.idEstacionamento);

    vagasDisponiveis.forEach(vaga => {
        const option = document.createElement('option');
        option.value = vaga.id;
        option.textContent = vaga.titulo;
        vagaSelect.appendChild(option);
    });
}

// Função para aprovar a reserva
document.getElementById('vagaForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const vagaSelect = document.getElementById('vagaSelect');
    if (vagaSelect.checkValidity()) {
        const reservationId = document.getElementById('reservationId').value;
        const reservation = reservations.find(r => r.id === reservationId);

        if (!reservation) {
            alert('Reserva não encontrada.');
            return;
        }

        // Atualiza o status da vaga para ocupado
        const vagaId = vagaSelect.value;
        const vaga = vagas.find(v => v.id === vagaId);
        if (vaga) {
            vaga.ocupado = 1;
            try {
                // Atualiza a vaga no servidor
                await fetch(`https://estacionai-bd.onrender.com/vagas/${vagaId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(vaga),
                });
            } catch (error) {
                console.error('Erro ao atualizar a vaga:', error);
            }
        }

        // Encontra o estacionamento associado à reserva
        const estacionamento = estacionamentos.find(e => e.id === reservation.idEstacionamento);

        // Encontra o usuário associado à reserva
        const user = users.find(u => u.id === reservation.idUsuario);

        // Prepara os dados da reserva atualizada
        const updatedReservation = {
            idReserva: reservation.id,
            idUsuario: reservation.idUsuario,
            data: reservation.data || formatCurrentDateBrasilia(),
            local: estacionamento ? estacionamento.nome : 'Local não especificado',
            veiculo: reservation.veiculo || 'Veículo não especificado',
            placa: reservation.placa || 'Placa não especificada',
            horario: reservation.horario || `${formatCurrentTimeBrasilia()} - ${formatCurrentTimeBrasilia()}`,
            valor: reservation.valor || 0,
            vaga: vaga ? vaga.titulo : 'Vaga não especificada',
            locador: user ? user.nome : 'Locador não especificado',
            status: 'aprovado'
        };

        try {
            // Primeiro, adiciona ao histórico
            const addResponse = await fetch('https://estacionai-bd.onrender.com/historico_reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedReservation),
            });

            if (!addResponse.ok) {
                const errorMessage = await addResponse.text();
                throw new Error(`Erro ${addResponse.status}: ${errorMessage || addResponse.statusText}`);
            }

            // Em seguida, remove das reservas
            const deleteResponse = await fetch(`https://estacionai-bd.onrender.com/reservas/${reservationId}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                const errorMessage = await deleteResponse.text();
                throw new Error(`Erro ${deleteResponse.status}: ${errorMessage || deleteResponse.statusText}`);
            }

            // Fecha o modal de confirmação
            const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
            confirmModal.hide();

            // Exibe o modal de reserva confirmada
            showConfirmationModal(updatedReservation);

            // Atualiza a lista de reservas
            await fetchReservations();

            // Limpa o formulário
            vagaSelect.value = '';
            vagaSelect.classList.remove('is-invalid');

        } catch (error) {
            console.error('Erro ao aprovar a reserva:', error);
            alert(`Erro ao aprovar a reserva: ${error.message}`);
        }

    } else {
        vagaSelect.classList.add('is-invalid');
    }
});

// Função para recusar a reserva
async function rejectReservation(reservationId) {
    if (confirm('Tem certeza que deseja recusar esta reserva?')) {
        const reservation = reservations.find(r => r.id === reservationId);

        if (!reservation) {
            alert('Reserva não encontrada.');
            return;
        }

        // Encontra o estacionamento associado à reserva
        const estacionamento = estacionamentos.find(e => e.id === reservation.idEstacionamento);

        // Encontra o usuário associado à reserva
        const user = users.find(u => u.id === reservation.idUsuario);

        // Prepara os dados da reserva atualizada
        const updatedReservation = {
            idReserva: reservation.id,
            idUsuario: reservation.idUsuario,
            data: reservation.data || formatCurrentDateBrasilia(),
            local: estacionamento ? estacionamento.nome : 'Local não especificado',
            veiculo: reservation.veiculo || 'Veículo não especificado',
            placa: reservation.placa || 'Placa não especificada',
            horario: reservation.horario || `${formatCurrentTimeBrasilia()} - ${formatCurrentTimeBrasilia()}`,
            valor: reservation.valor || 0,
            vaga: 'Vaga não especificada',
            locador: user ? user.nome : 'Locador não especificado',
            status: 'recusado'
        };

        try {
            // Primeiro, adiciona ao histórico
            const addResponse = await fetch('https://estacionai-bd.onrender.com/historico_reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedReservation),
            });

            if (!addResponse.ok) {
                const errorMessage = await addResponse.text();
                throw new Error(`Erro ${addResponse.status}: ${errorMessage || addResponse.statusText}`);
            }

            // Em seguida, remove das reservas
            const deleteResponse = await fetch(`https://estacionai-bd.onrender.com/reservas/${reservationId}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                const errorMessage = await deleteResponse.text();
                throw new Error(`Erro ${deleteResponse.status}: ${errorMessage || deleteResponse.statusText}`);
            }

            // Atualiza a lista de reservas
            await fetchReservations();

            alert('Reserva recusada com sucesso.');

        } catch (error) {
            console.error('Erro ao recusar a reserva:', error);
            alert(`Erro ao recusar a reserva: ${error.message}`);
        }
    }
}

// Função para mostrar o modal de confirmação
function showConfirmationModal(reservation) {
    const totalHours = calculateHours(reservation.horario);
    const totalAmount = reservation.valor ? parseFloat(reservation.valor).toFixed(2) : '0.00';
    const valorHora = totalHours > 0 ? (reservation.valor / totalHours).toFixed(2) : '0.00';

    // Obter o nome do locador
    const user = users.find(u => u.id === reservation.idUsuario);
    const userName = user ? user.nome : 'Cliente Anônimo';

    document.getElementById('reservationDetails').innerHTML = `
        <li class="d-flex justify-content-between"><strong>Ref Vaga:</strong> <span>${reservation.vaga}</span></li>
        <li class="d-flex justify-content-between"><strong>Data de Reserva:</strong> <span>${formatDate(reservation.data)}</span></li>
        <li class="d-flex justify-content-between"><strong>Método de Pagamento:</strong> <span>No Local</span></li>
        <li class="d-flex justify-content-between"><strong>Total de horas:</strong> <span>${totalHours}h</span></li>
        <li class="d-flex justify-content-between"><strong>Locador:</strong> <span>${userName}</span></li>
        <li class="d-flex justify-content-between"><strong>Total:</strong> <span>R$${totalAmount}</span></li>
        <li class="d-flex justify-content-between"><strong>Valor hora:</strong> <span>R$${valorHora}</span></li>
    `;

    document.getElementById('reservationAmount').innerText = `R$${totalAmount}`;

    const reservationModal = new bootstrap.Modal(document.getElementById('reservationModal'));
    reservationModal.show();
}

// Função para calcular o total de horas a partir do campo 'horario'
function calculateHours(horario) {
    if (!horario || horario === 'Horário não informado') return 0;
    const [inicio, fim] = horario.split(' - ');
    if (!inicio || !fim) return 0;

    const [startHour, startMinute] = inicio.split(':').map(Number);
    const [endHour, endMinute] = fim.split(':').map(Number);

    if (isNaN(startHour) || isNaN(startMinute) || isNaN(endHour) || isNaN(endMinute)) return 0;

    const start = startHour + (startMinute / 60);
    const end = endHour + (endMinute / 60);
    return (end - start).toFixed(2);
}



const idUser = localStorage.getItem("userId");
const meusDadosItem = document.getElementById("meusDadosItem");

const cargo = localStorage.getItem("cargo");
const minhasVagas = document.getElementById("minhasVagas");

if (cargo === 'admin') {
    minhasVagas.style.display = "block";
}

if (idUser) {
    meusDadosItem.style.display = "block";
}