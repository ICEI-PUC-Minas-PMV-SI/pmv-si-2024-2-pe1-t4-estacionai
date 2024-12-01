# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste. Veja a tabela de exemplo.

**Caso de Teste** | **CT01 – Histórico de vagas parte 1**
 :--------------: | ------------
**Procedimento**  | 1) Clique em Meus Dados localizado na Navbar em seguida em  Histórico de vagas. <br> 2) Preencha o nome do estacionamento e/ou, modelo do veículo e placa. <br> 3) Clique no botão "consultar".
**Requisitos associados** | RF-014
**Resultado esperado** | Prosseguir para a parte 2 do Histórico de Vagas
**Dados de entrada** | Inserção de dados válidos no filtro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT02 – Histórico de vagas parte 2**
 :--------------: | ------------
**Procedimento**  | 1) Clique em Meus Dados localizado na Navbar em seguida em  Histórico de vagas. <br> 2) Preencha o nome do estacionamento e/ou, modelo do veículo e placa. <br> 3) Clique no botão "consultar".<br>4) Clique no botão "ver recibo".<br>5) Clique no botão voltar caso deseje retornar.
**Requisitos associados** | RF-014
**Resultado esperado** | Prosseguir para a parte 2 do Histórico de Vagas
**Dados de entrada** | Inserção de dados válidos no filtro
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT03 - Fazer uma reserva na tela de Lista de Vagas**
 :--------------: | ------------
**Procedimento**  | 1) Acesse o recurso /busca-vagas.html <br> 2) Busque um estacionamento <br> 2) Selecione o estacionamento <br> 3) Digite a quantidade de tempo que ficará na vaga <br> 4) Clique no botão confirmar
**Requisitos associados** | RF-008 & RF-009 & RF-010 & RF-011
**Resultado esperado** | Exibir alert de confirmação da reserva
**Dados de entrada** | Inserção de um tempo correto para reservar a vaga
**Resultado obtido** | Sucesso

**Caso de Teste** | **CT04 – Dados de Usuário**
 :--------------: | ------------
**Procedimento**  | 1) Clique em Meus Dados localizado na Navbar. <br> 2) Preencha os dados para salvar ou editar cadastro. <br> 3) Clique no botão "salvar" para salvar o cadastro.<br>4) Clique no botão "Editar" em caso de edição de cadastro.<br>5) Clique no botão "Histórico de Vagas" caso deseje visualizar o histórico das vagas.
**Requisitos associados** | RF-001
**Resultado esperado** | Atualização e registro dos dados pessoais disponíveis somente pelo usuário da conta
**Dados de entrada** | Inputs 'Nome de Usuário','nome','sobrenome','Modelo Veículo','Placa do Carro','Cor','CPF/CNPJ','Email','Senha','Logradouro com Nº','Telefone'
**Resultado obtido** | "Dados enviados com sucesso!"

*Caso de Teste* | *CT05 - Criar conta parte 1*
 :--------------: | ------------
*Procedimento*  | 1) Na pagina inicial home clique em criar conta <br> 2) Preencha os dados de login <br> 2) Selecione como você deseja utilizar o aplicativo <br> 3) Clique no botão "Continuar".
*Requisitos associados* | RF-007
*Resultado esperado* | Prosseguir para a parte final do cadastro de usuario
*Dados de entrada* | E-mail válido,usuário dentro do padrões, senha e confirmação de senha iguais
*Resultado obtido* | Sucesso

*Caso de Teste* | *CT06 - Criar conta parte 2*
 :--------------: | ------------
*Procedimento*  | 1) Preencha todos os campos referentes ao cadastro com dados válidos, e um arquivo png<br> 2) Clique no botão "Salvar" <br> 3) Realizar o login com o usuario e senha cadastrados <br> 
*Requisitos associados* | RF-007
*Resultado esperado* | Usuário cadastrado com sucesso
*Dados de entrada* | Inserção de dados válidos no formulário de cadastro
*Resultado obtido* | Sucesso

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

|*Caso de Teste*                                 |*CT01/02 - Histórico de vagas parte 1 e 2*                                         |
|---|---|
|Requisito Associado | RF-014 - Exibir um histórico de reservas de vagas do usuário|
|Link do vídeo do teste realizado: |https://www.loom.com/share/6432e64d67d441aab197e222d8377156| 

