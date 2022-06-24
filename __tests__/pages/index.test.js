import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

describe('Home', () => {
  it('renders a timer', () => {
    render(<Home /> )

    const timer = screen.getByRole('timer')

    expect(timer).toBeInTheDocument()
  })
})