

 const URL = 'https://estacionai-bd.onrender.com/usuarios'

 function ValidarEmail(email){
  const padrao = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return padrao.test(email);
 }
    const email = document.getElementById("email").value
    const nome_usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;  // Corrigido
    const verificarSenha = document.getElementById("senha_confirm").value
    const IsReserva = document.getElementById("usuario-reservar-vagas").value;
    const IsDisponibiliza = document.getElementById("usuario-disponibilizar-vagas").value;

 reservaOn(set){
  IsReserva = true
 }

//FUNÇÃO QUE O ENVIA OS DADOS PARA O JSON
async function submitlogin(){
    // Capturando valor do HTML
    
    
    
    console.log("Print dados -- ", nome_usuario, senha, IsReserva, IsDisponibiliza,email," S",verificarSenha);

    // Criando um objeto com os dados
    const usuario = {
        
        user: nome_usuario,
        senha: senha,
        IsDisponibiliza: IsDisponibiliza,
        IsReserva: IsReserva,
        email:email
    };
    //Validação do tipo de cadastro
    if(IsDisponibiliza==IsReserva){
      alert("Campos preenchidos indevidamente")
      return error
    }

    //Validação do e-mail
    if(!ValidarEmail(email)){
      alert("Por favor insira um e-mail valido")
      return error
    }
  
    //VERIFICADO DA COMPATIBILIDADE DE SENHAS
      if(senha==verificarSenha ){
        //UP DE DADOS DE DADOS NO BANCO 
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
      else{
        alert("As senhas devem ser iguais")
      }
   
}
