import React, { useState } from 'react';

import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';
import './styles.css';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = props => {
    setOpen(!open);
  };
  return (
    <Navbar className="text-white" color="dark" dark expand="md">
      <div className="container">
        <NavbarBrand className="h1" tag={Link} to="/">
          <img src={logo} className="img-logo" alt="My Series" />
        </NavbarBrand>
        <NavbarToggler onClick={handleToggle} className="mr-2" />
        <Collapse isOpen={open} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/genres">
                Gêneros
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
