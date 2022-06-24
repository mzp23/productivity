import { FOCUS_STATUS, LONG_BREAK_STATUS, SHORT_BREAK_STATUS } from "../../common/constants";

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display timer on main page", () => {
    cy.findByRole("timer").should("exist");
  });

  it("should start timer if Play button clicked", () => {
    cy.clock();

    cy.findByRole("timer").should("have.text", "25:00");

    cy.get('svg[alt="Play timer"]').click();
    cy.tick(60000);
    cy.findByRole("timer").should("have.text", "24:00");
  });

  it("should pause timer if Pause button clicked", () => {
    cy.clock();

    cy.findByRole("timer").should("have.text", "25:00");

    cy.get('svg[alt="Play timer"]').click();
    cy.tick(60000);
    cy.findByRole("timer").should("have.text", "24:00");
    cy.get('svg[alt="Pause timer"]').click();
    cy.tick(60000);
    cy.findByRole("timer").should("have.text", "24:00");
  });

  it(`should sitch to "${SHORT_BREAK_STATUS}" timer if "${FOCUS_STATUS}" timer has ended`, () => {
    cy.clock();

    cy.get('[data-testid="timer-text"]').should(
      "have.text",
      `${FOCUS_STATUS} #1`
    );
    cy.findByRole("timer").should("have.text", "25:00");

    cy.get('svg[alt="Play timer"]').click();
    cy.tick(1560000);

    cy.get('[data-testid="timer-text"]').should(
      "have.text",
      `${SHORT_BREAK_STATUS}`
    );
    cy.findByRole("timer").should("have.text", "05:00");
  });

  it(`should sitch to "${LONG_BREAK_STATUS}" timer after 4 focus iteration`, () => {
    cy.clock();

    function makeFocusIteration(iteration) {
      cy.get('[data-testid="timer-text"]').should(
        "have.text",
        `${FOCUS_STATUS} #${iteration}`
      );
      cy.findByRole("timer").should("have.text", "25:00");
      cy.get('svg[alt="Play timer"]').click();
      cy.tick(1560000);
    }

    function makeShortBreak(){
      cy.get('[data-testid="timer-text"]').should(
        "have.text",
        `${SHORT_BREAK_STATUS}`
      );
      cy.findByRole("timer").should("have.text", "05:00");
      cy.get('svg[alt="Play timer"]').click();
      cy.tick(360000);
    }

    makeFocusIteration(1)
    makeShortBreak()
    makeFocusIteration(2)
    makeShortBreak()
    makeFocusIteration(3)
    makeShortBreak()
    makeFocusIteration(4)

    cy.get('[data-testid="timer-text"]').should(
      "have.text",
      `${LONG_BREAK_STATUS}`
    );
    cy.findByRole("timer").should("have.text", "15:00");
  });
});
