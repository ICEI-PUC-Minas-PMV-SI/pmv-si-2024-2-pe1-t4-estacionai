## Especificações do Projeto

### Plataforma de gestão de vagas de estacionamento

O projeto visa criar uma plataforma digital que permita aos motoristas reservar vagas de estacionamento de forma prática e antecipada, e aos proprietários de estacionamentos gerenciar suas vagas. A plataforma buscará melhorar a mobilidade urbana, reduzir congestionamentos e oferecer mais segurança e comodidade aos usuários.

#### Para Administradores (Proprietários):
Cadastrar estabelecimento e login;
Cadastrar, confirmar e cancelar reserva;
Cadastrar e gerenciar vagas; 
Definir preços (por hora, dia, mês); 
Visualizar reservas e relatórios de ocupação; 

#### Para Usuários (Motoristas):
Cadastrar e logar;
Pesquisar e reservar de vagas por geolocalização – vagas próximas e endereço;
Exibir preços e disponibilidade das vagas;
Cancelar reservas com antecedência mínima; 
Receber notificações de status de reserva. 

#### Requisitos não funcionais:
HTML, CSS, JavaScript para interface e interação do usuário;
JSON-Server para gestão de dados;
Funcionalidade em dispositivos móveis e navegadores principais.

O projeto busca oferecer uma solução tecnológica para a melhoria da mobilidade urbana, promovendo benefícios para motoristas, proprietários de estacionamentos e a economia local, além de contribuir para um ambiente urbano mais sustentável.


## Personas

#### Persona 1
Maximiliano Augusto tem 40 anos e, atualmente,é o analista de sistemas da Infracon Engenharia, uma empresa que atua no ramo da construção civil e vem crescendo cada dia mais. 
Graças a esse crescimento, o número de pessoas trabalhando no escritório central teve um aumento significativo e, como consequência, a demanda por vagas na garagem foi ficando cada vez maior. 
Max nem sempre vem todos os dias à empresa; porém, sua presença é muito importante.Portanto, ele tem a necessidade de possuir uma vaga para estacionar seu carro. Dada a situação, o ideal para ele e para a garagem do prédio seria um sistema em que as pessoas conseguissem reservar sua vaga e informar a disponibilidade dela, facilitando a vida de todos no ambiente e evitando situações constrangedoras. 

#### Persona 2 
Ana Luiza tem 32 anos, trabalha em uma agência de marketing e faz questão de chegar pontualmente em suas reuniões. Ela mora em um bairro movimentado e trabalha em uma área com poucas opções de estacionamento. A rotina diária de encontrar uma vaga próxima ao escritório é um desafio, especialmente em horários de pico. 
Ana valoriza a conveniência e a economia de tempo. Ela quer um plataforma que a ajude a encontrar vagas de estacionamento rapidamente, sem precisar ficar circulando ou arriscando receber multas. Segurança e praticidade são essenciais para ela. 

#### Persona 3 
João Pedro é um empresário de 45 anos e um dos seus maiores empreendimentos corresponde a um shopping no centro da cidade de São Paulo. 
Graças à sua localização privilegiada, a estrutura possui um grande fluxo de pessoas basicamente todos os dias e, apesar de ser muito lucrativo para o local, esse fator vem gerando grandes problemas quando o assunto é vagas para estacionar. 
Os clientes do shopping saem de casa sem saber se conseguirão colocar seu carro em um local seguro dentro do shopping ou se correrão o risco de estacionar fora do estabelecimento, o que faz com que repensem se realmente é necessário ir até o ambiente comercial. 
Diante dessa situação, o ideal para João seria a implementação de uma plataforma em que os clientes conseguissem agendar as vagas para estacionar com antecedência, evitando situações desagradáveis e garantindo sempre a praticidade e tranquilidade para que eles possam se deslocar para o shopping. 

#### Persona 4
Roberto Carlos é gerente de um estacionamento no entorno da Raja Gabaglia, uma das avenidas mais movimentadas da Grande Belo Horizonte. 
Esse ponto específico da cidade é referência em carros e em qualquer coisa na area de mecânica automotiva, além de ser um grande polo empresarial também.Por esses motivos, o movimento na área é muito grande e Roberto muitas vezes perde o controle na administração do seu negócio. 
Para maximizar a ocupação de vagas no estacionamento e minimizar o tempo ocioso, evitando conflitos entre os clientes, Roberto está em busca de uma ferramenta que simplifique a administração diária do estacionamento com monitoramento de vagas e controle de reservas. 

