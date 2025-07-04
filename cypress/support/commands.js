Cypress.Commands.add('fillMandatoryFieldsAndSubmit',  data => {

    cy.get('#firstName').type(data.nome)
    cy.get('#lastName').type(data.sobrenome)
    cy.get('#email').type(data.email)
    cy.get('#phone').type(data.telefone)
    cy.get('#open-text-area').type(data.longoText)
    cy.get('button[type="submit"]').click()
})