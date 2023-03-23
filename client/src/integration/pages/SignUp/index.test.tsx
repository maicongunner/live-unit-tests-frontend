import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUp from '.'

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate
}))

describe('<SignUp />', () => {
  it('should render the sign up page with components correctly', () => {
    render(<SignUp />)

    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^senha/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /criar conta/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument()
  })

  it('should call navigate to / page if clicked on go back button', () => {
    render(<SignUp />)

    userEvent.click(screen.getByRole('button', { name: /voltar/i }))
    expect(mockedNavigate).toHaveBeenCalled()
    expect(mockedNavigate).toHaveBeenCalledWith('/')
  })

  it('should fill sign up and submit correctly', () => {
    const mockedSignUp = jest
      .spyOn(require('services/users'), 'signUp')
      .mockImplementation(() => Promise.resolve())

    render(<SignUp />)

    const fakeUser = {
      username: 'user',
      password: 'senha',
      confirm_password: 'senha'
    }
    const userInput = screen.getByLabelText(/usuário/i)
    const passwordInput = screen.getByLabelText(/^senha/i)
    const confirmPasswordInput = screen.getByLabelText(/confirmar senha/i)

    userEvent.type(userInput, fakeUser.username)
    userEvent.type(passwordInput, fakeUser.password)
    userEvent.type(confirmPasswordInput, fakeUser.confirm_password)

    userEvent.click(screen.getByRole('button', { name: /criar conta/i }))

    expect(mockedSignUp).toHaveBeenCalledTimes(1)
    expect(mockedSignUp).toHaveBeenCalledWith(
      fakeUser.username,
      fakeUser.password
    )
  })
})
