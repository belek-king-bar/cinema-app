import React, {Fragment, Component} from 'react';
import MenuItem from './MenuItem/MenuItem'
import {NavLink} from 'react-router-dom'

class Menu extends Component {
    state = {
        collapse: true
    };

    toggle = () => {
        this.setState({collapse: !this.state.collapse});
    };

    render() {
        const username = localStorage.getItem('username');
        // является строкой, поэтому сравниваем с "true"
        const isAdmin = localStorage.getItem('is_admin');
        return <Fragment>
            <button  onClick={this.toggle} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={(this.state.collapse ? "collapse" : "") + " navbar-collapse"}
                 id="navbarNav">
                <ul className="navbar-nav">
                    <MenuItem to="/">Фильмы</MenuItem>
                    {isAdmin === "true" ? <MenuItem to="/movies/add">Добавить фильм</MenuItem> : null}
                    <MenuItem to="/halls/">Залы</MenuItem>
                    {isAdmin === "true" ? <MenuItem to="/halls/add">Добавить залл</MenuItem> : null}
                </ul>
                <ul className="navbar-nav ml-auto">
                    {username ? [
                        <li className="nav-item" key="username"><span className="navbar-text">Привет, <NavLink to={"/users/" + localStorage.getItem('id')}>{username}</NavLink>!</span></li>,
                        <MenuItem to="/logout" key="logout">Выйти</MenuItem>
                    ] : [
                        <MenuItem to="/login" key="login">Войти</MenuItem>,
                        <MenuItem to="/register" key="register">Зарегистрироваться</MenuItem>
                    ]}
                </ul>
            </div>
        </Fragment>
    }
}

export default Menu;