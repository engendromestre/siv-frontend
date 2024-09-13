# Contexto geral do projeto - C4

- Single Page Application
- Tecnologias: A intenção é criar uma arquitetura modular e escalável
  - Typsript: superset do javascript (typesafe - traz o autocomplete e também ajuda a evitar pequenos bugs)
  - React: creação de componentes
  - Redux: gerenciamento de estado
    - RTK Query: responsável pela comunicação com o backend
      - Atua como camada de serviço: criação uma abstração sobre o modelo da entidade, mapeia esse modelo como uma camada de serviço e faz a interação desse serviço direto com a API.
      - Envia uma chamada para o backend e trás o retorno também pode ser mostrado no frontend

# Ambiente

- Runtime: Nodejs v22.6.0
- Gerenciador de pacotes: yarn 1.22.19
- Redux: além de gerenciar o estado da aplicação, faz requisições para o backend, organiza e mantém a aplicação
  - Instalação (Redux com Typescript): setar uma estrutura básica do redux toolkit com typescript
  - npx degit reduxjs/redux-templates/packages/vite-template-redux siv-frontend
  - versão inicial do scaffold que já trás o que é conhecido como opinionated
  - opiniões de como organizar o código na aplicação e de como tratar as dependências

# Vscode

- plugins
- https://react.dev/learn/react-developer-tools
- Extensões
- [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=rodrigovallades.es7-react-js-snippets)
- [Tabnine AI](https://www.tabnine.com/install/vs-code/)
- https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight

# Dependências do projeto

-[ MUI - https://mui.com/](https://mui.com/)

- yarn add @mui/material @emotion/react @emotion/styled

# Criando primeiro componentes reutilizáveis

- Header e Layout

# Criando tema e adicionando rotas

- [react navigation](https://reactrouter.com/en/main)
- [React Router](https://reactrouter.com/en/main/upgrading/reach#install-react-router-v6)

# Criando páginas do CRUD de categoria

- Criação e tests de roteamento das categorias

# Criando Slice de Categorias

- representa um pedaço do estado das minhas entidades
- [Redux Slice](https://redux-toolkit.js.org/rtk-query/internal/buildSlice#slices)
- o Slice precisa ser adicionado na Store
- [Redux Devtools](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

# Datagrid da Listagem de categoria

- Seletores: permitem selecionar objetos menores específicos dentro do objeto store
- [MUI Datagrid](https://mui.com/x/react-data-grid/)

# Customizando o Datagrid

- [Material UI Icons](https://mui.com/material-ui/material-icons/)

# Adicionando actions e filtros no Datagrid

- [DataGrid Filtro](https://mui.com/x/react-data-grid/filtering/)

# Adicionando notstack para notificações

- [Lib Notistack](https://notistack.com/)

# Criando API slice e listando categorias via AP

- [Gerar interfaces typescript](https://app.quicktype.io/)

# Testes

- [React Tests](https://testing-library.com/docs/react-testing-library/intro/)
- [Mock Service Worker](https://mswjs.io/docs/getting-started)

- Testes de snapshots servem para gravar um espaço no tempo para quando houver uma mudança no componente o teste acuse a mudança
- Atualizar os snapshots
  - npm test -- -u

## Test utils providers

 - [Redux Test](https://redux.js.org/usage/writing-tests)
 - [Mantenedor do Redux](https://blog.isquaredsoftware.com/)
 - [RTK Abordagem de Testes](https://blog.isquaredsoftware.com/2021/06/the-evolution-of-redux-testing-approaches/)
 - *Ferramentas utilizadas*
  - [Servidor Local de Testes](https://mswjs.io/docs/getting-started)
  - Cria um servidor e retorna algumas respostas "mockadas"
