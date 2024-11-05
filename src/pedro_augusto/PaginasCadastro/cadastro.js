
//Função para gerar numero aleatorio para o ID
function generateNumericId() {
    return Math.floor(Math.random() * 999) + 1;
}


//FUNÇÃO QUE O ENVIA OS DADOS PARA O JSON
function submitlogin(){
  //  
//Capturando valor do HTML
    const id = generateNumericId();
    const nome_usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("usuario").value;
    const IsReserva = document.getElementById("usuario-reservar-vagas").value;
    const IsDisponibiliza = document.getElementById("usuario-disponibilizar-vagas").value;
    
    console.log("segue os dados " + id,nome_usuario,senha,IsReserva,IsDisponibiliza)

//Criando um objeto com os dados
    const usuarios= {
        id:id,
        user:nome_usuario,
        senha:senha,
        IsDisponibiliza:IsDisponibiliza,
        IsReserva:IsReserva
    };


    fetch('http://localhost:3000/usuarios',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(usuarios)
    })

    .then(Response =>Response.json())
    .then(usuario => {
        console.log("DADOS SALVOS COM SUCESSO")
        alert("Cadastro Realizado com sucesso")

    })
    .catch(error => {
        console.error("ERRO AO SALVAR",error)
        alert("erro ao relizar cadastro")

    })

}