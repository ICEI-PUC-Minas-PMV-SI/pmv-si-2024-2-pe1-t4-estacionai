const url = 'https://estacionai-bd.onrender.com/usuarios';

function buscar() {
  // Capturando valores da tela de login
  const user = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  // Exibindo alerta em caso de campos vazios
  if (!user || !senha) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  // Fazendo a requisição
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro ao acessar a API: ${response.status}`);
      }
      return response.json(); // Converte o JSON da resposta
    })
    .then(usuarios => {
      // Verifica se há correspondência de usuário e senha
      const usuarioEncontrado = usuarios.find(
        u => u.user === user && u.senha === senha
      );

      if (usuarioEncontrado) {
        alert("Login bem-sucedido! Bem-vindo, " + user + ".");
        // Redirecionar ou executar outras ações de sucesso
      } else {
        alert("Usuário ou senha incorretos!");
      }
    })
    .catch(error => {
      console.error("Erro ao processar a solicitação:", error);
      alert("Ocorreu um erro ao acessar o serviço. Tente novamente mais tarde.");
    });
}