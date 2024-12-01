document.addEventListener('DOMContentLoaded', () => {
    // Função para exibir estacionamentos e suas vagas
    function displayEstacionamentos(estacionamentos) {
        const estacionamentoList = document.getElementById('estacionamentoList');
        estacionamentoList.innerHTML = ''; // Limpa a lista existente
        estacionamentos.forEach(estacionamento => {
            const totalVagas = estacionamento.vagas.length;
            const vagasDisponiveis = estacionamento.vagas.filter(vaga => vaga.ocupado === 0).length;
            // Valores de preço, se não forem null, exibe o valor
            const valorHora = estacionamento.valor.find(v => v.valor_tipo === 'hora')?.valor || null;
            const valorDiaria = estacionamento.valor.find(v => v.valor_tipo === 'diaria')?.valor || null;
            const valorMensal = estacionamento.valor.find(v => v.valor_tipo === 'mensal')?.valor || null;
            // Verifica se as informações de horário de abertura e fechamento existem
            const exibirHorarioAbertura = estacionamento.horario_abertura !== null;
            const exibirHorarioFechamento = estacionamento.horario_fechamento !== null;
            // Criação do item para o estacionamento
            const item = document.createElement('a');
            item.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'align-items-center');
            item.href = '#';
            item.innerHTML = ` 
                <div class="flex-grow-1">
                    <h5 class="mb-1">${estacionamento.nome}</h5>
                    <p class="mb-1"><strong>Endereço:</strong> ${estacionamento.endereco}</p>
                    <p class="mb-1"><strong>Funcionamento:</strong> ${estacionamento.funcionamento}</p>
                    <!-- Exibição dos horários, se disponíveis -->
                    ${exibirHorarioAbertura ? `<p class="mb-1"><strong>Horário de Abertura:</strong> ${estacionamento.horario_abertura}H</p>` : ''}
                    ${exibirHorarioFechamento ? `<p class="mb-1"><strong>Horário de Fechamento:</strong> ${estacionamento.horario_fechamento}H</p>` : ''}
                    <p class="mb-1"><strong>Vagas Totais:</strong> ${totalVagas}</p>
                    <p class="mb-1"><strong>Vagas Disponíveis:</strong> ${vagasDisponiveis}</p>
                    <!-- Exibição dos valores apenas se não forem null -->
                    ${valorHora !== null ? `<p class="mb-1"><strong>Valor por Hora:</strong> R$ ${valorHora}</p>` : ''}
                    ${valorDiaria !== null ? `<p class="mb-1"><strong>Valor Diário:</strong> R$ ${valorDiaria}</p>` : ''}
                    ${valorMensal !== null ? `<p class="mb-1"><strong>Valor Mensal:</strong> R$ ${valorMensal}</p>` : ''}
                </div>
                <!-- Botões de Editar, Ver Vagas, Criar Vagas e Excluir -->
                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary btn-sm me-1" onclick="openEditModal(${estacionamento.id})">Editar</button>
                    <button class="btn btn-primary btn-sm me-1" onclick="showVagas(${estacionamento.id})">Ver Vagas</button>
                    <button class="btn btn-primary btn-sm me-1" onclick="openCreateVagasModal(${estacionamento.id})">Criar Vagas</button>
                    <button class="btn btn-primary btn-sm" onclick="confirmDelete(${estacionamento.id})">Excluir</button>
                </div>
            `;
            estacionamentoList.appendChild(item);
        });
    }
    // Função para carregar os estacionamentos via API
    function loadEstacionamentos() {
        fetch('http://localhost:3000/api/estacionamentos')
            .then(response => response.json())
            .then(data => {
                displayEstacionamentos(data.estacionamentos); // Exibe os estacionamentos
            })
            .catch(error => console.error('Erro ao carregar estacionamentos:', error));
    }
    // Função para abrir o modal de criação de vaga
    window.openCreateVagasModal = (idEstacionamento) => {
        // Preenche o campo oculto com o ID do estacionamento
        document.getElementById('vagaEstacionamentoId').value = idEstacionamento;
        // Limpa os campos do formulário do modal
        document.getElementById('vagaTitulo').value = '';
        document.getElementById('vagaTamanho').value = '9';
        document.getElementById('vagaOcupado').value = '0';
        // Exibe o modal usando o Bootstrap
        const createVagaModal = new bootstrap.Modal(document.getElementById('createVagaModal'));
        createVagaModal.show();
    };
    // Função para salvar a nova vaga
    document.getElementById('saveVagaButton').addEventListener('click', function() {
        const titulo = document.getElementById('vagaTitulo').value;
        const tamanho = parseInt(document.getElementById('vagaTamanho').value, 10);
        const ocupado = parseInt(document.getElementById('vagaOcupado').value, 10);
        const idEstacionamento = document.getElementById('vagaEstacionamentoId').value;
        // Verifica se todos os campos obrigatórios estão preenchidos
        if (!titulo || isNaN(tamanho) || isNaN(ocupado)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }
        // Cria o objeto da nova vaga
        const novaVaga = {
            idEstacionamento: idEstacionamento,
            titulo: titulo,
            tamanho: tamanho,
            ocupado: ocupado
        };
        // Faz a requisição para a API para adicionar a nova vaga
        fetch('http://localhost:3000/api/vagas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaVaga)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Exibe a mensagem de sucesso no console
            alert('Vaga criada com sucesso!');
            loadEstacionamentos(); // Atualiza os dados dos estacionamentos
            // Fecha o modal após salvar
            const createVagaModal = bootstrap.Modal.getInstance(document.getElementById('createVagaModal'));
            createVagaModal.hide();
        })
        .catch(error => {
            console.error('Erro ao criar vaga:', error);
            alert('Erro ao criar a vaga. Tente novamente!');
        });
    });
    // Função para habilitar/desabilitar os campos de preço com base nos checkboxes
    function togglePriceInput(checkboxId, inputId) {
        const checkbox = document.getElementById(checkboxId);
        const input = document.getElementById(inputId);
        checkbox.addEventListener('change', () => {
            input.disabled = !checkbox.checked;
        });
        // Inicializa o estado dos campos
        input.disabled = !checkbox.checked;
    }
    // Ativar/desativar os campos de preço no modal de adicionar estacionamento
    togglePriceInput('valor_hora', 'valor_hora_input');
    togglePriceInput('valor_diaria', 'valor_diaria_input');
    togglePriceInput('valor_mensal', 'valor_mensal_input');
    // Função para exibir as vagas de um estacionamento no modal
    window.showVagas = (idEstacionamento) => {
        fetch('http://localhost:3000/api/estacionamentos')
            .then(response => response.json())
            .then(data => {
                const estacionamento = data.estacionamentos.find(est => est.id == idEstacionamento);
                if (estacionamento) {
                    const vagasList = document.getElementById('vagasModalList');
                    vagasList.innerHTML = ''; // Limpa as vagas do modal antes de preencher novamente
                    // Preenche a lista de vagas
                    estacionamento.vagas.forEach(vaga => {
                        const vagaItem = document.createElement('li');
                        vagaItem.classList.add('list-group-item');
                        const statusOcupacao = vaga.ocupado === 0 ? 'Livre' : 'Ocupado';
                        vagaItem.innerHTML = `
                            <strong>${vaga.titulo}</strong><br>
                            <span><strong>Ocupação:</strong> ${statusOcupacao}</span><br>
                            <span><strong>Tamanho:</strong> ${vaga.tamanho}m²</span>
                        `;
                        vagasList.appendChild(vagaItem);
                    });
                    // Abre o modal
                    const vagasModal = new bootstrap.Modal(document.getElementById('vagasModal'));
                    vagasModal.show();
                }
            })
            .catch(error => console.error('Erro ao carregar as vagas:', error));
    };
    // Função para confirmar a exclusão de um estacionamento
    window.confirmDelete = (id) => {
        // Exibe o modal de confirmação de exclusão
        const confirmModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
        confirmModal.show();
        // Botão de confirmação de exclusão
        document.getElementById('confirmDeleteButton').onclick = () => {
            deleteEstacionamento(id);
            confirmModal.hide(); // Fecha o modal de confirmação
        };
    };
    // Função para excluir o estacionamento
    function deleteEstacionamento(id) {
        fetch(`http://localhost:3000/api/estacionamentos/${id}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Mensagem de sucesso
            loadEstacionamentos(); // Recarrega a lista de estacionamentos
        })
        .catch(error => console.error('Erro ao excluir estacionamento:', error));
    }
    // Função para abrir o modal de adicionar estacionamento
    window.openAddModal = () => {
        const modal = new bootstrap.Modal(document.getElementById('addEstacionamentoModal'));
        modal.show();
    };
    // Função para habilitar/desabilitar os campos de horário com base no funcionamento
    document.getElementById('funcionamento').addEventListener('change', (event) => {
        const horarioAberturaInput = document.getElementById('horario_abertura');
        const horarioFechamentoInput = document.getElementById('horario_fechamento');
        
        if (event.target.value === '24H') {
            // Desabilitar os campos de horário e limpar seus valores
            horarioAberturaInput.disabled = true;
            horarioFechamentoInput.disabled = true;
            horarioAberturaInput.value = '';
            horarioFechamentoInput.value = '';
        } else {
            // Habilitar os campos de horário
            horarioAberturaInput.disabled = false;
            horarioFechamentoInput.disabled = false;
        }
    });
    // Função para salvar o novo estacionamento
    document.getElementById('saveEstacionamentoButton').addEventListener('click', () => {
        const novoEstacionamento = {
            nome: document.getElementById('nome').value,
            endereco: document.getElementById('endereco').value,
            funcionamento: document.getElementById('funcionamento').value,
            horario_abertura: document.getElementById('horario_abertura').disabled || document.getElementById('horario_abertura').value === '' ? null : document.getElementById('horario_abertura').value,
            horario_fechamento: document.getElementById('horario_fechamento').disabled || document.getElementById('horario_fechamento').value === '' ? null : document.getElementById('horario_fechamento').value,
            valor: [
                {
                    valor_tipo: 'hora',
                    valor: document.getElementById('valor_hora').checked ? document.getElementById('valor_hora_input').value : null
                },
                {
                    valor_tipo: 'diaria',
                    valor: document.getElementById('valor_diaria').checked ? document.getElementById('valor_diaria_input').value : null
                },
                {
                    valor_tipo: 'mensal',
                    valor: document.getElementById('valor_mensal').checked ? document.getElementById('valor_mensal_input').value : null
                }
            ],
            vagas: [] // Inicialmente sem vagas
        };
        // Enviar os dados do novo estacionamento para o servidor
        fetch('http://localhost:3000/api/estacionamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoEstacionamento)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Mensagem de sucesso
            loadEstacionamentos(); // Recarrega a lista de estacionamentos
            const modal = bootstrap.Modal.getInstance(document.getElementById('addEstacionamentoModal'));
            modal.hide(); // Fecha o modal
        })
        .catch(error => console.error('Erro ao adicionar estacionamento:', error));
    });
// Função para Abrir o Modal de Edição
window.openEditModal = (idEstacionamento) => {
    fetch(`http://localhost:3000/api/estacionamentos`)
        .then(response => response.json())
        .then(data => {
            const estacionamento = data.estacionamentos.find(est => est.id === idEstacionamento.toString()); // Encontrar o estacionamento pelo ID
            if (!estacionamento) {
                console.error("Estacionamento não encontrado!");
                return;
            }
            // Preencher os campos do modal com os dados do estacionamento
            document.getElementById('editNome').value = estacionamento.nome;
            document.getElementById('editEndereco').value = estacionamento.endereco;
            document.getElementById('editFuncionamento').value = estacionamento.funcionamento;
            document.getElementById('editHorarioAbertura').value = estacionamento.horario_abertura || '';
            document.getElementById('editHorarioFechamento').value = estacionamento.horario_fechamento || '';
            // Preencher os campos de valores se existir
            document.getElementById('editValorHora').checked = estacionamento.valor.find(v => v.valor_tipo === 'hora')?.valor != null;
            document.getElementById('editValorHoraInput').value = estacionamento.valor.find(v => v.valor_tipo === 'hora')?.valor || '';
            document.getElementById('editValorDiaria').checked = estacionamento.valor.find(v => v.valor_tipo === 'diaria')?.valor != null;
            document.getElementById('editValorDiariaInput').value = estacionamento.valor.find(v => v.valor_tipo === 'diaria')?.valor || '';
            document.getElementById('editValorMensal').checked = estacionamento.valor.find(v => v.valor_tipo === 'mensal')?.valor != null;
            document.getElementById('editValorMensalInput').value = estacionamento.valor.find(v => v.valor_tipo === 'mensal')?.valor || '';
            // Habilitar ou desabilitar campos de horários com base na opção de funcionamento
            toggleHorarios(estacionamento.funcionamento);
            // Habilitar ou desabilitar campos de valores com base nas checkboxes
            toggleValorInput('editValorHora');
            toggleValorInput('editValorDiaria');
            toggleValorInput('editValorMensal');
            // Exibir o modal de edição
            const editModal = new bootstrap.Modal(document.getElementById('editEstacionamentoModal'));
            editModal.show();
            // Atualizar o estacionamento ao clicar no botão "Atualizar"
            document.getElementById('updateEstacionamentoButton').onclick = () => {
                updateEstacionamento(idEstacionamento);
            };
        })
        .catch(error => console.error('Erro ao carregar estacionamento:', error));
};
// Função para habilitar/desabilitar campos de horários com base no funcionamento
function toggleHorarios(funcionamento) {
    const horarioAbertura = document.getElementById('editHorarioAbertura');
    const horarioFechamento = document.getElementById('editHorarioFechamento');
    
    if (funcionamento === '24H') {
        // Desabilitar os campos de horário
        horarioAbertura.disabled = true;
        horarioFechamento.disabled = true;
        // Limpar os valores de horário, pois eles não serão usados
        horarioAbertura.value = '';
        horarioFechamento.value = '';
    } else {
        // Habilitar os campos de horário
        horarioAbertura.disabled = false;
        horarioFechamento.disabled = false;
    }
}
// Função para habilitar/desabilitar o campo de valor com base na checkbox
function toggleValorInput(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    const input = document.getElementById(checkboxId + 'Input');
    if (checkbox.checked) {
        input.disabled = false;
    } else {
        input.disabled = true;
        input.value = ''; // Limpar o campo se desmarcar a checkbox
    }
}
// Adicionar listener para o campo de "Funcionamento" para garantir que os horários se atualizem quando mudar
document.getElementById('editFuncionamento').addEventListener('change', function() {
    toggleHorarios(this.value); // Atualiza o estado dos campos de horário quando o funcionamento mudar
});
// Função para atualizar o estacionamento
function updateEstacionamento(idEstacionamento) {
    const nome = document.getElementById('editNome').value;
    const endereco = document.getElementById('editEndereco').value;
    const funcionamento = document.getElementById('editFuncionamento').value;
    const horarioAbertura = document.getElementById('editHorarioAbertura').value || null;
    const horarioFechamento = document.getElementById('editHorarioFechamento').value || null;
    // Valor dos campos de preços
    const valorHora = document.getElementById('editValorHora').checked ? document.getElementById('editValorHoraInput').value : null;
    const valorDiaria = document.getElementById('editValorDiaria').checked ? document.getElementById('editValorDiariaInput').value : null;
    const valorMensal = document.getElementById('editValorMensal').checked ? document.getElementById('editValorMensalInput').value : null;
    const updatedEstacionamento = {
        nome,
        endereco,
        funcionamento,
        horario_abertura: horarioAbertura,
        horario_fechamento: horarioFechamento,
        valor: [
            { valor_tipo: 'hora', valor: valorHora },
            { valor_tipo: 'diaria', valor: valorDiaria },
            { valor_tipo: 'mensal', valor: valorMensal }
        ]
    };
    fetch(`http://localhost:3000/api/estacionamentos/${idEstacionamento}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEstacionamento)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Estacionamento atualizado:', data);
        // Fechar o modal após atualização
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editEstacionamentoModal'));
        editModal.hide();
    })
    .catch(error => {
        console.error('Erro ao atualizar estacionamento:', error);
    });
}
// Adicionar listeners para as checkboxes de valor
document.getElementById('editValorHora').addEventListener('change', () => {
    toggleValorInput('editValorHora');
});
document.getElementById('editValorDiaria').addEventListener('change', () => {
    toggleValorInput('editValorDiaria');
});
document.getElementById('editValorMensal').addEventListener('change', () => {
    toggleValorInput('editValorMensal');
});
//Função Para Atualizar o Estacionametno Depois da Edição
function updateEstacionamento(id) {
    const updatedEstacionamento = {
        nome: document.getElementById('editNome').value,
        endereco: document.getElementById('editEndereco').value,
        funcionamento: document.getElementById('editFuncionamento').value,
        horario_abertura: document.getElementById('editHorarioAbertura').value || null,
        horario_fechamento: document.getElementById('editHorarioFechamento').value || null,
        valor: [
            {
                valor_tipo: 'hora',
                valor: document.getElementById('editValorHora').checked ? document.getElementById('editValorHoraInput').value : null
            },
            {
                valor_tipo: 'diaria',
                valor: document.getElementById('editValorDiaria').checked ? document.getElementById('editValorDiariaInput').value : null
            },
            {
                valor_tipo: 'mensal',
                valor: document.getElementById('editValorMensal').checked ? document.getElementById('editValorMensalInput').value : null
            }
        ]
    };
    fetch(`http://localhost:3000/api/estacionamentos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEstacionamento)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Mensagem de sucesso
        loadEstacionamentos(); // Atualiza a lista de estacionamentos
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editEstacionamentoModal'));
        editModal.hide(); // Fecha o modal após salvar
    })
    .catch(error => {
        console.error('Erro ao atualizar estacionamento:', error);
        alert('Erro ao atualizar estacionamento');
    });
}
    // Carregar a lista de estacionamentos ao carregar a página
    loadEstacionamentos();
});