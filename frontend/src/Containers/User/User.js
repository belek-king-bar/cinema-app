import React, {Component, Fragment} from 'react'
import axios from "axios";
import {REGISTER_UPDATE_URL} from "../../api-urls";
import UserForm from '../../Components/UserForm/UserForm'


class UserDetail extends Component {

    state = {
        user: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            passwordConfirm: ""
        },

        alert: []
    };

    componentDidMount() {
        let first_name = localStorage.getItem('first_name');
        console.log(first_name);
        let last_name = localStorage.getItem('last_name');
        let email = localStorage.getItem('email');
        this.setState(prevState => {
                let newState = {...prevState};
                newState.user.first_name = first_name;
                newState.user.last_name = last_name;
                newState.user.email = email;
                return newState;
            })
    }


    formSubmitted = (data) => {
        let id = localStorage.getItem('id');
        return axios.patch(REGISTER_UPDATE_URL + id + '/', data, {headers: {
                Authorization: "Token " + localStorage.getItem('auth-token')
            }}).then(response => {
                console.log(response);
                if (response.status === 200) {
                    this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = ["Обновлено"];
                    return newState;
                });
                }
            }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    };


    render() {
        const {first_name, last_name, email} = this.state.user;
        let username = localStorage.getItem('username');
        const {user, alert} = this.state;

        return <Fragment>
            <div className="card text-center mb-3 text-white bg-secondary">
                <div className="card-header">
                    <h1>Имя пользователя : {username}</h1>
                </div>
                <div className="card-body">
                    {first_name ? <p>Имя: {first_name}</p> : null}

                    {last_name ? <p>Фамилия: {last_name}</p> : null}
                </div>
                <div className="card-footer text-white">
                    {email ? <p>Email : {email}</p>: null}
                </div>
            </div>

            <h4 className="text-center">Редактирование пользователя</h4>

            {user ? <UserForm onSubmit={this.formSubmitted} user={user} alert={alert}/>: null}
        </Fragment>;
    }
}

export default UserDetail;