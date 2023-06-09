import React from 'react'
import { getByTestId, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { UserContext } from 'unit/hooks/use-user'
import Routes from '.'

jest.mock('integration/pages/SignIn', () => ({
  __esModule: true,
  default: function () {
    return <div data-testid="signin-mock" />
  }
}))

jest.mock('integration/pages/SignUp', () => ({
  __esModule: true,
  default: function () {
    return <div data-testid="signup-mock" />
  }
}))

jest.mock('integration/pages/Profile', () => ({
  __esModule: true,
  default: function () {
    return <div data-testid="profile-mock" />
  }
}))

describe('<AppRoutes />', () => {
  /*
    Não faz sentido testar uma biblioteca externa, a gente infere que ela
    já está testada, mas a gente precisa garantir que nossa funcionalidade está 
    correta, nesse caso se ao acessar uma rota o modúlo correto é carregado.
    é um bom caso de uso para o jest.mock
  */
  it('should render sign in page if url is /', async () => {
    render(
      <React.Suspense>
        <Routes />
      </React.Suspense>,
      { wrapper: MemoryRouter }
    )

    await waitFor(() => {
      expect(screen.getByTestId('signin-mock')).toBeInTheDocument()
    })
  })

  it('should render sign up page if url is /signup', async () => {
    render(
      <React.Suspense>
        <MemoryRouter initialEntries={['/signup']}>
          <Routes />
        </MemoryRouter>
      </React.Suspense>
    )

    await waitFor(() => {
      expect(screen.getByTestId('signup-mock')).toBeInTheDocument()
    })
  })

  it('should render profile page if url is /profile', async () => {
    render(
      <React.Suspense>
        <MemoryRouter initialEntries={['/profile']}>
          <UserContext.Provider
            value={{
              authenticated: true,
              error: null,
              login: jest.fn(),
              logout: jest.fn(),
              username: 'username'
            }}
          >
            <Routes />
          </UserContext.Provider>
        </MemoryRouter>
      </React.Suspense>
    )

    await waitFor(() => {
      expect(screen.getByTestId('profile-mock')).toBeInTheDocument()
    })
  })

  it('should redirect to / if url has no matchs', async () => {
    render(
      <React.Suspense>
        <MemoryRouter initialEntries={['/invalidUrl']}>
          <Routes />
        </MemoryRouter>
      </React.Suspense>
    )

    await waitFor(() => {
      expect(screen.getByTestId('signin-mock')).toBeInTheDocument()
    })
  })
})
