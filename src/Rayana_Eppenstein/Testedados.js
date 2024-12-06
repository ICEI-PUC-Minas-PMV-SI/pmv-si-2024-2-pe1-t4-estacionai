// Função para capturar e enviar dados do formulário para o servidor
document.getElementById("saveButton").addEventListener("click", function (event) {
    // Evita o comportamento padrão do botão
    event.preventDefault();
    // Captura os dados do formulário
    const nomeUsuario = document.querySelector("input[placeholder='Nome de Usuário']").value;
    const email = document.querySelector("input[placeholder='Email']").value;
    const cpfCnpj = document.querySelector("input[placeholder='CPF/CNPJ']").value;
    const senha = document.querySelector("input[placeholder='Senha']").value;
    const logradouro = document.querySelector("input[placeholder='Logradouro com Nº']").value;
    const cep = document.querySelector("input[placeholder='CEP']").value;
    const veiculo = document.querySelector("input[placeholder='Meu Veículo']").value;
    const placa = document.querySelector("input[placeholder='Placa do Carro']").value;
    const telefone = document.querySelector("input[placeholder='Telefone para Contato']").value;
    // Cria um objeto com os dados capturados
    const dadosUsuario = {
        nomeUsuario: nomeUsuario,
        email: email,
        cpfCnpj: cpfCnpj,
        senha: senha,
        logradouro: logradouro,
        cep: cep,
        veiculo: veiculo,
        placa: placa,
        telefone: telefone
    };
    // Envia os dados para o servidor usando a API fetch
    fetch("https://estacionai-bd.onrender.com/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosUsuario)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erro ao enviar os dados para o servidor");
        }
    })
    .then(data => {
        // Exibe mensagem de sucesso
        alert("Dados enviados com sucesso!");
        console.log("Resposta do servidor:", data);
    })
    .catch(error => {
        // Exibe mensagem de erro
        alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
        console.error("Erro:", error);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.querySelector(".btn-edit-save:nth-child(1)");
    const saveButton = document.querySelector(".btn-edit-save:nth-child(2)");
    const inputs = document.querySelectorAll(".profile-info input");
    const uploadFoto = document.getElementById("uploadFoto");
    const profilePicture = document.querySelector(".profile-picture img");
  
    // Função para habilitar campos de entrada no modo de edição
    editButton.addEventListener("click", function () {
      inputs.forEach(input => input.disabled = false);
      alert("Você agora pode editar os campos.");
    });
  
    // Função para salvar os dados e desabilitar a edição dos campos
    saveButton.addEventListener("click", function () {
      let allFilled = true;
      inputs.forEach(input => {
        if (input.value.trim() === "") {
          allFilled = false;
          input.classList.add("border-danger"); // Destaca campos vazios
        } else {
          input.classList.remove("border-danger");
        }
        input.disabled = true; // Desabilita novamente os campos
      });
      if (allFilled) {
        alert("Dados salvos com sucesso!");
      } else {
        alert("Por favor, preencha todos os campos.");
      }
    });
  
    // Função para atualizar a foto de perfil com o upload
    uploadFoto.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profilePicture.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  });