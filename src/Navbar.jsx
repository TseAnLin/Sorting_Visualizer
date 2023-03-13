import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../img/logo.png";


function NavBar() {
    const [expand, updateExpanded] = useState(false);

    return (
        <Navbar
            expanded={expand}
            expand="md"
            id='mainNav'
        >
            <Container className="px-4 px-lg-5">
                <Navbar.Brand href="/">
                    <img src={logo} className="img-fluid logo" alt="brand" />
                    {/* <Link className="navbar-brand" to="/">XAI</Link> */}
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="navbarResponsive"
                    onClick={() => {
                        updateExpanded(expand ? false : "expanded");
                    }}
                >
                    <div>Menu</div>
                </Navbar.Toggle>

                <Navbar.Collapse id="navbarResponsive">
                    <Nav className="ms-auto py-3 py-lg-0" defaultActiveKey="#home">
                        {/* <Nav.Item>
                            <Nav.Link className=" px-lg-3 py-3 py-lg-4" as={Link} to="/" onClick={() => updateExpanded(false)}>
                                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
                            </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Nav.Link
                                className=" px-lg-3 py-3 py-lg-4"
                                as={Link}
                                to="/SingUp"
                                onClick={() => updateExpanded(false)}
                            >
                                <AiFillBook style={{ marginBottom: "2px" }} /> Sing Up
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                className=" px-lg-3 py-3 py-lg-4"
                                as={Link}
                                to="/Test"
                                onClick={() => updateExpanded(false)}
                            >
                                <AiFillBook style={{ marginBottom: "2px" }} /> testPage
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                className=" px-lg-3 py-3 py-lg-4"
                                as={Link}
                                to="/user"
                                onClick={() => updateExpanded(false)}
                            >
                                <AiFillBook style={{ marginBottom: "2px" }} /> user
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                className=" px-lg-3 py-3 py-lg-4"
                                as={Link}
                                to="/user/table1"
                                onClick={() => updateExpanded(false)}
                            >
                                <AiFillBook style={{ marginBottom: "2px" }} /> usertable1
                            </Nav.Link>
                        </Nav.Item> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;