import React, {Component, Fragment} from 'react';
import {REGISTER_URL} from "../../api-urls";
import axios from 'axios';


class Register extends Component {
    state = {
        user: {
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            passwordConfirm: "",
            email: "",

        },
        errors: {}
    };

    // Этот код все равно нужен,
    // т.к. совпадение паролей требуется проверять и перед отправкой запроса
    // иначе даже при наличии ошибки "Пароли не совпадают", форма все равно может быть отправлена
    passwordsMatch = () => {
        const {password, passwordConfirm} = this.state.user;
        return password === passwordConfirm
    };

    formSubmitted = (event) => {
        event.preventDefault();
        if (this.passwordsMatch()) {
            const {passwordConfirm, ...restData} = this.state.user;
            return axios.post(REGISTER_URL, restData).then(response => {
                console.log(response);
                // теперь вместо автовхода следует перекинуть пользователя на страницу активации
                this.props.history.replace('/register/activate');
            }).catch(error => {
                console.log(error);
                console.log(error.response.data);
                this.setState({
                    ...this.state,
                    errors: error.response.data
                })
            });
        }
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    };

    passwordConfirmChange = (event) => {
        this.inputChanged(event);
        const password = this.state.user.password;
        const passwordConfirm = event.target.value;
        const errors = (password === passwordConfirm) ? [] : ['Пароли не совпадают'];
        this.setState({
            errors: {
                ...this.state.errors,
                passwordConfirm: errors
            }
        });
    };

    showErrors = (name) => {
        if(this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {first_name, last_name, username, password, passwordConfirm, email} = this.state.user;
        return <Fragment>
            <h2 className="mb-3">Регистрация</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="col-sm-3 my-1 mb-2">
                    <label className="sr-only">Имя</label>
                    <input type="text" className="form-control" name="first_name" value={first_name}
                           onChange={this.inputChanged} placeholder="Имя"/>
                    {this.showErrors('first_name')}
                </div>
                <div className="col-sm-3 my-1 mb-2">
                    <label className="sr-only">Фамилия</label>
                    <input type="text" className="form-control" name="last_name" value={last_name}
                           onChange={this.inputChanged} placeholder="Фамилия"/>
                    {this.showErrors('last_name')}
                </div>
                <div className="col-sm-3 my-1 mb-2">
                    <label className="sr-only">Имя пользователя</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged} placeholder="Имя пользователя"/>
                    {this.showErrors('username')}
                </div>
                <div className="col-sm-3 my-1 mb-2">
                    <label className="sr-only">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged} placeholder="Пароль"/>
                    {this.showErrors('password')}
                </div>
                <div className="col-sm-3 my-1 mb-2">
                    <label className="sr-only">Подтверждение пароля</label>
                    <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm}
                           onPaste={event => event.preventDefault()}
                           onChange={this.passwordConfirmChange} placeholder="Подтверждение пароля"/>
                    {this.showErrors('passwordConfirm')}
                </div>
                <div className="col-sm-3 my-1 mb-2">
                    <label className="sr-only">E-mail</label>
                    <input type="email" className="form-control" name="email" value={email}
                           onChange={this.inputChanged} placeholder="E-mail"/>
                    {this.showErrors('email')}
                </div>
                <div className="col-auto my-1">
                    <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
                </div>
            </form>
        </Fragment>
    }
}


export default Register;