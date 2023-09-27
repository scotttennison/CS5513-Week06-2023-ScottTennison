import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

const allTeam = [
    { id: '1', team_name: 'Chiefs' },
    { id: '2', team_name: 'Eagles' },
   
  ];

describe('Home', () => {
  
  it('renders a heading', () => {
    render(<Home />)
 
    const heading = screen.getByRole('heading', {
      name: /Top Six Teams to Win the Super Bowl/i,
    })
 
    expect(heading).toBeInTheDocument()
  });



it('finds the specific Link for a team', () => {
 
  render(<Home allTeam={allTeam} />); 

  const chiefsLink = screen.getByRole('link', { name: /Chiefs/i });

  expect(chiefsLink).toBeInTheDocument();
 
});

})