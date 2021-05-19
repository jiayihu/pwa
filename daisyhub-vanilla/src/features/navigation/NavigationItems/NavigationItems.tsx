import './NavigationItems.scss';
import { useState } from 'react';
import { Navbar, Nav, NavLink, NavItem, Collapse, NavbarToggler } from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';

export const NavigationItems = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Navbar light expand="md" className="py-2">
      <Link to="/" className="navbar-brand">
        Daisyhub
      </Link>
      <Collapse isOpen={isOpen} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink exact to="/" activeClassName="active" tag={RRNavLink}>
              Islands
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact to="/host" activeClassName="active" tag={RRNavLink}>
              Host
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact to="/join" activeClassName="active" tag={RRNavLink}>
              Join
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      <NavbarToggler className="navigation__toggler" onClick={handleToggle}>
        <span className="navigation__toggler-icon"></span>
        <span className="navigation__toggler-icon"></span>
        <span className="navigation__toggler-icon"></span>
      </NavbarToggler>
    </Navbar>
  );
};
