const URL = "https://estacionai-bd.onrender.com/usuarios";

// CRUD: Criar, Ler, Atualizar e Excluir

async function createUser(user) {
    try {
        if (!("name" in user) || user.name === "") throw new Error("Atributo nome é obrigatório");
        if (!("email" in user) || user.email === "") throw new Error("Atributo email é obrigatório");

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }

        const response = await fetch(URL, options);

        if (!response.ok) throw new Error("Erro ao criar um usuário");

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function getUsers() {
    try {
        const response = await fetch(URL);

        if (!response.ok) throw new Error("Erro ao buscar usuários");

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}