#### Persona 5
Katarina Valentina tem 43 anos e é dona de um mercado em um bairro residencial na cidade de Belo Horizonte.O local conta com um estacionamento de porte médio, com vaga para cerca de 23 veículos. 
O comércio de Katarina costuma ser bem movimentado por ser unanimidade na região e, graças a esse acontecimento, muitas vezes a quantidade de vagas no seu estacionamento não é suficiente para suportar a carga de clientes em períodos de movimento maior.Portanto, para resolver essa situação, ela busca uma solução para que os clientes consigam reservar suas vagas no estacionamento de acordo com o tempo que irão ficar no supermercado, fazendo com que seu empreendimento atenda à maior quantidade de clientes possível em um determinado dia. 

#### Persona 6
Kevin Mahamad tem 24 anos e trabalha durante o turno noturno em uma empresa, em que seu horário de saida acaba por ser depois do horário de fechamento da maioria dos estabelecimentos.
Graças ao seu horário tardio de saída, acaba se tornando um grande desafio garantir um local seguro para estacionar seu veículo, que esteja aberto durante o período em que ele inicia o turno em seu trabalho até o periodo em que encerra seu turno.


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO...| QUERO/PRECISO ...  |PARA ...|
|--------------------|------------------------------------|----------------------------------------|
| Maximiliano Augusto | Reservar uma vaga no estacionamento da empresa nos dias em que trabalha de forma presencial | Garantir a presença de forma pontual no trabalho|
| Ana Luiza | Reservar uma vaga proxima ao local de trabalho | Assegurar a pontualidade e prevenir imprevistos na locomoção até o trabalho  |
| João Pedro | Organizar a distrubuição de vagas no estacionamento do Shopping | Garantir a Segurança dos veículos dos clientes e simplificar a locomoção até seu estabelecimento |
| Roberto Carlos | Maximizar a ocupação de vagas no estacionamento | Garantir maior controle sobre o fluxo de veículos e sobre o tempo |
| Katarina Valentina | Disponibilizar reservas das vagas do estacionamento do mercado de forma que a demanda seja completamente atendida | Organizar o fluxo de clientes para maior aproveitamento e garantir sempre o maior número de clientes |
| Kevin Mahamad | Reservar uma vaga de forma confiável | Garantir um local seguro para estacionar seu veículo e que esteja disponível 24 Horas |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o proprietário cadastre seu estabelecimento | ALTA |
|RF-002| Permitir que o proprietário crie e atualize as vagas  | ALTA |
|RF-003| Permitir que o proprietário visualize as vagas  | BAIXA |
|RF-004| Permitir que o proprietário confirme uma reserva | MÉDIO |
|RF-005| Permitir que o proprietário cancele uma reserva | BAIXO |
|RF-006| Permitir que o proprietário defina preços por hora, dia, ou mês para as vagas | MÉDIA |
|RF-007| Implementar um sistema de login | ALTA |
|RF-008| Permitir que o usuário pesquise vagas de estacionamento por local | ALTA |
|RF-009| Permitir que o usuário reserve uma vaga de estacionamento por hora, dia ou mês | MÉDIO |
|RF-010| Exibir o preço da vaga antes de concluir a reserva | BAIXO |
|RF-011| Notificar o proprietário sobre o status de suas reservas (confirmada, cancelada, etc.) | BAIXO |
|RF-012| Exibir um histórico de reservas de vagas do usuário | BAIXA |
|RF-013| Permitir que os usuários atualizem e visualizem seus perfis | BAIXA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O site deve ser responsivo para rodar em um dispositivos móvel | ALTA |
|RNF-002| A interface do usuário deve ser intuitiva e fácil de usar | ALTA |
|RNF-003| O banco de dados utilizado deve ser JSON-Server | ALTA |
|RNF-004| Aplicação deve ser desenvolvida em HTML, CSS e Javascript | ALTA |
|RNF-005| As senhas de todos os usuários devem ser criptografadas com crypto-js | ALTA |
|RNF-006| Escalabilidade, o sistema deve ser capaz de lidar com um grande número de usuários simultâneos sem afetar o desempenho |MÉDIA|
|RNF-007| Compatibilidade com os principais navegadores (Chrome, Firefox, Safari, Edge)|ALTA|
|RNF-008| Conformidade com Lei Geral de Proteção de Dados garantindo o consentimento dos usuários para coleta de dados e oferecendo a opção de remover seus dados do sistema |ALTA|


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
|03| Não será possível efetuar pagamentos pela plataforma  |
|04| A plataforma só pode ser acessada via navegadores, não sendo permitido o desenvolvimento de um aplicativo nativo|
|05| O sistema poderá operar somente em língua portuguesa |
|06| O uso de APIs externas, seguindo os limites de chamadas gratuitas da API, sem versões pagas |


