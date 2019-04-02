import React, {Component, Fragment} from 'react'
import {register_activate, REGISTER_ACTIVATE_SUCCESS} from '../../../store/actions/register_activate'
import {connect} from "react-redux";

class RegisterActivate extends Component {
    state = {

    };

    redirect = () => {
        const {location, history} = this.props;
        if (location.state) {
            history.replace('/');
        } else {
            history.goBack();
        }
    };

    componentDidMount() {
        // Чтобы достать токен из строки запроса, нужно её распарсить в объект URLSearchParams.
        const urlParams = new URLSearchParams(this.props.location.search);
        // Запрос делается только если токен есть.
        if (urlParams.has('token')) {
            const data = {token: urlParams.get('token')};
            this.props.register_activate(data).then((result) => {
                if (result.type === REGISTER_ACTIVATE_SUCCESS) this.redirect();
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
                {this.state.error ? <Fragment>
                    <p>Во время активации произошла ошибка:</p>
                    <p className="text-danger">{this.state.error}</p>
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

const mapStateToProps = state => state.register_activate;

const mapDispatchToProps = dispatch => ({
    register_activate: (data) => dispatch(register_activate(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(RegisterActivate);