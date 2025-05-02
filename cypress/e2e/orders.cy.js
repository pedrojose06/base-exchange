describe('Orders E2E Test', () => {
  beforeEach(() => {
    // Ignore ResizeObserver errors
    cy.on('uncaught:exception', (err) => {
      if (
        err.message.includes(
          'ResizeObserver loop completed with undelivered notifications'
        )
      ) {
        return false // Prevent Cypress from failing the test
      }
    })

    // Visit the orders page before each test
    cy.visit('http://localhost:5173/')
  })

  it('should fill the form and create a new order', () => {
    // Open the "Nova ordem" dialog
    cy.contains('Nova Ordem').click()

    // Select "PETR4" in the first <Select>
    cy.get('[data-cy=select-instrument]').click({ force: true }) // Open the dropdown
    cy.get('[data-slot="select-item"]').contains('PETR4').click({ force: true }) // Select the option

    // Select "Compra" in the second <Select>
    cy.contains('Selecione o tipo de ordem').click({ force: true }) // Open the dropdown
    cy.get('[data-slot="select-item"]')
      .contains('Compra')
      .click({ force: true }) // Select the option

    // Wait for the "Quantidade" input to become enabled
    cy.get('input[placeholder="Quantidade"]').should('not.be.disabled')

    // Fill the "Quantidade" input
    cy.get('input[placeholder="Quantidade"]').type('10')

    // Submit the form
    cy.get('button').contains('Criar Ordem').click()
  })
})
