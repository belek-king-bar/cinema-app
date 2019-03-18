import React, {Component} from 'react';
import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";

const Navbar = () => (

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
                <Logo/>
                <Menu/>
            </nav>
    );

export default Navbar;