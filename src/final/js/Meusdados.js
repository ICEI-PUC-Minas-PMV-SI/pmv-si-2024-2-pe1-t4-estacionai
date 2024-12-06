const API_URL = "https://estacionai-bd.onrender.com/usuarios";

async function loadUserData() {
    const userId = localStorage.getItem("userId");
    try {
        const response = await fetch(`${API_URL}/${userId}`);
        const userData = await response.json();

        document.getElementById("nomeUsuario").value = userData.nome || '';
        document.getElementById("nome").value = userData.nome || '';
        document.getElementById("sobrenome").value = userData.sobrenome || '';
        document.getElementById("modeloVeiculo").value = userData.veiculo?.modelo || '';
        document.getElementById("placaCarro").value = userData.veiculo?.placa || '';
        document.getElementById("corVeiculo").value = userData.veiculo?.cor || '';
        document.getElementById("cpfCnpj").value = userData.cpfCnpj || '';
        document.getElementById("email").value = userData.email || '';
        document.getElementById("senha").value = userData.senha || '';
        document.getElementById("logradouro").value = userData.endereco?.logradouro || '';
        document.getElementById("telefone").value = userData.telefone || '';

        const inputs = document.querySelectorAll(".profile-info input");
        inputs.forEach(input => input.disabled = true);

    } catch (error) {
        console.error("error ----", error);
        alert("Erro ao carregar dados do usuário");
    }
}

async function updateUserData() {
    const userId = localStorage.getItem("userId");
    const userData = {
        nome: document.getElementById("nomeUsuario").value,
        sobrenome: document.getElementById("sobrenome").value,
        email: document.getElementById("email").value,
        cpfCnpj: document.getElementById("cpfCnpj").value,
        senha: document.getElementById("senha").value,
        telefone: document.getElementById("telefone").value,
        endereco: {
            logradouro: document.getElementById("logradouro").value
        },
        veiculo: {
            modelo: document.getElementById("modeloVeiculo").value,
            placa: document.getElementById("placaCarro").value,
            cor: document.getElementById("corVeiculo").value
        }
    };

    try {
        const response = await fetch(`${API_URL}/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert("Dados atualizados com sucesso!");
            const inputs = document.querySelectorAll(".profile-info input");
            inputs.forEach(input => input.disabled = true);
        } else {
            throw new Error("Erro ao atualizar dados");
        }
    } catch (error) {
        console.error("error ---", error);
        alert("Erro ao atualizar dados do usuário");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadUserData();

    document.querySelector(".btn-edit-save:nth-child(1)").addEventListener("click", function () {
        const inputs = document.querySelectorAll(".profile-info input");
        inputs.forEach(input => input.disabled = false);
        alert("Você agora pode editar os campos.");
    });

    document.querySelector(".btn-edit-save:nth-child(2)").addEventListener("click", function () {
        const inputs = document.querySelectorAll(".profile-info input");
        let allFilled = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                allFilled = false;
                input.classList.add("border-danger");
            } else {
                input.classList.remove("border-danger");
            }
        });

        if (allFilled) {
            updateUserData();
        } else {
            alert("Por favor, preencha todos os campos.");
        }
    });
});

const logout = () => {
    localStorage.clear();
    window.location.href = "./login.html";
};

document.querySelector(".btn-historico").addEventListener("click", function () {
    window.location.href = "./historico-vagas.html";
});
