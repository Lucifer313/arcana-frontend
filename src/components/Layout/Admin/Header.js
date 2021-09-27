import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import { useDispatch } from 'react-redux'
import { logout } from '../../../actions/user-action'

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
          <Navbar.Brand>
            <img
              src='/assets/images/user/arcana_logo.png'
              width='50px'
              alt='arcana-logo'
            />
          </Navbar.Brand>
        </LinkContainer>
        <Nav className='ml-auto'>
          <LinkContainer to='/admin/teams'>
            <Nav.Link>
              <i class='fas fa-user-friends'></i> Teams
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/admin/players'>
            <Nav.Link>
              <i class='fas fa-user'></i> Players
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='/admin/tournaments'>
            <Nav.Link>
              <i class='fas fa-chess'></i> Tournaments
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to='#'>
            <Nav.Link onClick={handleLogout}>
              <i class='fas fa-power-off'></i> Logout
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
