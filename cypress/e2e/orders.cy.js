describe('Orders E2E Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err) => {
      if (
        err.message.includes(
          'ResizeObserver loop completed with undelivered notifications'
        )
      ) {
        return false
      }
    })

    cy.intercept('POST', 'http://localhost:4000/graphql').as('fetchGraphQL')

    cy.visit('http://localhost:5173/')

    cy.wait('@fetchGraphQL')

    cy.get('[data-cy=loading-indicator]', { timeout: 10000 }).should(
      'not.exist'
    )
  })

  describe('Create Orders', () => {
    it('should fill the form and create a new Venda order', () => {
      cy.contains('Nova Ordem').click()
      cy.get('[data-cy=select-instrument]').click()
      cy.get('[data-slot="select-item"]').contains('PETR4').click()
      cy.contains('Selecione o tipo de ordem').click()
      cy.get('[data-slot="select-item"]').contains('Venda').click()
      cy.get('input[placeholder="Quantidade"]').should('not.be.disabled')
      cy.get('input[placeholder="Quantidade"]').type('15')
      cy.get('button').contains('Criar Ordem').click()
    })

    it('should fill the form and create a new Compra order', () => {
      cy.contains('Nova Ordem').click()
      cy.get('[data-cy=select-instrument]').click()
      cy.get('[data-slot="select-item"]').contains('PETR4').click()
      cy.contains('Selecione o tipo de ordem').click()
      cy.get('[data-slot="select-item"]').contains('Compra').click()
      cy.get('input[placeholder="Quantidade"]').should('not.be.disabled')
      cy.get('input[placeholder="Quantidade"]').type('10')
      cy.get('button').contains('Criar Ordem').click()
    })

    it('should show messages error when fill form with invalid data', () => {
      cy.contains('Nova Ordem').click()
      cy.get('input[placeholder="Quantidade"]').should('not.be.disabled')
      cy.get('input[placeholder="Quantidade"]').type('-1')
      cy.get('button').contains('Criar Ordem').click()
      cy.contains('Selecione um instrumento financeiro.').should('be.visible')
      cy.contains('Selecione o tipo de ordem.').should('be.visible')
      cy.contains('A quantidade deve ser maior que 0').should('be.visible')
      cy.contains('O preço deve ser maior que 0.').should('be.visible')
    })
  })

  describe('Order Grid', () => {
    it('should open grid with orders', () => {
      cy.get('[data-cy=orders-data-grid]', { timeout: 10000 }).should('exist')
      cy.get('[data-cy=orders-data-grid]').should('be.visible')
    })

    it('should open the order details dialog', () => {
      cy.get(':nth-child(1) > :nth-child(1) > .flex > .text-blue-500')
        .first()
        .click()
      cy.contains('Detalhes da ordem').should('be.visible')
    })

    it('should open the order cancel order dialog', () => {
      cy.get('.text-red-500').first().click()
      cy.contains('Deseja cancelar a order').should('be.visible')
    })

    it('should open order details page', () => {
      cy.get(':nth-child(1) > :nth-child(1) > .flex > .text-blue-500')
        .first()
        .click()
      cy.contains('Detalhes da ordem').should('be.visible')
      cy.contains('Ver Histórico').click()
      cy.contains('Detalhes da ordem').should('be.visible')
    })

    it('should return to home after click back button', () => {
      cy.get(':nth-child(1) > :nth-child(1) > .flex > .text-blue-500')
        .first()
        .click()
      cy.contains('Detalhes da ordem').should('be.visible')
      cy.contains('Ver Histórico').click()
      cy.contains('Detalhes da ordem').should('be.visible')
      cy.get('button').click()
      cy.contains('Ordens Recentes').should('be.visible')
    })
  })

  describe('Filter Orders', () => {
    it('should load only rows with "Venda" or no rows if "Venda" was selected', () => {
      cy.contains('Compra/Venda').click()
      cy.get('[data-slot="select-item"]').contains('Venda').click()
      cy.wait('@fetchGraphQL')
      cy.get('[data-cy=orders-data-grid] tbody tr').then(($rows) => {
        if ($rows.length > 0) {
          cy.wrap($rows).each(($row) => {
            cy.wrap($row)
              .find('td:nth-child(4)')
              .should('contain.text', 'Venda')
          })
        } else {
          cy.log('No rows loaded for "Venda"')
        }
      })
    })

    it('should load only rows with "Compra" or no rows if "Compra" was selected', () => {
      cy.contains('Compra/Venda').click()
      cy.get('[data-slot="select-item"]').contains('Compra').click()
      cy.wait('@fetchGraphQL')
      cy.get('[data-cy=orders-data-grid] tbody tr', { timeout: 10000 }).should(
        'exist'
      )
      cy.get('[data-cy=orders-data-grid] tbody tr').then(($rows) => {
        const rowCount = $rows.length
        cy.log(`Number of rows: ${rowCount}`)
        if (rowCount > 0) {
          for (let i = 0; i < rowCount; i++) {
            cy.get(
              `[data-cy=orders-data-grid] tbody tr:nth-child(${i + 1}) td:nth-child(4)`
            ).should('contain.text', 'Compra')
          }
        } else {
          cy.log('No rows loaded for "Compra"')
        }
      })
    })

    it('should load only rows with "Aberta"', () => {
      cy.contains('Nova Ordem').click()
      cy.get('[data-cy=select-instrument]').click()
      cy.get('[data-slot="select-item"]').contains('VALE3').click()
      cy.contains('Selecione o tipo de ordem').click()
      cy.get('[data-slot="select-item"]').contains('Venda').click()
      cy.get('input[placeholder="Quantidade"]').should('not.be.disabled')
      cy.get('input[placeholder="Quantidade"]').type('15')
      cy.get('button').contains('Criar Ordem').click()
      cy.contains('Selecione Status').click()
      cy.get('[data-slot="select-item"]').contains('Aberta').click()
      cy.wait('@fetchGraphQL')
      cy.get('[data-cy=orders-data-grid] tbody tr').then(($rows) => {
        if ($rows.length > 0) {
          cy.wrap($rows).each(($row) => {
            cy.wrap($row)
              .find('td:nth-child(8)')
              .should('contain.text', 'Aberta')
          })
        } else {
          cy.log('No rows loaded for "Aberta"')
        }
      })
    })

    it('should load only rows with "Executada"', () => {
      cy.contains('Selecione Status').click()
      cy.get('[data-slot="select-item"]').contains('Executada').click()
      cy.wait('@fetchGraphQL')
      cy.get('[data-cy=orders-data-grid] tbody tr').then(($rows) => {
        if ($rows.length > 0) {
          cy.wrap($rows).each(($row) => {
            cy.wrap($row)
              .find('td:nth-child(8)')
              .should('contain.text', 'Executada')
          })
        } else {
          cy.log('No rows loaded for "Executada"')
        }
      })
    })

    it('shoud load only rows with PETR4 instrument', () => {
      cy.get('input[placeholder="Filtrar por Instrumento"]')
        .click()
        .type('PETR4')
      cy.get('[data-cy=orders-data-grid] tbody tr').then(($rows) => {
        if ($rows.length > 0) {
          cy.wrap($rows).each(($row) => {
            cy.wrap($row)
              .find('td:nth-child(3)')
              .should('contain.text', 'PETR4')
          })
        } else {
          cy.log('No rows loaded for "PETR4"')
        }
      })
    })

    it('should load only rows with Today Date', () => {
      const formattedDate = new Intl.DateTimeFormat('pt-BR').format(new Date())
      cy.get(':nth-child(5) > .border').click()
      cy.get(':nth-child(1) > :nth-child(7) > .rdp-button_reset').click()
      cy.get('[data-cy=orders-data-grid] tbody tr').then(($rows) => {
        if ($rows.length > 0) {
          cy.wrap($rows).each(($row) => {
            cy.wrap($row)
              .find('td:nth-child(9)')
              .should('contain.text', formattedDate)
          })
        } else {
          cy.log('No rows loaded for Today Date')
        }
      })
    })

    it('should load only rows with ID 1', () => {
      cy.get('input[placeholder="Filtrar por ID"]').click().type('1')
      cy.wait('@fetchGraphQL')
      cy.get('[data-cy=orders-data-grid] tbody tr td:nth-child(2)').should(
        'contain.text',
        '1'
      )
    })
    it('should clear all fields after click "Limpar todos filtros"', () => {
      cy.get('input[placeholder="Filtrar por ID"]').click().type('1')
      cy.get('input[placeholder="Filtrar por Instrumento"]')
        .click()
        .type('PETR4')
      cy.contains('Compra/Venda').click()
      cy.get('[data-slot="select-item"]').contains('Compra').click()
      cy.contains('Selecione Status').click()
      cy.get('[data-slot="select-item"]').contains('Executada').click()
      cy.get(':nth-child(5) > .border').click()
      cy.get(':nth-child(1) > :nth-child(7) > .rdp-button_reset').click()

      cy.get('button').contains('Limpar todos filtros').click()
      cy.get('input[placeholder="Filtrar por ID"]').should('have.value', '')
      cy.get('input[placeholder="Filtrar por Instrumento"]').should(
        'have.value',
        ''
      )
      cy.get('button').contains('Compra/Venda')
      cy.get('button').contains('Selecione Status')
      cy.get(':nth-child(5) > .border > span').contains('Escolha uma data')
    })
  })

  describe('Change Order Status', () => {
    it('should change status from Aberta to Cancelada', () => {
      cy.get('.text-red-500')
        .first()
        .parents('tr')
        .then(($row) => {
          cy.wrap($row).find('.text-red-500').click()
          cy.contains('Deseja cancelar a order').should('be.visible')
          cy.get('button').contains('Sim').click()
          cy.wait('@fetchGraphQL')
          cy.wrap($row)
            .find('td:nth-child(8)')
            .should('contain.text', 'Cancelada')
        })
    })
  })
})
