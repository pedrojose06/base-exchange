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

## Por que escolhi essas tecnologias?

- **React:** É uma das bibliotecas mais populares para construção de interfaces modernas, com grande comunidade, excelente performance e fácil integração com outras ferramentas.
- **TypeScript:** Proporciona tipagem estática ao JavaScript, aumentando a segurança, produtividade e facilitando a manutenção do código, especialmente em projetos de médio e grande porte.
- **GraphQL:** Permite consultas flexíveis e eficientes à API, reduzindo o tráfego de dados e facilitando a evolução do backend sem impactar o frontend.
- **Vitest:** Framework de testes rápido, moderno e com ótima integração ao ecossistema Vite/React, facilitando a escrita e execução de testes unitários.
- **Cypress:** Ferramenta robusta para testes end-to-end, garantindo que a aplicação funcione como esperado do ponto de vista do usuário final.
- **Jotai:** Gerenciador de estado simples e reativo, ideal para aplicações React modernas, proporcionando uma abordagem minimalista e eficiente para controle de estado global.
- **Tailwind CSS:** Framework utilitário para estilização, que acelera o desenvolvimento, garante consistência visual e facilita a manutenção do CSS.

Essas escolhas garantem produtividade, qualidade de código, facilidade de manutenção e uma ótima experiência tanto para desenvolvedores quanto para usuários finais.

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

    Após rodar os testes deve ter esses resultados:

    ![unit tests ok](<https://i.imgur.com/m5JzQx0.png>)

2.  **Testes de Ponta a Ponta (Cypress):**
    ```bash
    npm run cypress
    # ou
    yarn cypress
    ```



    Isso abrirá a interface do Cypress, onde você poderá executar os testes.
    Selecione E2E Testing
    ![interface inicial cypress](<https://i.imgur.com/Ib8krd8.png>)



    Selecione o Browser de sua preferencia (para desenvolvimentos e testes foi utilizado o Chrome)
    ![selecionar browser](<https://i.imgur.com/iOGPlgV.png>)



    Após isso, os testes serão iniciados e, ao final, deve-se ter uma tela de resultados desta forma:
    ![cypress tests ok](<https://i.imgur.com/jNhBsGo.png>)

### Utilizando o projeto

  Ao abrir o projeto é possivel se deparar com a página inicial:
    ![cypress tests ok](<https://i.imgur.com/J7ZyNae.png>)

  Ao clicar em "Nova Ordem", podemos inserir os dados de uma nova ordem de Compra e Venda, e com isso possuímos alguns cenários.
  - Nova ordem nao possui uma ordem contrária existente: Ordem é inserida com status Aberta
  - Nova ordem possui ordens contrárias, porém insuficiente para executa-la totalmente: Nova ordem é inserida com status de pendente e ordem já existente, é alterada para executada.
  - Nova ordem possui ordens contrárias, porém quantidade na nova ordem não executa totalmente a ordem existente: Nova ordem é inserida como Executada e ordem já existente fica como pendente
    ![cypress tests ok](<https://i.imgur.com/LogNJov.png>)

  Nessa mesma tela, possuímos campos quem podem filtrar determinadas ordens:
    ![cypress tests ok](<https://i.imgur.com/lYr33VU.png>)

  Ao encontrar uma ordem que queria vizualizar mais dados, é possuvel acessa-los utilizando esse botão:
    ![cypress tests ok](<https://i.imgur.com/tnK3Tww.png>)

  E com isso uma Dialog irá aparecer com algumas informações da ordem:
    ![cypress tests ok](<https://i.imgur.com/3TFCrE3.png>)

  Para visualiar o histórico de execuções de uma ordem, é necessário acessar a página de histório nesse link:
    ![cypress tests ok](<https://i.imgur.com/MgoAwws.png>)

  O histórico fica na parte de baixo da página:
    ![cypress tests ok](<https://i.imgur.com/NeQoNEK.png>)

  Para cancelar uma ordem, é possivel, acessando esse botão no datagrid:
    ![cypress tests ok](<https://i.imgur.com/rKtCM7J.png>)

  Uma Dialog irá aparecer, e para cancelar, precisa apenas clicar em sim:
    ![cypress tests ok](<https://i.imgur.com/UQq9hHD.png>)

  Após confirmar o canelamento, no datagrid, a ordem agora, estará com status de Cancelada
    ![cypress tests ok](<https://i.imgur.com/6UE4eKZ.png>)

