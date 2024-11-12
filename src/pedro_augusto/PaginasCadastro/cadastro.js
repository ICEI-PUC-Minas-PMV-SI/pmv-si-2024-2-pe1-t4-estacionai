

 const URL = 'https://estacionai-bd.onrender.com/usuarios'


//FUNÇÃO QUE O ENVIA OS DADOS PARA O JSON
async function submitlogin(){
    // Capturando valor do HTML
    
    const email = document.getElementById("email").value
    const nome_usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;  // Corrigido
    const IsReserva = document.getElementById("usuario-reservar-vagas").value;
    const IsDisponibiliza = document.getElementById("usuario-disponibilizar-vagas").value;
    
    console.log("Print dados -- ", nome_usuario, senha, IsReserva, IsDisponibiliza,email);

    // Criando um objeto com os dados
    const usuario = {
        
        user: nome_usuario,
        senha: senha,
        IsDisponibiliza: IsDisponibiliza,
        IsReserva: IsReserva,
        email:email
    };

    const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      }
      
      try {
        const retorno = await fetch(URL, config);    

        if (retorno.ok) {
          console.log("DEU CERTO");
        } else {
          console.log("Deu errado", retorno.status, retorno.statusText);
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição:1", error);
      }
  
   
}
