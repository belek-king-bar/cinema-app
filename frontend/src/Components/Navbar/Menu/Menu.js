import React, {Fragment, Component} from 'react';
import MenuItem from './MenuItem/MenuItem'

class Menu extends Component {
    state = {
        collapse: true
    };

    toggle = () => {
        this.setState({collapse: !this.state.collapse});
    };

    render() {
        return <Fragment>
            <button  onClick={this.toggle} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={(this.state.collapse ? "collapse" : "") + " navbar-collapse"}
                 id="navbarNav">
                <ul className="navbar-nav">
                    <MenuItem to="/">Фильмы</MenuItem>
                    <MenuItem to="/movies/add">Добавить фильм</MenuItem>
                    <MenuItem to="/halls/">Залы</MenuItem>
                    <MenuItem to="/halls/add">Добавить залл</MenuItem>
                    {localStorage.getItem('auth-token') ? <MenuItem to="/logout">Выйти</MenuItem> :
                        [
                            <MenuItem to="/login" key="login">Войти</MenuItem>,
                            <MenuItem to="/register" key="register">Зарегистрироваться</MenuItem>
                        ]}
                </ul>
            </div>
        </Fragment>
    }
}

export default Menu;