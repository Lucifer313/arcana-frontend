import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './user-style.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../../actions/user-action'

const Header = () => {
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault()

    dispatch(logout())
  }
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      className='navbar-container'
      variant='dark'
      bg='primary'
    >
      <Container>
        <Navbar.Brand href='#home'>
          <img
            src='/assets/images/admin/arcana_a_logo_white.png'
            alt='arcana-logo'
            style={{ width: '80px', height: '50px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' className='ml-5 pl-5'>
          <Nav className='mr-auto'>
            <LinkContainer to='/'>
              <Nav.Link>
                <i class='fas fa-home'></i> HOME
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/teams'>
              <Nav.Link>
                <i class='fas fa-user-friends'></i> TOURNAMENT
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/profile'>
              <Nav.Link>
                <i class='fas fa-user'></i> PROFILE
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='#'>
              <Nav.Link onClick={handleLogout}>
                <i class='fas fa-power-off'></i> LOGOUT
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
