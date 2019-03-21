import React, {Component, Fragment} from 'react';
import {MOVIES_URL} from "../../api-urls";
import axios from 'axios';
import MovieForm from "../../Components/MovieForm/MovieForm";


class MovieAdd extends Component {
    state = {
        // сообщение об ошибке
        errors: {}
    };


    // сборка данных для запроса
    gatherFormData = (movie) => {
        let formData = new FormData();
        Object.keys(movie).forEach(key => {
            const value = movie[key];
            if (value) {
                if(Array.isArray(value)) {
                    // для полей с несколькими значениями (категорий)
                    // нужно добавить каждое значение отдельно
                    value.forEach(item => formData.append(key, item));
                } else {
                    formData.append(key, value);
                }
            }
        });
        return formData;
    };

    // обработчик отправки формы
    formSubmitted = (movie) => {
        // сборка данных для запроса
        const formData = this.gatherFormData(movie);

        // отправка запроса
        return axios.post(MOVIES_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: "Token " + localStorage.getItem('auth-token')
            }})
            .then(response => {
                // при успешном создании response.data содержит данные фильма
                const movie = response.data;
                console.log(movie);
                // если всё успешно, переходим на просмотр страницы фильма с id,
                // указанным в ответе
                this.props.history.replace('/movies/' + movie.id);
            })
            .catch(error => {
                this.setState(prevState => {
                    console.log(error);
                    let newState = {...prevState};
                    newState.errors = error.response.data;
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {
        return <Fragment>
            <MovieForm onSubmit={this.formSubmitted} errors={this.state.errors}/>
        </Fragment>
    }
}


export default MovieAdd;