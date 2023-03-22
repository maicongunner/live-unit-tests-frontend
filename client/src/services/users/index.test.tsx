import { signIn, signUp } from '.'

/* 
  Dica: como foi mockado globalmente esse módulo, é necessario remover o mock
  Dica 2: como iremos testar várias chamadas com vários retornos diferentes é um ótimo caso para
  espiar e alterar o retorno do fetch em cada teste
*/

jest.unmock('services/users') // remove mock global

const mockedUser = 'user'
const mockedPassword = 'senha'

describe('signIn()', () => {
  it('should call sign in with correct params', async () => {
    const mockedFetch = (
      jest.spyOn(window, 'fetch') as jest.Mock
    ).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: async () => [{ username: mockedUser }]
      })
    )

    const user = await signIn(mockedUser, mockedPassword)

    expect(user).toStrictEqual(mockedUser)
    expect(mockedFetch).toHaveBeenCalledTimes(1)
    expect(mockedFetch).toHaveBeenCalledWith(
      'http://localhost:8000/users?username=user&password=senha'
    )
  })

  it('should call sign in and return null if user does not exists', async () => {
    const mockedFetch = (
      jest.spyOn(window, 'fetch') as jest.Mock
    ).mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: async () => []
      })
    )

    const user = await signIn(mockedUser, mockedPassword)

    expect(user).toStrictEqual(null)
    expect(mockedFetch).toHaveBeenCalledTimes(1)
    expect(mockedFetch).toHaveBeenCalledWith(
      'http://localhost:8000/users?username=user&password=senha'
    )
  })

  it('should throw error if login fail', async () => {
    const mockedFetch = (
      jest.spyOn(window, 'fetch') as jest.Mock
    ).mockImplementation(() => Promise.reject('login error'))

    try {
      await signIn(mockedUser, mockedPassword)
    } catch (err) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err).toMatchInlineSnapshot(`[Error: login error]`)
    }
    expect(mockedFetch).toHaveBeenCalledTimes(1)
  })
})

describe('signUp()', () => {
  it('should call sign up with correct params', async () => {
    const mockedFetch = (
      jest.spyOn(window, 'fetch') as jest.Mock
    ).mockImplementation(() => Promise.resolve())

    await signUp(mockedUser, mockedPassword)

    expect(mockedFetch).toHaveBeenCalledTimes(1)
    expect(mockedFetch).toHaveBeenCalledWith('http://localhost:8000/users', {
      method: 'POST',
      body: JSON.stringify({ username: mockedUser, password: mockedPassword }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  })

  it('should throw error if sign up fail', async () => {
    const mockedFetch = (
      jest.spyOn(window, 'fetch') as jest.Mock
    ).mockImplementation(() => Promise.reject('sign up error'))

    try {
      await signUp(mockedUser, mockedPassword)
    } catch (err) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(err).toMatchInlineSnapshot(`[Error: sign up error]`)
    }
    expect(mockedFetch).toHaveBeenCalledTimes(1)
  })
})
