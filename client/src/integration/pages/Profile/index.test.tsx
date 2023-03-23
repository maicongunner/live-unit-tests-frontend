import { screen } from '@testing-library/react'
import Profile from '.'
import { render } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'

describe('<Profile />', () => {
  /* 
    Dica: Aqui podemos fazer tanto teste unitário quanto de integração, testando exatamente
    todos os comportamentos da página
  */
  it('should render the profile page with components correctly', () => {
    render(<Profile />)

    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sair/i })).toBeInTheDocument()
  })

  it('should show logged user name', () => {
    render(<Profile />, {
      userProviderProps: {
        username: 'usuario2',
        authenticated: true,
        error: '',
        login: jest.fn(),
        logout: jest.fn()
      }
    })

    expect(
      screen.getByRole('heading', { name: /usuario2/i })
    ).toBeInTheDocument()
  })

  it('should logout and redirect to /login', () => {
    const logoutFn = jest.fn()
    render(<Profile />, {
      userProviderProps: {
        username: 'usuario2',
        error: '',
        authenticated: true,
        login: jest.fn(),
        logout: logoutFn
      }
    })

    userEvent.click(screen.getByRole('button', { name: /sair/i }))

    expect(logoutFn).toHaveBeenCalled()
  })
})
