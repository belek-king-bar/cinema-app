import React, {Component, Fragment} from 'react';
import {LOGIN_URL} from "../../api-urls";
import axios from 'axios';


class Login extends Component {
    state = {
        credentials: {
            username: "",
            password: "",
        },

        errors: {}
    };

    formSubmitted = (event) => {
        event.preventDefault();
        return axios.post(LOGIN_URL, this.state.credentials).then(response => {
            console.log(response);
            localStorage.setItem('auth-token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('email', response.data.email);
            localStorage.setItem('firstname', response.data.firstname);
            localStorage.setItem('lastname', response.data.lastname);
            localStorage.setItem('is_admin', response.data.is_admin);
            localStorage.setItem('is_staff', response.data.is_staff);
            localStorage.setItem('id', response.data.id);
            if(this.props.location.state) {
                this.props.history.replace(this.props.location.state.next);
            } else {
                this.props.history.goBack();
            }
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            this.setState({
                ...this.state,
                errors: error.response.data
            })
        });
    };

    inputChanged = (event) => {
        this.setState({
            ...this.state,
            credentials: {...this.state.credentials, [event.target.name]: event.target.value}
        })
    };


     showErrors = (name) => {
        if(this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };

    render() {
        const {username, password} = this.state.credentials;
        return <Fragment className="form-row align-items-center">
            <h2 className="mb-3">Вход</h2>
            <form onSubmit={this.formSubmitted}>
                {this.showErrors('non_field_errors')}
                <div className="col-sm-3 my-1 mb-2">
                    <label className="sr-only">Имя пользователя</label>
                    <input type="text" className="form-control" name="username" value={username}
                           onChange={this.inputChanged} placeholder="Имя пользователя"/>
                    {this.showErrors('username')}
                </div>
                <div className="col-sm-3 my-1 mb-2">
                    <label className="sr-only">Пароль</label>
                    <input type="password" className="form-control mb-3" name="password" value={password}
                           onChange={this.inputChanged} placeholder="Пароль"/>
                    {this.showErrors('password')}
                </div>
                <div className="col-auto my-1">
                    <button type="submit" className="btn btn-primary">Войти</button>
                </div>
            </form>
        </Fragment>
        }
}


export default Login;
