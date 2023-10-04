describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "moms",
      username: "durga",
      password: "basnet",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("log in to application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("#username").type("durga");
      cy.get("#password").type("basnet");
      cy.get("#login-button").click();
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("durga");
      cy.get("#password").type("bikash");
      cy.get("#login-button").click();
    });

    describe("When logged in", function () {
      beforeEach(function () {
        cy.contains("login").click();
        cy.get("#username").type("durga");
        cy.get("#password").type("basnet");
        cy.get("#login-button").click();
      });

      it("A blog can be created", function () {
        cy.contains("new blog").click();

        cy.get("[data-testid=title-input]").type("Dipjal's Blog");
        cy.get("[data-testid=author-input]").type("Dipjal");
        cy.get("[data-testid=url-input]").type("http://dipjal.com");

        cy.get("form").submit();

        cy.log("cy", "Submitted the form");

        // Check if the new blog is displayed
        cy.contains("Dipjal's Blog");
        cy.contains("Dipjal");

        cy.log("Checking if URL is displayed");
        cy.contains("http://dipjal.com");
      });
    });
  });
});
