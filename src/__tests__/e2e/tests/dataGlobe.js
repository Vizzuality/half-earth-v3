/* eslint-disable no-undef */

describe('loads data globe', function() {
  it('loads and redirects to /dataGlobe path', function() {
    cy.visit('/');
    cy.url().should('include', '/dataGlobe')
  })

  it('loads entry boxes', function() {
    cy.visit('/dataGlobe');
    cy.contains('Loading...')
    cy.get('[data-cy=entry-boxes]', { timeout: 15000 }).should('exist')
  })
})