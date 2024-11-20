const usuariosSeed = [
    {
        id: "1",
        nome: "Admin User",
        email: "admin@example.com",
        celular: "999999999",
        senha: "admin123",
        cargo: "admin",
    },
    {
        id: "2",
        nome: "Cliente User",
        email: "cliente@example.com",
        celular: "888888888",
        senha: "cliente123",
        cargo: "cliente",
    },
];

const veiculosSeed = [
    {
        id: "1",
        idCliente: "2",
        placa: "ABC-1234",
        cor: "Preto",
        modelo: "Fusca",
    },
];

const estacionamentosSeed = [
    {
        id: "1",
        idAdmin: "1",
        nome: "Estacionamento Central",
        endereco: "Rua Exemplo, 123",
        celular: "777777777",
        vagas: [1, 2],
    },
];

const vagasSeed = [
    {
        id: "1",
        idEstacionamento: "1",
        titulo: "Vaga 1",
        ocupado: 0,
    },
    {
        id: "2",
        idEstacionamento: "1",
        titulo: "Vaga 2",
        ocupado: 1,
    },
];

// Função para criar seed
async function createSeed(url, data) {
    try {
        for (const item of data) {
            await fetch(`${url}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(item),
            });
        }
        console.log(`Dados criados em ${url}`);
    } catch (error) {
        console.error(`Erro ao criar seed em ${url}:`, error);
    }
}

// Função para limpar seed
async function deleteSeed(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        for (const item of data) {
            await fetch(`${url}/${item.id}`, { method: "DELETE" });
        }
        console.log(`Dados apagados de ${url}`);
    } catch (error) {
        console.error(`Erro ao apagar seed em ${url}:`, error);
    }
}

async function seedDatabase() {
    const baseUrl = "https://estacionai-bd.onrender.com";

    await deleteSeed(`${baseUrl}/usuarios`);
    await deleteSeed(`${baseUrl}/veiculos`);
    await deleteSeed(`${baseUrl}/estacionamentos`);
    await deleteSeed(`${baseUrl}/vagas`);

    await createSeed(`${baseUrl}/usuarios`, usuariosSeed);
    await createSeed(`${baseUrl}/veiculos`, veiculosSeed);
    await createSeed(`${baseUrl}/estacionamentos`, estacionamentosSeed);
    await createSeed(`${baseUrl}/vagas`, vagasSeed);

    console.log("Seed concluído!");
}

seedDatabase();
