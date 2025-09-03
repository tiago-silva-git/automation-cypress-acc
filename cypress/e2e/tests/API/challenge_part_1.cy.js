/// <reference types="cypress" />

const { generateRandomPassword, generateRandomUsername } = require("../../../support/utils");

describe("Desafio API - DemoQA", () => {
  const username = generateRandomUsername();
  const password = generateRandomPassword();
  let userId, token, books;

  it("should create a new user", () => {
    cy.request("POST", "/Account/v1/User", {
      userName: username,
      password: password,
    }).then((response) => {
      expect(response.status).to.eq(201);
      userId = response.body.userID;
      expect(userId).to.exist;
    });
  });

  it("generate token", () => {
    cy.request("POST", "/Account/v1/GenerateToken", {
      userName: username,
      password: password,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.exist;
      token = response.body.token;
    });
  });

  it("confirm authorization", () => {
    cy.request("POST", "/Account/v1/Authorized", {
      userName: username,
      password: password,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("list available books", () => {
    cy.request("GET", "/BookStore/v1/Books").then((response) => {
      expect(response.status).to.eq(200);
      books = response.body.books;
      expect(books.length).to.be.greaterThan(1);

      cy.log(`📚 Livros disponíveis (${books.length}):`);

      books.forEach((book, index) => {
        const info = `${index + 1}. ${book.title}`;
        cy.log(info);
      });
    });
  });

  it("rent two books", () => {
    cy.then(() => {
      // Embaralhar os livros e pegar dois aleatórios
      const shuffledBooks = [...books].sort(() => 0.5 - Math.random());
      const selectedBooks = shuffledBooks.slice(0, 2).map((book) => ({
        isbn: book.isbn,
        title: book.title,
      }));

      return cy
        .request({
          method: "POST",
          url: "/BookStore/v1/Books",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            userId: userId,
            collectionOfIsbns: selectedBooks.map((b) => ({ isbn: b.isbn })),
          },
        })
        .then((response) => {
          expect(response.status).to.eq(201);

          cy.log("📚 Livros alugados aleatoriamente:");
          selectedBooks.forEach((book, index) => {
            const info = `${index + 1}. ${book.title} (ISBN: ${book.isbn})`;
            cy.log(info);
            console.log(info);
          });
        });
    });
  });

  it("list user details", () => {
    cy.request({
      method: "GET",
      url: `/Account/v1/User/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.username).to.eq(username);
      expect(response.body.books.length).to.eq(2);

      cy.log("📚 Livros associados ao usuário:");

      response.body.books.forEach((book, index) => {
        const info = `
    ${index + 1}.
      Título: ${book.title}
      Autor: ${book.author}
      Editora: ${book.publisher}
      Data de Publicação: ${book.publish_date}
      ISBN: ${book.isbn}
      Páginas: ${book.pages}
      Website: ${book.website}
          `.trim();

        cy.log(info);
      });
    });
  });
});
