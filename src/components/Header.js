import { Container, Navbar, Nav, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch } from 'react-redux'
import { logout } from '../actions/user-action'

const Header = () => {
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault()

    dispatch(logout())
  }

  return (
    <Navbar bg='primary' variant='dark'>
      <Container>
        <LinkContainer to='/admin/'>
          <Navbar.Brand>Arcana League</Navbar.Brand>
        </LinkContainer>
        <Nav className='ml-auto'>
          <LinkContainer to='/admin/teams'>
            <Nav.Link>Teams</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/admin/players'>
            <Nav.Link>Players</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/admin/tournaments'>
            <Nav.Link>Tournaments</Nav.Link>
          </LinkContainer>
          <LinkContainer to='#'>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
