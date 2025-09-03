# 🚀 Projeto de Automação de Testes com Cypress — Desafio Accenture

Este repositório contém um projeto de automação de testes desenvolvido com **Cypress**, como parte de um desafio técnico voltado à validação de APIs e testes E2E na plataforma [DemoQA BookStore](https://demoqa.com/swagger/) e [DemoQA](https://demoqa.com/).

---

### 📌 Sobre a Arquitetura de Testes

Este projeto **não utiliza Page Objects tradicionais**. Em vez disso, segue a recomendação oficial da equipe do Cypress de utilizar **App Actions**.

> 🔗 [Stop using Page Objects and start using App Actions](https://www.cypress.io/blog/stop-using-page-objects-and-start-using-app-actions)

#### ✅ Por que utilizar App Actions?

- Mantém os testes mais simples e diretos
- Evita duplicação desnecessária de código
- Melhora a legibilidade e manutenção dos testes
- Permite aproveitar todo o potencial do Cypress sem adicionar camadas extras de abstração

> **Resumo:** Os testes interagem diretamente com os elementos e funcionalidades da aplicação, focando no comportamento, e não na estrutura da interface.

---

## 🎯 Objetivo

- ✅ Automatizar o fluxo de testes da **API BookStore** (REST API).
- ✅ Automatizar cenários do **frontend** da demoqa.com (E2E).

---

## 🧰 Tecnologias e Ferramentas

| Ferramenta       | Descrição |
|------------------|-----------|
| [Node.js](https://nodejs.org/) | Ambiente de execução JavaScript |
| [Cypress](https://www.cypress.io/) | Framework de automação de testes |
| [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | Linguagem utilizada nos testes |
| [Faker JS](https://www.npmjs.com/package/@faker-js/faker) | Para gerar dados randomicamente |
| [DemoQA API](https://demoqa.com/swagger/) | API pública utilizada no desafio |c
| [DemoQA WEB](https://demoqa.com/) | API pública utilizada no desafio |

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

``
git clone https://github.com/seu-usuario/nome-do-repo.git
``
``
cd nome-do-repo
``

Instale as dependências do projeto:

``
npm install
``

Caso precise:
``
npm install @faker-js/faker --save-dev
``

``
npm install --save-dev cypress-file-upload
``

### 3. 🚀 Executando os testes

Modo interativo (Cypress UI):

``
npx cypress open
``

- Será aberta a interface gráfica do Cypress.

🔹 Modo headless (linha de comando):

``
npx cypress run
``

- Isso executará todos os testes no terminal.