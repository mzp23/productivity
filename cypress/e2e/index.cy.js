describe("Navigation", () => {
  it.skip("should navigate to the about page", () => {
    cy.visit("http://localhost:3000/");

    cy.get("h1").contains("Productivity");
  });
});
