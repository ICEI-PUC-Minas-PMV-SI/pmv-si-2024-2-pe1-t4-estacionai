# Arquitetura da Solução

A arquitetura da solução descreve como o software é estruturado em termos dos componentes da aplicação e do ambiente de hospedagem da interface. Durante o desenvolvimento, utilizamos um backend simulado por meio do **JSON Server**.
## Diagrama de componentes

Os componentes que fazem parte da solução são apresentados na Figura XX.

![Diagrama de Componentes](img/componentes.png)
<center>Figura XX - Arquitetura da Solução</center>

A solução implementada durante o desenvolvimento conta com os seguintes módulos:

- **Navegador** - Interface básica do sistema  
  - **Páginas Web** - Conjunto de arquivos HTML, CSS, JavaScript e imagens que implementam as funcionalidades do sistema.
  - **Local Storage** - Armazenamento mantido no Navegador, onde são implementadas estruturas de dados baseadas em JSON:
    - **Usuários** - Registro das contas criadas e dados de login.
    - **Reservas** - Lista de reservas feitas pelos usuários.
    - **Estacionamentos** - Cadastro de estacionamentos disponíveis.

- **Hospedagem**
  - **JSON Server** - Utilizado durante o desenvolvimento para simular um backend simples, respondendo às requisições HTTP de forma rápida.
  - **GitHub Pages** - Utilizado para a hospedagem da interface web estática.

Ferramentas de suporte ao desenvolvimento:
- **Postman** - Para testar e documentar futuras APIs RESTful.
- **VS Code** - Ambiente de desenvolvimento integrado.
- **Git** - Controle de versão para gerenciar o desenvolvimento colaborativo.

## Fluxo de Interação

O diagrama a seguir apresenta o fluxo de interação dos componentes da solução durante o desenvolvimento:

1. O usuário acessa a interface pelo navegador (frontend hospedado no GitHub Pages).
2. A interface consome dados do backend simulado pelo JSON Server (executado localmente ou em ambiente de desenvolvimento).
3. O backend simulado retorna as informações ao frontend.
4. A integração com a Google Maps API é realizada diretamente no frontend, sem passar pelo backend simulado.

## Tecnologias Utilizadas

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap para estilização e responsividade
- Google Maps API para exibição de mapas e busca de localizações

**Backend:**
- JSON Server para simular respostas de um backend durante o desenvolvimento

**Hospedagem:**
- Frontend: GitHub Pages
- Backend (simulado): JSON Server rodando localmente no ambiente de desenvolvimento

**Ferramentas de Suporte:**
- Postman para testes de API
- VS Code como IDE principal
- Git e GitHub para controle de versão e colaboração

## Hospedagem

- **GitHub Pages**: Hospeda a interface web estática, garantindo fácil acesso ao frontend.
- **JSON Server**: Executado localmente ou em ambiente de desenvolvimento para simular as respostas do backend sem persistência real e sem autenticação via JWT nesta etapa.
