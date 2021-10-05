import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './user-style.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../actions/user-action'

const Header = () => {
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { userInfo } = userDetails

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
    >
      <Container>
        <Navbar.Brand href='#home'>
          <img src='/assets/images/user/arcana_logo.png' alt='arcana-logo' />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' className='ml-5 pl-5'>
          <Nav className='mr-auto'>
            {userInfo ? (
              <>
                <LinkContainer to='/'>
                  <Nav.Link>
                    <i class='fas fa-home'></i>
                    {'  '}HOME
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/players'>
                  <Nav.Link>
                    <i class='fas fa-user'></i>
                    {'  '}PLAYERS
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/teams'>
                  <Nav.Link>
                    <i class='fas fa-user-friends'></i>
                    {'  '}TEAMS
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/my-tournaments'>
                  <Nav.Link>
                    <i class='fas fa-chess'></i>
                    {'  '}MY TOURNAMENTS
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
              </>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i class='fas fa-user'></i> Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
