import React, {Fragment, Component} from 'react';
import MenuItem from './MenuItem/MenuItem'

class Menu extends Component {
    state = {
        collapse: true
    };

    render() {
        return <Fragment>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <MenuItem to="/">Фильмы</MenuItem>
                    <MenuItem to="/movies/add">Добавить фильм</MenuItem>
                    <MenuItem to="/halls/">Залы</MenuItem>
                    <MenuItem to="/halls/add">Добавить залл</MenuItem>
                    {localStorage.getItem('auth-token') ? <MenuItem to="/logout">Выйти</MenuItem> : <MenuItem to="/login">Войти</MenuItem>}
                </ul>
            </div>
        </Fragment>
    }
}

export default Menu;