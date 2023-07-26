import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { GlobalState } from "../../GlobalState";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [isUser] = state.userApi.isUser;
  const[isVisitor] = state.userApi.isVisitor
  const [categories, setCategories] = useState([]);



  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("https://apigigs.onrender.com/admin/show_categories");
      setCategories(res.data.results);
    };
    getCats();
  }, []);

  const logoutUser = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const loggedRouter = () => {
    return (
      <Nav>
        <NavItem>
          <LinkContainer to="/" onClick={logoutUser}>
            <Nav.Link>Logout</Nav.Link>
          </LinkContainer>
        </NavItem>
      </Nav>
    );
  };

  const userRouter = () => {
    return (
      <Nav>
        <NavItem>
          <LinkContainer to="/my_profile">
            <Nav.Link className="nav-link-big">Profile</Nav.Link>
          </LinkContainer>
        </NavItem>

        <NavItem>
          <LinkContainer to="/create_qualification">
            <Nav.Link className="nav-link-big">Make Qualification</Nav.Link>
          </LinkContainer>
        </NavItem>

        <NavItem>
          <LinkContainer to="/post_tutor_service">
            <Nav.Link className="nav-link-big">Make Post</Nav.Link>
          </LinkContainer>
        </NavItem>

        <NavItem>
          <LinkContainer to="/my_services">
            <Nav.Link className="nav-link-big">My Subjects</Nav.Link>
          </LinkContainer>
        </NavItem>
      </Nav>
    );
  };

  const visitorRouter = () => {
    return (
      <Nav>
        
        <NavItem>
          <LinkContainer to="/apply">
            <Nav.Link className="nav-link-big">Submit Report</Nav.Link>
          </LinkContainer>
        </NavItem>

        
      </Nav>
    );
  };


  const figureOut = () => {
    if (isUser) {
      return userRouter();
    } else if(isVisitor) {
      return visitorRouter()
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
        <div className="container-fluid">
          <LinkContainer to="/">
            <Navbar.Brand>Tutor-Finder</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarNavDropdown" />
          <Navbar.Collapse id="navbarNavDropdown">
            <Nav className="ms-auto">
            <LinkContainer to="/" >
                <Nav.Link className="mx-2 nav-link-big">Home</Nav.Link>
              </LinkContainer>

              {figureOut()}

              
              <NavDropdown
                title="Categories"
                id="navbarDropdownMenuLink"
                className="mx-2"
              >
                {categories?.map((category) => (
                  <LinkContainer
                    key={category._id}
                    to={`/items_from_cat/${category._id}`}
                  >
                    <NavDropdown.Item>{category.catName}</NavDropdown.Item>
                  </LinkContainer>
                ))}
              </NavDropdown>

              <LinkContainer to="/about_us">
                <Nav.Link className="mx-2 nav-link-big">About Us</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/contact">
                <Nav.Link className="mx-2 nav-link-big">Contact Us</Nav.Link>
              </LinkContainer>

              {isLogged ? (
                loggedRouter()
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link-big">
                    <i className="fas fa-user"></i> Login ✥ Register
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>

            <Nav className="ms-auto d-none d-lg-inline-flex">
              <Nav.Link
                href="#"
                target="_blank"
                className="mx-2"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </Nav.Link>
              <Nav.Link
                href="#"
                target="_blank"
                className="mx-2"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </Nav.Link>
              <Nav.Link
                href="#"
                target="_blank"
                className="mx-2"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-square"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
}

export default Header;
