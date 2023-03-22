import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from '.'

describe('<Button />', () => {
  /*
    O Primeiro teste é recomendado ser sempre a variação 'padrão' do seu módulo,
    sendo passado o minimo de props necessária para sua renderização

    Dica: Ao finalizar a criação do componente, adicione um teste de snapshot no
    teste das propriedades padrões para garantir que qualquer alteração no componente
    o teste falhe
  */
  it('should render the medium size by default', () => {
    const { container } = render(<Button>button</Button>)

    const button = screen.getByRole('button', { name: /button/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('text-base')
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the small button variant', () => {
    render(<Button size="sm">button</Button>)

    const button = screen.getByRole('button', { name: /button/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('text-sm')
  })

  it('should render the big button variant', () => {
    render(<Button size="lg">button</Button>)

    const button = screen.getByRole('button', { name: /button/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('text-lg')
  })

  it('should render a disabled button', () => {
    render(<Button disabled>button</Button>)

    const button = screen.getByRole('button', { name: /button/i })

    expect(button).toBeDisabled()
  })

  it('should render a secundary button style', () => {
    render(<Button color="secondary">button</Button>)

    const button = screen.getByRole('button', { name: /button/i })

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-gray-300 text-black')
  })
})
