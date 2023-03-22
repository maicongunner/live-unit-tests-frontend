import { signInValidate, signUpValidate } from '.'

describe('validations', () => {
  /*
    A gente precisa testar todas nossas funções, nesse caso podemos testar 
    se nossa função de validação está certa evitando que alterações nela façam o 
    comportamento dos formulários alterar.
 
    Ex.: Alguém alterou a quantidade miníma de caracteres de 4 para 2 nosso teste pega esse erro antes
         de subir essa alteração.

    Dica: Podemos utilizar tanto .toMatchInlineSnapshot() quanto .toStrictEqual()
  */
  describe('signInValidate()', () => {
    it('should validate empty fields', () => {
      expect(signInValidate({ username: '', password: '' }))
        .toMatchInlineSnapshot(`
        Object {
          "password": "senha obrigatória",
          "username": "usuário obrigatório",
        }
      `)
    })
  })

  describe('signUpValidate()', () => {
    it('should validate empty fields', () => {
      expect(
        signUpValidate({ username: '', password: '', confirm_password: '' })
      ).toMatchInlineSnapshot(`
        Object {
          "password": "senha obrigatória",
          "username": "usuário obrigatório",
        }
      `)
    })

    it('should return short username error', () => {
      expect(
        signUpValidate({
          username: '123',
          password: 'password123',
          confirm_password: 'password123'
        })
      ).toStrictEqual({
        username: 'usuário precisa ter no mínimo 4 caracteres'
      })
    })
    it('should return error if password and confirm password does not match', () => {
      expect(
        signUpValidate({
          username: 'user123',
          password: 'password123',
          confirm_password: 'password321'
        })
      ).toStrictEqual({
        confirm_password: 'senhas não conferem'
      })
    })
  })
})
