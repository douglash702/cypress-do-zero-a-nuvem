
describe('Central de Atendimento ao Cliente TAT', () => {
  const nome = 'Rafael'
  const sobrenome = 'Silva'
  const email = 'Teste@gmail.com'
  const telefone = '1999999'
  const longoText = Cypress._.repeat('ok', 2)
  const emailInvalido = 'email-invalido-sem-arroba.com'
   
   beforeEach(() => {
      cy.visit('./src/index.html')
    })

  it('Verificar o titulo da aplicação', () => {
     cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

  it('preenche os campos obrigatórios e envia o formulário', () =>  {
     cy.clock()
    const longoText = Cypress._.repeat('ok', 2)

    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type('RafaelSilva@test.com')
    cy.get('#phone').type(telefone)
    cy.get('#open-text-area').type(longoText)
    cy.get('button[type="submit"]').click()


    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')


  })

  Cypress._.times(3, () =>{ it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
  
   cy.get('#firstName').type(nome)
   cy.get('#lastName').type(sobrenome)
   cy.get('#email').type(emailInvalido)
   cy.get('#phone').type(telefone)
   cy.get('#open-text-area').type(longoText)
   cy.get('button[type="submit"]').click()

   cy.get('.error').should('be.visible')
   
   cy.tick(3000)

   cy.get('.error').should('not.be.visible')
   
  }) })
  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
    .type('abcdefghij')
    .should('have.value', '')
  }) 

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()

    cy.get('#firstName').type(nome)
    cy.get('#lastName').type(sobrenome)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(longoText)
    cy.get('[for="phone-checkbox"]').click()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
     
    cy.tick(3000)

    cy.get('.error').should('not.be.visible')

  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
    .type(nome)
    .should('have.value', nome)
    .clear()
    .should('have.value', '')

  })
  it(' exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()

    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.clock()
    const data = {
      nome: 'Rafael',
      sobrenome: 'Silva',
      email: 'test@gmail.com',
      telefone: '1999999',
      longoText: Cypress._.repeat('ok', 10)
}

   cy.fillMandatoryFieldsAndSubmit(data)
  
   cy.get('.success').should('be.visible')

   cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

  it('seleciona um produto (YouTube) por seu texto', () => {
   
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
    })
    
it('seleciona um produto (Mentoria) por seu valor (value)', () =>{

   cy.get('#product')
   .select('mentoria')
   .should('have.value', 'mentoria')

})

it('seleciona um produto (Blog) por seu índice', () => {

  cy.get('#product')
  .select(1)
  .should('have.value', 'blog')
})

it('marca o tipo de atendimento "Feedback', () => {

 cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should('be.checked')
})

it('marca cada tipo de atendimento', () => {
   cy.get('input[type="radio"]')
    .each(typeOfService => {
     cy.wrap(typeOfService)
      .check()
       .should('be.checked')
    })
})

it('marca ambos checkboxes, depois desmarca o último', () => {
   cy.get('input[type="checkbox"]')
    .as('checkboxes')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked') 
})
it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
 cy.clock()
  cy.get('#firstName').type(nome)
   cy.get('#lastName').type(sobrenome)
    cy.get('#email').type(email)
      cy.get('#phone-checkbox').check().should('be.checked')
       cy.get('#open-text-area').type(longoText)
        cy.get('button[type="submit"]').click()
         cy.get('.error').should('be.visible')
          cy.tick(3000)
           cy.get('.error').should('not.be.visible')
        
        })

         
         
        
        
        
it('seleciona um arquivo da pasta fixtures', () =>  {
      cy.get('input[type="file"]')
       .selectFile('cypress/fixtures/example.json')
        .should((input) =>{
         expect(input[0].files[0].name).to.equal('example.json')
})
  })


it("selecione um arquivo simulando um drag-and-drop", () => {
cy.get('input[type="file"]')
  .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
  .should((input) => {
    expect(input[0].files[0].name).to.equal('example.json')
  })
})
it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
 cy.contains('a', 'Política de Privacidade')
   .should('have.attr', 'target', '_blank')

})

it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {

cy.get('#privacy a').invoke('removeAttr', 'target')
  .click()
  
  
  cy.url().should('include', 'privacy'); // Verifica se a URL contém 'privacy' (ou o path correto da sua política)
  cy.get('body').should('contain.text', 'CAC TAT - Política de Privacidade');

})

it("testa a página da política de privacidade de forma independente", () => {
cy.visit('./src/privacy.html')
cy.contains('Talking About Testing').should('be.visible')



})


})

