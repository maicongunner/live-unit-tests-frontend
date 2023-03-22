import { render, screen } from '@testing-library/react'
import SignUpForm from '.'
import userEvent from '@testing-library/user-event'

describe('<SignUpForm />', () => {
  it('should render the form correctly', () => {
    render(<SignUpForm />)

    expect(
      screen.getByRole('form', { name: /Formulário de cadastro/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /Usuário/i })
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/^senha/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirmar senha/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /criar conta/i })
    ).toBeInTheDocument()
  })

  it('should fill and submit the form', () => {
    render(<SignUpForm />)

    const fakeUser = {
      user: 'usertest',
      password: '1234',
      password_confirm: '1234'
    }

    const userNameField = screen.getByRole('textbox', { name: /Usuário/i })
    userEvent.type(userNameField, fakeUser.user)

    const passwordField = screen.getByLabelText(/^senha/i)
    userEvent.type(passwordField, fakeUser.password)

    const passwordConfirmField = screen.getByLabelText(/confirmar senha/i)
    userEvent.type(passwordConfirmField, fakeUser.password_confirm)

    const buttonSubmit = screen.getByRole('button', { name: /criar conta/i })
    userEvent.click(buttonSubmit)

    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('should return error when password and password confirm values are different', () => {
    render(<SignUpForm />)

    const fakeUser = {
      user: 'usertest',
      password: '1234',
      password_confirm: '123'
    }

    const userNameField = screen.getByRole('textbox', { name: /Usuário/i })
    userEvent.type(userNameField, fakeUser.user)

    const passwordField = screen.getByLabelText(/^senha/i) // "^" find the text "password" on the start of word
    userEvent.type(passwordField, fakeUser.password)

    const passwordConfirmField = screen.getByLabelText(/confirmar senha/i)
    userEvent.type(passwordConfirmField, fakeUser.password_confirm)

    const buttonSubmit = screen.getByRole('button', { name: /criar conta/i })
    userEvent.click(buttonSubmit)

    expect(screen.getByText(/senhas não conferem/i)).toBeInTheDocument()
    expect(screen.queryByText(/carregando/i)).not.toBeInTheDocument()
  })
})
