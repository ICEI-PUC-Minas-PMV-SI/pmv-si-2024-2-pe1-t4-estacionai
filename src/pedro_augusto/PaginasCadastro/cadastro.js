

 const URL = 'https://estacionai-bd.onrender.com/usuarios'

function isEmailValid(email) {
    // Expressão regular para validar e-mails
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Testa se o e-mail corresponde ao padrão
    return emailRegex.test(email);
}



//FUNÇÃO QUE O ENVIA OS DADOS PARA O JSON
async function submitlogin(){
    // Capturando valor do HTML
    const email = document.getElementById("email").value
    const nome_usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;  // Corrigido
    const verificarSenha = document.getElementById("senha_confirm").value
    const cargo = document.getElementById("tipo").value
  

    
    console.log("Print dados -- ", nome_usuario, senha, email,cargo,verificarSenha);

  //VERIFICAÇÃO DE E-MAIL
  if(!isEmailValid(email)){
    alert("DIGITE UM E-MAIL VALIDO")
    return erro
  }
  //VERIFICAÇÃO DE SENHA
  if(senha!=verificarSenha){
    alert("As senhas devem coincidir")
    return erro
  }




    // Criando um objeto com os dados
    const usuario = {
        
        user: nome_usuario,
        senha: senha,
        cargo:cargo,
        email:email
    };
   
  
  
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
