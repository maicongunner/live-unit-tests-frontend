import { act, renderHook } from '@testing-library/react'
import {
  UserContextDefaultValues,
  UserProvider,
  UserProviderProps,
  useUser
} from '.'
import UsersService from '../../../services/users'

const fakeUser = {
  username: 'user',
  password: 'senha'
}

const wrapper = ({ children }: UserProviderProps) => (
  <UserProvider>{children}</UserProvider>
)

describe('useUser()', () => {
  it('should authenticate user', async () => {
    const { result } = renderHook(() => useUser(), {
      wrapper
    })

    expect(result.current.username).toBe(null)
    expect(result.current.authenticated).toBe(false)

    await act(async () => {
      await result.current.login(fakeUser)
    })

    expect(result.current.username).toBe('user')
    expect(result.current.authenticated).toBe(true)
  })

  it('should not authenticate if user does not exists', async () => {
    // mock local do signIn(), somente para funcionar nesta função.
    const signInMock = jest
      .spyOn(UsersService, 'signIn')
      .mockReturnValueOnce(Promise.resolve())

    const { result } = renderHook(() => useUser(), {
      wrapper
    })

    await act(async () => {
      await result.current.login(fakeUser)
    })

    expect(result.current.username).toBe(null)
    expect(result.current.authenticated).toBe(false)

    signInMock.mockRestore()
  })

  it('should logout user correctly', async () => {
    const { result } = renderHook(() => useUser(), {
      wrapper
    })

    await act(async () => {
      await result.current.login(fakeUser)
    })

    expect(result.current.username).toStrictEqual('user')
    expect(result.current.authenticated).toBe(true)

    act(() => {
      result.current.logout()
    })

    expect(result.current.username).toBe(null)
    expect(result.current.authenticated).toBe(false)
  })

  it('should throw error if login fails', async () => {
    const signInMock = jest
      .spyOn(UsersService, 'signIn')
      .mockReturnValueOnce(Promise.reject('login error'))

    const { result } = renderHook(() => useUser(), {
      wrapper
    })

    await act(async () => {
      await result.current.login(fakeUser)
    })

    expect(result.current.error).toStrictEqual('login error')
    expect(result.current.authenticated).toBe(false)
    expect(result.current.username).toStrictEqual(null)

    signInMock.mockRestore()
  })

  it('should return null on default logout call', () => {
    expect(UserContextDefaultValues.logout()).toBeNull()
  })

  it('should return null on default login call', async () => {
    expect(await UserContextDefaultValues.login()).toBeNull()
  })
})
