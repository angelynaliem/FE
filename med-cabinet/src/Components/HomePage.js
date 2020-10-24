import React, { useState } from 'react';
import { Link } from "react-router-dom";

//reactstrap styles
import {Container,
    Collapse,
    Navbar,
   NavbarToggler,
    Nav,
    NavItem
  } from 'reactstrap';

const HomePage = () => {
          //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <Container className = "p-0" fluid={true} >
      <Navbar style={{backgroundColor:"none"}}   light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
            <Link style={{color:"white", fontSize: "2rem"}} className = "nav-link"   to = "/login">Login</Link>
            </NavItem>
            <NavItem>
            <Link style={{color:"white", fontSize: "2rem"}} className = "nav-link" to = "/signup">Sign-up</Link>
            </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        </Container>
        </div>
    )
}

export default HomePage;