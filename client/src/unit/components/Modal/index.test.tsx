import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '.'

describe('<Modal />', () => {
  /*
    Nesse teste vemos a necessidade do uso do .not para garantir que o componente
    não está na DOM antes de abrirmos ele.

    Por questões de performance o nosso modal precisa de uma refatoração para
    evitar que aumente a quantidade de elementos no dom e de lógica carregada
    sem necessidade
  */
  it('should find modal content only if is opened', () => {
    render(<Modal>modal content</Modal>)

    const modalContent = screen.getByText(/modal content/i)

    expect(modalContent).toBeInTheDocument()
  })

  it('should open modal', () => {
    render(<Modal>modalContent</Modal>)

    const modal = screen.getByLabelText('modal')
    const button = screen.getByRole('button', { name: /abrir modal/i })

    expect(modal).toHaveAttribute('aria-hidden', 'true')
    userEvent.click(button)
    expect(modal).toHaveAttribute('aria-hidden', 'false')
  })

  it('should close modal clicking on overlay', () => {
    render(<Modal>modalContent</Modal>)

    const modal = screen.getByLabelText('modal')
    const closeButton = screen.getByLabelText('fechar modal')
    const openButton = screen.getByRole('button', { name: /abrir modal/i })

    userEvent.click(openButton)
    expect(modal).toHaveAttribute('aria-hidden', 'false')
    userEvent.click(closeButton)
    expect(modal).toHaveAttribute('aria-hidden', 'true')
  })

  it('should close modal when key esc is pressed', () => {
    const { container } = render(<Modal>modalContent</Modal>)

    const modal = screen.getByLabelText('modal')
    const openButton = screen.getByRole('button', { name: /abrir modal/i })

    userEvent.click(openButton)
    expect(modal).toHaveAttribute('aria-hidden', 'false')
    fireEvent.keyUp(container, { key: 'Escape' })
    expect(modal).toHaveAttribute('aria-hidden', 'true')
  })
})
