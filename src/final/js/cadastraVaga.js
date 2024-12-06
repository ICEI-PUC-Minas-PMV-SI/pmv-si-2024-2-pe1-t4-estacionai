const URL = 'https://estacionai-bd.onrender.com/usuarios';

const userId = localStorage.getItem('userId');

if (!userId) {
    alert('Erro: Usuário não encontrado. Por favor, faça login novamente.');
    window.location.href = '/login.html';
}

const cadastroForm = document.getElementById('cadastroForm');

cadastroForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nomeRazaoSocial = document.getElementById('nomeRazaoSocial').value.trim();
    const cpfCnpj = document.getElementById('cnpjCpf').value.trim();

    if (!nomeRazaoSocial || !cnpjCpf) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const dadosAtualizados = {
        nomeRazaoSocial: nomeRazaoSocial,
        cpfCnpj: cpfCnpj,
    };

    try {
        const response = await fetch(`${URL}/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
        });

        if (response.ok) {
            window.location.href = './minhas-vagas.html';
            localStorage.setItem("cargo", 'admin');
        } else {
            const error = await response.json();
            console.error('Erro ao atualizar:', error);
            alert('Não foi possível atualizar os dados do usuário.');
        }
    } catch (error) {
        console.error('Erro de conexão:', error);
        alert('Erro ao conectar ao servidor.');
    }
});


function back() {
    window.history.back()
}