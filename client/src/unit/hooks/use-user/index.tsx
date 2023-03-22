import { useContext, createContext, useState } from 'react'
import { signIn } from 'services/users'

type UserData = {
  username: string
  password: string
}

export type UserContextData = {
  authenticated: boolean
  username: string | null
  login: ({ username, password }: UserData) => Promise<void | null>
  logout: () => void
  error: string | null
}

export const UserContextDefaultValues = {
  authenticated: false,
  username: null,
  error: null,
  login: async () => null,
  logout: () => null
}

export const UserContext = createContext<UserContextData>(
  UserContextDefaultValues
)

export type UserProviderProps = {
  children: React.ReactNode
}

const UserProvider = ({ children }: UserProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [username, setUsername] = useState<string | null>(null)
  const [error, setError] = useState<string | null | any>(null)

  const login = async ({ username, password }: UserData) => {
    try {
      const user = await signIn(username, password)
      if (user) {
        setIsAuthenticated(true)
        setUsername(user)
      }
    } catch (err: any) {
      setError(err)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUsername(null)
  }

  return (
    <UserContext.Provider
      value={{ authenticated: isAuthenticated, username, error, login, logout }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => useContext(UserContext)

export { UserProvider, useUser }
