import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import TextField from '.'
import userEvent from '@testing-library/user-event'

describe('<TextField />', () => {
  /* 
    Em componentes o ideal é só ter testes unitários, só deve ter testes de integração se um
    componente utiliza outro em sua estrutura
  */
  it('should render correctly', () => {
    render(<TextField />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should render with label', () => {
    render(<TextField label="user" name="user" />)
    expect(screen.getByText(/user/i)).toBeInTheDocument()
  })

  it('should render without label', async () => {
    render(<TextField />)
    expect(screen.queryByLabelText(/label/i)).not.toBeInTheDocument()
  })

  it('should render with placeholder', () => {
    render(
      <TextField label="user" name="user" placeholder="Type your username" />
    )
    expect(
      screen.getByPlaceholderText(/Type your username/i)
    ).toBeInTheDocument()
  })

  it('should change its value when typing', async () => {
    const onInputChange = jest.fn()
    render(<TextField label="user" name="user" onInputChange={onInputChange} />)

    const input = screen.getByRole('textbox', { name: /user/i })
    const text = 'new value'

    userEvent.type(input, text)
    expect(input).toHaveValue(text)
    expect(onInputChange).toHaveBeenCalledWith(text)
    expect(onInputChange).toHaveBeenCalledTimes(text.length)
  })

  it('does not changes its value when disabled', async () => {
    const onInputChange = jest.fn()

    render(
      <TextField
        onInputChange={onInputChange}
        label="user"
        name="user"
        disabled
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    const text = 'new value'

    userEvent.type(input, text)
    await waitFor(() => {
      expect(input).not.toHaveValue(text)
    })
    expect(onInputChange).not.toHaveBeenCalled()
  })

  it('should render with error', () => {
    render(<TextField error="error message" />)

    const input = screen.getByRole('textbox')

    expect(screen.getByText(/error message/i)).toBeInTheDocument()
    expect(input).toHaveClass('border-red-600')
  })

  it('is accessible by tab', () => {
    render(<TextField label="user" name="user" />)

    const input = screen.getByLabelText('user')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).toHaveFocus()
    expect(input).toHaveStyle('background-color: white')
  })

  it('is not acessible by tab when disabled', () => {
    render(<TextField label="user" name="user" disabled />)

    const input = screen.getByLabelText('user')
    expect(document.body).toHaveFocus()

    userEvent.tab()
    expect(input).not.toHaveFocus()
  })
})
