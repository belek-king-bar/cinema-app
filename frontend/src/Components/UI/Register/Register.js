import React, {Component, Fragment} from 'react';
import axios from "axios";
import {REGISTER_URL} from "../../../api-urls";

class Register extends Component {
    state = {
        user: {
            'username': '',
            'password': '',
            'passwordConfirm': ''
        },
        errors: {}
    };

    passwordsMatch = () => {
        const {password, passwordConfirm} = this.state.user;
        return password === passwordConfirm
    };

    formSubmitted = (event) => {
        event.preventDefault();
        if (this.passwordsMatch()) {
            const data = {
                username: this.state.user.username,
                password: this.state.user.password
            };
            return axios.post(REGISTER_URL, data).then(response => {
                console.log(response);
                this.props.history.push({
                    pathname: '/login/',
                    state: {next: '/'}
                });
            }).catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({
                    ...this.state,
                    errors: error.response.data
                })
            });
        } else {
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    passwordConfirm: ['Passwords do not match']
                }
            })
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

    showErrors = (name) => {
        if(this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {username, password, passwordConfirm} = this.state.user;
        return <Fragment className="form-row align-items-center">
            <h2 className="mb-3">Регистрация</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="col-sm-3 my-1 mb-2">
                    <label className="font-weight-bold sr-only">Имя пользователя</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged} placeholder="Имя пользователя"/>
                    {this.showErrors('username')}
                </div>
                <div className="col-sm-3 my-1 mb-2">
                    <label className="font-weight-bold sr-only">Пароль</label>
                    <input type="password" className="form-control" name="password" value={password}
                           onChange={this.inputChanged} placeholder="Пароль"/>
                    {this.showErrors('password')}
                </div>
                <div className="col-sm-3 my-1">
                    <label className="font-weight-bold sr-only">Подтверждение пароля</label>
                    <input type="password" className="form-control" name="passwordConfirm" value={passwordConfirm}
                           onChange={this.inputChanged} placeholder="Подтверждение пароля"/>
                    {this.showErrors('passwordConfirm')}
                </div>
                <div className="col-auto my-1">
                    <button type="submit" className="btn btn-primary mt-2">Создать учётную запись</button>
                </div>
            </form>
        </Fragment>
    }
}


export default Register;
