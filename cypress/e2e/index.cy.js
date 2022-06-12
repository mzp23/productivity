describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  })

  it("should display timer on main page", () => {
        cy.findByRole("timer").should('exist');
  });

  it("should start timer if Play button clicked", () => {
    cy.clock();

    cy.findByRole("timer").should('have.text', '25:00')
    
    cy.get('svg[alt="Play timer"]').click();
    cy.tick(60000)
    cy.findByRole("timer").should('have.text', '24:00')
  });

  it("should pause timer if Pause button clicked", () => {
    cy.clock();

    cy.findByRole("timer").should('have.text', '25:00')
    
    cy.get('svg[alt="Play timer"]').click();
    cy.tick(60000)
    cy.findByRole("timer").should('have.text', '24:00')
    cy.get('svg[alt="Pause timer"]').click();
    cy.tick(60000)
    cy.findByRole("timer").should('have.text', '24:00')
  });
});
