import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'

class Layout extends Component {
    render() {
        return <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                </button>
                <div className="collapse navbar-collapse ml-5" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink to="/" className="nav-item nav-link">Главная</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/movies/add" className="nav-item nav-link">Добавить фильм</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/halls/" className="nav-item nav-link">Залы</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/halls/add" className="nav-item nav-link">Добавить зал</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            {this.props.children}
        </div>

    }
}

export default Layout;