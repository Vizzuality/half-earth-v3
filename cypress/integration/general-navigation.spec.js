describe('General navigation', () => {
  it('User lands on Data Globe if no path is provided ', function () {
    cy.visit('https://half-earth.vizzuality.com/', {
      onBeforeLoad (window) {
        delete window.navigator.__proto__.serviceWorker
      }
    })
    cy.url().should('include', '/dataGlobe')
  })
})
