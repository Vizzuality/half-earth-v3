describe('My First Test', () => {
  it('disables it', function () {
    cy.visit('https://half-earth.vizzuality.com/', {
      onBeforeLoad (win) {
        delete win.navigator.__proto__.serviceWorker
      }
    })
    cy.url().should('include', '/dataGlobe')
  })
})
