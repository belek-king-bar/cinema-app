import React, {Component, Fragment} from 'react'
import {activateUser} from '../../../store/actions/register'
import {connect} from "react-redux";
import {LOGIN_SUCCESS} from "../../../store/actions/login";

class RegisterActivate extends Component {

    componentDidMount() {
        // Чтобы достать токен из строки запроса, нужно её распарсить в объект URLSearchParams.
        const urlParams = new URLSearchParams(this.props.location.search);
        // Запрос делается только если токен есть.
        if (urlParams.has('token')) {
            const token = urlParams.get('token');
            this.props.activateUser(token).then((result) => {
                if (result.type === LOGIN_SUCCESS) {
                    this.props.history.replace('/')
                }
            });
        }
    }

    render() {
        const urlParams = new URLSearchParams(this.props.location.search);
        return <Fragment>
            <h2 className="mt-3">Активация пользователя</h2>
            {/* Если токен есть, просим подождать, пока выполняется запрос */}
            {urlParams.has('token') ? <Fragment>
                {/* если есть ошибка, выводим её */}
                {this.props.error ? <Fragment>
                    <p>Во время активации произошла ошибка:</p>
                    <p className="text-danger">{this.props.error}</p>
                    <p>Попробуйте позже или обратитесь к администратору сайта.</p>
                </Fragment> : <p>Подтверждается активация, подождите...</p>}
            </Fragment> : <Fragment>
                {/* Если токена нет, просим пользователя проверить свою почту. */}
                <p>На вашу почту, указанную при регистрации, было выслано письмо для подтверждения регистрации.</p>
                <p>Для продолжения перейдите по ссылке активации, указанной в письме.</p>
            </Fragment>}
        </Fragment>
    }
}

const mapStateToProps = state => state.register.activate;

const mapDispatchToProps = dispatch => ({
    activateUser: (token) => dispatch(activateUser(token))
});


export default connect(mapStateToProps, mapDispatchToProps)(RegisterActivate);