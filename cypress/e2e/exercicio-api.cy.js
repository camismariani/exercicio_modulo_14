/// <reference types="cypress" />
import contratoUsuario from "../contracts/usuarios.contract"

describe('Testes da Funcionalidade Usuários', () => {

    it('Deve validar contrato de usuários', () => {
         cy.request('usuarios').then(response =>{
               return contratoUsuario.validateAsync(response.body)
          })
    });

    it('Deve listar usuários cadastrados', () => {
         cy.request('usuarios').then((response) =>{
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
         })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
     cy.cadastrarUsuario("Camila", "camila@teste.com.br","123456","true")
          .then((response)=>{
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal("Cadastro realizado com sucesso")
         })
    });

    it('Deve validar um usuário com email inválido', () => {
     cy.cadastrarUsuario("Camila", "camila@teste","123456","true")   
          .then((response)=>{
               expect(response.status).to.equal(400)
               expect(response.body.email).to.equal("email deve ser um email válido")
         })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
          cy.cadastrarUsuario("Usuario Editar", "editar@teste.com.br","123456","true")
          .then(response =>{
               let id=response.body._id
               cy.editarUsuarioCadastrado(id,"Usuario Editar 1","editar@teste.com.br","123456","true")
                    .then(response =>{
                         expect(response.status).to.equal(200)
                         expect(response.body.message).to.equal("Registro alterado com sucesso")
          })
     })
    });

    it.only('Deve deletar um usuário previamente cadastrado', () => {
     cy.cadastrarUsuario("Usuario Excluir", "excluir@teste.com.br","123456","true")
     .then(response =>{
          let id=response.body._id
               cy.deletarUsuario(id)
                    .then(response =>{
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal("Registro excluído com sucesso")
                    })
               })
     });


});
