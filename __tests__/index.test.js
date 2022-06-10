import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

describe('Home', () => {
  it.skip('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})