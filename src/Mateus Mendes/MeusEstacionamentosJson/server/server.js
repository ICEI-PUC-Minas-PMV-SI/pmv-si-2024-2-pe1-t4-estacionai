const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
// Middleware para permitir o uso de JSON no corpo das requisições
app.use(bodyParser.json());
// Serve arquivos estáticos (HTML, CSS, JS, imagens, etc.)
app.use(express.static(path.join(__dirname, '../public')));
// Serve arquivos da pasta 'images' na raiz do projeto
app.use('/images', express.static(path.join(__dirname, '../images'))); 
// Rota para servir o arquivo 'index.html' ao acessar a URL raiz '/'
app.get('/', (req, res) => {
    console.log('Acessando a rota raiz /');
    res.sendFile(path.join(__dirname, '../public', 'index.html')); // Caminho corrigido
});
// Função para carregar o conteúdo de db.json
function loadEstacionamentos() {
    const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8');
    const parsedData = JSON.parse(data);
    return parsedData.estacionamentos || []; // Garantir que retornamos sempre um array
}
// Função para salvar os estacionamentos de volta em db.json
function saveEstacionamentos(estacionamentos) {
    const data = { estacionamentos };  // Envolvendo os dados em um objeto com a chave 'estacionamentos'
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2));  // Formato bonito
}
// Endpoint para obter os estacionamentos
app.get('/api/estacionamentos', (req, res) => {
    console.log('Acessando a API de estacionamentos...');
    try {
        const estacionamentos = loadEstacionamentos();
        console.log('Estacionamentos lidos do db.json:', estacionamentos);
        res.json({ estacionamentos });
    } catch (err) {
        console.error('Erro ao ler o arquivo de estacionamentos:', err);
        return res.status(500).json({ error: 'Erro ao ler o arquivo de estacionamentos' });
    }
});
// Endpoint para adicionar um novo estacionamento
app.post('/api/estacionamentos', (req, res) => {
    const novoEstacionamento = req.body;
    console.log('Novo estacionamento recebido:', novoEstacionamento);

    try {
        const estacionamentos = loadEstacionamentos();
        
        // Atribuindo um novo ID ao estacionamento, baseado no tamanho atual da lista
        novoEstacionamento.id = (estacionamentos.length + 1).toString(); // Atribui um ID único (incremental)

        // Adiciona o novo estacionamento à lista
        estacionamentos.push(novoEstacionamento);

        // Salva os dados atualizados de volta no arquivo JSON
        saveEstacionamentos(estacionamentos);

        console.log('Estacionamento adicionado com sucesso');
        res.status(201).json({ message: 'Estacionamento adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar o estacionamento:', err);
        return res.status(500).json({ error: 'Erro ao salvar o novo estacionamento' });
    }
});
// Endpoint para excluir um estacionamento com base no id
app.delete('/api/estacionamentos/:id', (req, res) => {
    const id = req.params.id; // Obtém o ID do estacionamento a ser excluído
    console.log('Excluindo estacionamento com ID:', id);

    try {
        const estacionamentos = loadEstacionamentos();

        // Encontra o índice do estacionamento com o id correspondente
        const index = estacionamentos.findIndex(est => est.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Estacionamento não encontrado' });
        }

        // Exclui o estacionamento com o id correspondente
        estacionamentos.splice(index, 1);

        // Salva os dados atualizados de volta no arquivo JSON
        saveEstacionamentos(estacionamentos);

        console.log('Estacionamento excluído com sucesso');
        res.status(200).json({ message: 'Estacionamento excluído com sucesso' });
    } catch (err) {
        console.error('Erro ao excluir estacionamento:', err);
        return res.status(500).json({ error: 'Erro ao excluir o estacionamento' });
    }
});
// Endpoint para adicionar uma vaga
app.post('/api/vagas', (req, res) => {
    const novaVaga = req.body;
    console.log('Nova vaga recebida:', novaVaga);

    try {
        const estacionamentos = loadEstacionamentos();

        // Encontra o estacionamento pelo idEstacionamento
        const estacionamento = estacionamentos.find(est => est.id === novaVaga.idEstacionamento);
        
        if (!estacionamento) {
            return res.status(404).json({ error: 'Estacionamento não encontrado' });
        }

        // Atribuir um ID único para a vaga (incremental)
        novaVaga.id = (estacionamento.vagas.length + 1).toString(); // ID automático baseado na quantidade de vagas

        // Adiciona a nova vaga ao estacionamento
        estacionamento.vagas.push(novaVaga);

        // Salva os dados atualizados de volta no arquivo JSON
        saveEstacionamentos(estacionamentos);

        console.log('Vaga adicionada com sucesso');
        res.status(201).json({ message: 'Vaga criada com sucesso' });
    } catch (err) {
        console.error('Erro ao criar vaga:', err);
        return res.status(500).json({ error: 'Erro ao criar vaga' });
    }
});
// Rota PUT para atualizar estacionamento
app.put('/api/estacionamentos/:id', (req, res) => {
    const id = req.params.id;
    const updatedEstacionamento = req.body;

    // Carregar os estacionamentos
    const estacionamentos = loadEstacionamentos();

    // Encontrar o estacionamento pelo ID
    const index = estacionamentos.findIndex(est => est.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Estacionamento não encontrado' });
    }

    // Atualizar os dados do estacionamento
    estacionamentos[index] = { ...estacionamentos[index], ...updatedEstacionamento };

    // Salvar os dados atualizados no arquivo
    saveEstacionamentos(estacionamentos);

    // Retornar sucesso
    res.status(200).json({ message: 'Estacionamento atualizado com sucesso' });
});
// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});