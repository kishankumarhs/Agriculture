import React from 'react';
import "./Navbar.css"
import {
    Navbar,
    Nav,
} from "react-bootstrap";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../assets/logo-white.png";
import PersonIcon from '@mui/icons-material/Person';
function Menu() {
    return (
        <div className='menu'>
            <Navbar className="menu__container">
                <Navbar.Brand className="menu__logo" href="/">
                    <img src={logo} alt="Logo" className="logo" />
                </Navbar.Brand>
                <div className="menu__thinline">
                    <input type="text" placeholder="search" className="menu__search" id="fullWidth" />
                </div>
                <Nav className="me-auto menu__items">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="contact">Contact</Nav.Link>
                    <Nav.Link href="register">Whislist</Nav.Link>
                    <Nav.Link href="cart"><LocalMallIcon /></Nav.Link>
                    <Nav.Link href="#"><SearchIcon /></Nav.Link>
                    <Nav.Link href="profile"><PersonIcon /></Nav.Link>

                </Nav>

            </Navbar>
        </div>);
}

export default Menu;
