import { render, screen } from '@testing-library/react'
import SignInForm from '.'
import userEvent from '@testing-library/user-event'

describe('<SignInForm />', () => {
  it('should render the form correctly', () => {
    render(<SignInForm />)

    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /usuário/i })
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('should fill and submit the form', () => {
    render(<SignInForm />)

    const fakeUser = {
      user: 'teste',
      password: '123123'
    }

    const userNameField = screen.getByRole('textbox', { name: /Usuário/i })
    userEvent.type(userNameField, fakeUser.user)

    const passwordField = screen.getByLabelText(/Senha/i)
    userEvent.type(passwordField, fakeUser.password)

    const buttonSubmit = screen.getByRole('button', { name: /Entrar/i })
    userEvent.click(buttonSubmit)

    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })

  it('should return error if fields are empty', () => {
    render(<SignInForm />)

    const buttonSubmit = screen.getByRole('button', { name: /Entrar/i })
    userEvent.click(buttonSubmit)

    expect(screen.getByText(/usuário obrigatório/i)).toBeInTheDocument()
    expect(screen.getByText(/senha obrigatória/i)).toBeInTheDocument()
  })

  it('should return error when fields are incorrect with less than 4 digits', () => {
    render(<SignInForm />)

    const fakeUser = {
      user: 'tes',
      password: '123'
    }

    const userNameField = screen.getByRole('textbox', { name: /Usuário/i })
    userEvent.type(userNameField, fakeUser.user)

    const passwordField = screen.getByLabelText(/Senha/i)
    userEvent.type(passwordField, fakeUser.password)

    const buttonSubmit = screen.getByRole('button', { name: /Entrar/i })
    userEvent.click(buttonSubmit)

    expect(
      screen.getByText(/usuário precisa ter no mínimo 4 caracteres/i)
    ).toBeInTheDocument()
    expect(
      screen.getByText(/senha precisa ter no mínimo 4 caracteres/i)
    ).toBeInTheDocument()
    expect(screen.queryByText(/carregando/i)).not.toBeInTheDocument()
  })
})
