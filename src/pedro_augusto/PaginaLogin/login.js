const url = 'https://estacionai-bd.onrender.com/usuarios'

function buscar(){
//Capturando valores datela de login
   const user = document.getElementById("usuario").value
   const senha = document.getElementById("senha").value
   
//CRIANDO OBJETO PARA BUSCA   
   const buscar  = {
        user : user,
        senha : senha,
    }
//CONFIGURAÇÃO DE CONSULTA
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buscar)
  }



    try{
        
    }
    catch(erro){

    }


}