|*Caso de Teste*                                 |*CT03 - Fazer uma reserva na tela de Lista de Vagas*                                         |
|---|---|
|Requisito Associado | RF-008 & RF-009 & RF-010 & RF-011 - Exibir, pesquisar e reservar uma vaga na Lista de Vagas|
|Link do vídeo do teste realizado: |https://drive.google.com/file/d/1DK64bS6_Vqgppe-PTCWr4Wy_bJ-Fio__/view?usp=sharing| 

|*Caso de Teste*                                 |*CT04 - Fazer uma reserva na tela de Lista de Vagas*                                         |
|---|---|
|Requisito Associado | RF-001	Permitir que o proprietário cadastre seu estabelecimento	|
|Link do vídeo do teste realizado: |[https://drive.google.com/file/d/1qpYV8tpmx3HT4chFn6MEKJpewtSVUD5C/view?usp=sharing](https://we.tl/t-mtxD4wH4Jh)|

|Caso de Teste                                 |*CT05/06 - Criar conta parte 1 e 2*                                       |
|---|---|
|Requisito Associado | RF-007 - Implementar um sistema de login/cadastro|
|Link do vídeo do teste realizado: | https://drive.google.com/file/d/14UcfNU1zfUcln_-k5p1KXYn7GjYQoD8K/view?usp=drive_link |


## Avaliação dos Testes de Software

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

## Testes de unidade automatizados (Opcional)

Se o grupo tiver interesse em se aprofundar no desenvolvimento de testes de software, ele podera desenvolver testes automatizados de software que verificam o funcionamento das funções JavaScript desenvolvidas. Para conhecer sobre testes unitários em JavaScript, leia 0 documento  [Ferramentas de Teste para Java Script](https://geekflare.com/javascript-unit-testing/).

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é uma pessoa que deseja buscar o histórico das reservas de vagas que realizou para o seu carro . Encontre as informações na página pelo estacionamento,modelo ou placa do veículo. |
| 2             | Um motorista que deseja encontrar um estacionamento/vaga para estacionar seu carro. Ele deve buscar essa informações na página de lista de vagas e reservar uma vaga |


## Registro de Testes de Usabilidade

**Cenário 1:** Você é uma pessoa que deseja buscar o histórico das reservas de vagas que realizou para o seu carro . Encontre as informações na página pelo estacionamento,modelo ou placa do veículo.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 4.5                    | 14.50 segundos                  |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 12.50 segundos |



**Comentário do usuário:** Achei fácil acessar as informações e não tive dificuldade em conclui-las.




Cenário 2: Um motorista que deseja encontrar um estacionamento/vaga para estacionar seu carro. Ele deve buscar essa informações na página de lista de vagas e reservar uma vaga

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 15 segundos                  |
| 2       | SIM             | 4.7                    | 20 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 4.85                | 17.5 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.5 segundos |


    Comentários dos usuários: 
    1. Achei fácil e rápido fazer uma reserva de vaga
    2. No geral bom, porém, senti uma falta da especificação mais visível com qual modelo de pagamento aquele estacionamento trabalha (Diária, Hora, Mensal...)


## Avaliação dos Testes de Usabilidade


Os resultados mostraram que a aplicação web apresentou um bom desempenho, com alta taxa de sucesso na conclusão dos cenários propostos. Todos os objetivos foram alcançados de forma eficiente, indicando que a interface é funcional e atende às necessidades dos usuários.

Além disso, os usuários demonstraram grande satisfação com a experiência, como evidenciado pelas médias de avaliação, que variaram entre 4 (bom) e 5 (ótimo). Esses números reforçam a qualidade da aplicação em termos de usabilidade e aceitação.

Quanto ao tempo de execução dos cenários, foi constatada uma semelhança entre o tempo médio dos usuários e o do especialista/desenvolvedor. Essa proximidade sugere que o design da aplicação facilita a navegação e a execução das tarefas, minimizando a curva de aprendizado e garantindo uma interação intuitiva. Esses resultados destacam o potencial da aplicação para atender a um público amplo e diversificado.



