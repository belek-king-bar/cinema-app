import React, {Component, Fragment} from 'react';
import {register, REGISTER_SUCCESS} from '../../store/actions/register'
import {connect} from "react-redux";


class Register extends Component {
    state = {
        user: {
            username: "",
            password: "",
            password_confirm: "",
            email: "",
        },
    };

    redirect = () => {
        const {location, history} = this.props;
        if (location.state) {
            history.replace('/register/activate');
        } else {
            history.goBack();
        }
    };

    formSubmitted = (event) => {
        event.preventDefault();
        const {username, password, password_confirm, email} = this.state.user;
        // один из вариантов редиректа - вернуть результат запроса
        // из action-creator'а login(). Результатом будет action, обёрнутый в Promise,
        // поэтому у него можно вызвать метод then, в котором проверить тип action'а,
        // и если вход успешен (тип action'а - LOGIN_SUCCESS),
        // то перенаправить пользователя на другую страницу.
        // смотрите также комментарий к login() в actions/login.js.
        this.props.register(username, password, password_confirm, email).then((result) => {
            if(result.type === REGISTER_SUCCESS) this.redirect();
        });
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        });
    };

    showErrors = (name) => {
        if (this.props.errors && this.props.errors[name]) {
            return this.props.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {username, password, password_confirm, email} = this.state.user;
        return <Fragment>
            <h2>Регистрация</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="form-row">
                    <label className="font-weight-bold">Имя пользователя</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged}/>
                    {this.showErrors('username')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged}/>
                    {this.showErrors('password')}
                </div>
                <div className="form-row">
                    {/* валидация совпадения паролей со стороны UI теперь больше не требуется, */}
                    {/* т.к. она выполняется в API, и можно использовать обычный inputChanged. */}
                    <label className="font-weight-bold">Подтверждение пароля</label>
                    <input type="password" className="form-control" name="password_confirm" value={password_confirm}
                           onPaste={event => event.preventDefault()}
                           onChange={this.inputChanged}/>
                    {this.showErrors('passwordConfirm')}
                </div>
                <div className="form-row">
                    <label className="font-weight-bold">E-mail</label>
                    <input type="email" className="form-control" name="email" value={email}
                           onChange={this.inputChanged}/>
                    {this.showErrors('email')}
                </div>
                <button type="submit" className="btn btn-primary mt-2">Зарегистрироваться</button>
            </form>
        </Fragment>
    }
}

const mapStateToProps = state => state.register;

const mapDispatchToProps = dispatch => ({
    register: (username, password, password_confirm, email) => dispatch(register(username, password, password_confirm,
        email))
});


export default connect(mapStateToProps, mapDispatchToProps)(Register);