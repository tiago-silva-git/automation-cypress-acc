# 🚀 Projeto de Automação de Testes com Cypress — Desafio Accenture

Este repositório contém um projeto de automação de testes desenvolvido com **Cypress**, como parte de um desafio técnico voltado à validação de APIs e testes E2E na plataforma [DemoQA BookStore](https://demoqa.com/swagger/).

---

## 🎯 Objetivo

- ✅ Automatizar o fluxo de testes da **API BookStore** (REST API).
- ✅ Automatizar cenários do **frontend** da BookStore (E2E).

---

## 🧰 Tecnologias e Ferramentas

| Ferramenta       | Descrição |
|------------------|-----------|
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript |
| [Cypress](https://www.cypress.io/) | Framework de automação de testes |
| [Mocha](https://mochajs.org/) | Test Runner usado pelo Cypress |
| [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Linguagem utilizada nos testes |
| [DemoQA API](https://demoqa.com/swagger/) | API pública utilizada no desafio |

---

## ⚙️ Configuração do Ambiente

### 1. ✅ Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/en/) — versão 16 ou superior
- [Git](https://git-scm.com/)

Verifique se o Node e o NPM estão instalados:

``
node -v
npm -v
``

### 2. ✅ Instalação do Projeto

Clone o repositório do projeto:

```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo

Instale as dependências do projeto:

```bash
npm install

### 3. 🚀 Executando os testes

Modo interativo (Cypress UI):

```bash
npx cypress open


- Será aberta a interface gráfica do Cypress.
- Navegue até: cypress/e2e/tests/API/challenge_part_1.cy.js
- Clique para executar o teste.

🔹 Modo headless (linha de comando):

```bash
npx cypress run


Isso executará todos os testes no terminal.