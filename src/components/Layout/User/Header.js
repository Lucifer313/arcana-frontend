import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './style.css'

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      className='navbar-container'
      variant='dark'
      style={{
        backgroundImage: `url(
          /assets/images/user/top_menu_header_gold_stripes.jpg
        )`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'black',
      }}
    >
      <Container>
        <Navbar.Brand href='#home'>
          <img
            src='/assets/images/user/arcana_logo.png'
            alt='arcana-logo'
            className='arcana-logo'
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' className='ml-5 pl-5'>
          <Nav className='mr-auto'>
            <LinkContainer to='/'>
              <Nav.Link className='user-header-link'>HOME</Nav.Link>
            </LinkContainer>
            <Nav.Link className='nav-separator'>/</Nav.Link>
            <LinkContainer to='/teams'>
              <Nav.Link className='user-header-link'>TEAMS</Nav.Link>
            </LinkContainer>
            <Nav.Link className='nav-separator'>/</Nav.Link>
            <LinkContainer to='/players'>
              <Nav.Link className='user-header-link'>PLAYERS</Nav.Link>
            </LinkContainer>
            <Nav.Link className='nav-separator'>/</Nav.Link>
            <LinkContainer to='/profile'>
              <Nav.Link className='user-header-link'>PROFILE</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
