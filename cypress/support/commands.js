Cypress.Commands.add('fillMandatoryFieldsAndSubmit',  data => {

    cy.get('#firstName').type(data.nome, {delay: 25})
    cy.get('#lastName').type(data.sobrenome, {delay: 25})
    cy.get('#email').type(data.email, {delay: 25})
    cy.get('#phone').type(data.telefone, {delay: 25})
    cy.get('#open-text-area').type(data.longoText, {delay: 25})
    cy.get('button[type="submit"]').click()
})