import React, { useEffect } from "react";
import { Navbar, Button, Text, Image, Dropdown, Avatar } from "@nextui-org/react";
import { Link } from "react-router-dom";
import SideNavbar from "components/organisms/Sidebar";
import Appconfig from "config/Appconfig";

function checkAuthentication() {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    // Check if the token is still valid (e.g. not expired)
    // You can use a library like `jwt-decode` to decode the token and check the expiration time
    return true;
  } else {
    return false;
  }
}

const Navigation = ({ show, isAdmin }) => {
  if (!show) return;
  else {
    const isAuthenticated = checkAuthentication();

    if (isAuthenticated) {
      return <SideNavbar isAdmin={isAdmin} />;
    } else {
      return <Default_Navigation />;
    }
  }

  // return <div>{isAuthenticated ? <SideNavbar /> : <Default_Navigation />}</div>;
};

function Default_Navigation() {
  const [isActive, setIsActive] = React.useState(1);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/") {
      setIsActive(1);
    } else if (path === "/services") {
      setIsActive(2);
    } else if (path === "/pracing") {
      setIsActive(3);
    } else if (path === "/about") {
      setIsActive(4);
    }
  }, [isActive]);

  return (
    <Navbar variant="sticky" css={{ backgroundColor: "#fff" }}>
      <Navbar.Brand>
        <Link to="/">
          <Image src={Appconfig.app_logo} alt="Logo" style={{ width: "130px" }} />
        </Link>
      </Navbar.Brand>
      <Navbar.Content enableCursorHighlight activeColor="primary" hideIn="xs" variant="highlight-rounded">
        <Navbar.Link isActive={isActive === 1 ? true : false} href="/">
          Home
        </Navbar.Link>
        <Navbar.Link isActive={isActive === 2 ? true : false} href="/services">
          Services
        </Navbar.Link>
        <Navbar.Link isActive={isActive === 3 ? true : false} href="/pracing" activeColor="primary">
          Pricing
        </Navbar.Link>
        <Navbar.Link isActive={isActive === 4 ? true : false} href="/about">
          About
        </Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Link color="inherit">
          <Link to="/auth/login">Login</Link>
        </Navbar.Link>
        <Navbar.Item>
          <Button auto flat color="primary">
            <Link to="/auth/register">Sign Up</Link>
          </Button>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

export default Navigation;
