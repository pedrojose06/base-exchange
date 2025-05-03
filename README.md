# Base Exchange

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white)](https://graphql.org/)
[![Vitest](https://img.shields.io/badge/%F0%9F%AA%9E-Vitest-%23646CFF)](https://vitest.dev/)
[![Cypress](https://img.shields.io/badge/%F0%9F%8E%AE-Cypress-%23172026)](https://www.cypress.io/)
[![Jotai](https://img.shields.io/badge/Jotai-orange)](https://jotai.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2338B2AC.svg?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Este é um projeto React para controle de ordens, utilizando TypeScript para tipagem estática, GraphQL para a comunicação com a API, Vitest e Cypress para testes, Jotai para gerenciamento de estado e Tailwind CSS para estilização.

## Funcionalidades

* **Cadastrar nova ordem:** Permite cadastrar uma nova ordem que virá com status "Aberta", porém, caso possua uma ordem contrária do mesmo instrumento "Aberta" ou "Pendente", essa nova ordem executará parcialmente ou totalmente caso tenham ordem com uma quantidade necessária para tal.
* **Visualzar detalhes de uma ordem:** É possivel visualizar os detalhes de uma ordem criada e também o historico de execuções da mesma.
* **Cancelar uma ordem:** É possivel cancelar uma ordem "Aberta" ou "Pendente" tornando-a como "Cancelada".
* **Filtrar ordems:** É possível executar filtros para facilitar encontrar uma determinada ordem.

## Primeiros Passos

### Pré-requisitos

* **Node.js**
* **npm** ou **yarn** (gerenciadores de pacotes)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/pedrojose06/base-exchange
    cd base-exchange
    ```

2.  Instale as dependências usando npm:
    ```bash
    npm install
    ```
    ou usando yarn:
    ```bash
    yarn install
    ```

### Configuração

Pode haver variáveis de ambiente necessárias para configurar a URL da API GraphQL ou outras configurações. Verifique se há um arquivo `.env.example` ou instruções específicas sobre configuração no projeto. Crie um arquivo `.env` na raiz do projeto com as configurações necessárias.

### Executando o Projeto

1.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    Para que essa aplicação funcione completamente é necessário iniciar a API construida para ele, que deve rodar na porta: `http://localhost:3000`.

[Repositório da API (backend)](https://github.com/pedrojose06/base-exchange-api)

### Executando os Testes

1.  **Testes Unitários (Vitest):**
    ```bash
    npm run test
    # ou
    yarn test
    ```

2.  **Testes de Ponta a Ponta (Cypress):**
    ```bash
    npm run cypress
    # ou
    yarn cypress
    ```
    Isso abrirá a interface do Cypress, onde você poderá executar os testes.
