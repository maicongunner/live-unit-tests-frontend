import '@testing-library/jest-dom'

// mock global services
jest.mock('services/users', () => ({
  signIn: (username: string, password: string) => Promise.resolve(username),
  signUp: jest.fn((username, password) => Promise.resolve())
}))
