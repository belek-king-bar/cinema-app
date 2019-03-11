import React, {Component} from 'react';
import {CATEGORIES_URL, MOVIES_URL} from "../../api-urls";

// из библиотеки react-datepicker
// стили для дэйтпикера подключены в index.js! без них он не работает!
import DatePicker from "react-datepicker";
// из библиотеки react-select
import Select from 'react-select';

import axios from 'axios';


class MovieAdd extends Component {
    state = {
        // фильм, который мы редактируем
        movie: {
            name: "",
            description: "",
            release_date: "",
            finish_date: "",
            categories: []
        },

        // доступные категории
        categories: [],

        // сообщение об ошибке
        alert: null,

        // индикатор отключения кнопки submit, если запрос выполняется
        submitDisabled: false
    };


    componentDidMount() {
        // загружаем категории
        axios.get(CATEGORIES_URL)
            .then(response => {console.log(response.data); return response.data})
            // и сохраняем их в state
            .then(categories => this.setState(prevState => {
                let newState = {...prevState};
                newState.categories = categories;
                return newState;
            }))
            .catch(error => console.log(error));
    }

    // функция, обновляющая поля в this.state.movie
    updateMovieState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let movie = {...prevState.movie};
            movie[fieldName] = value;
            newState.movie = movie;
            return newState;
        });
    };

    // обработчик ввода в поля ввода
    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateMovieState(fieldName, value);
    };

    // обработчик изменения дат
    dateChanged = (field, date) => {
        this.updateMovieState(field, date.toISOString().slice(0, 10));
    };

    // обработчик изменения select
    selectChanged = (field, values) => {
        const category_ids = values.map(item => item.value);
        this.updateMovieState(field, category_ids);
    };

    // обработчик отправки формы
    formSubmitted = (event) => {
        event.preventDefault();

        // блокировка отправки формы на время выполнения запроса
        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });

        // отправка запроса
        axios.post(MOVIES_URL, this.state.movie)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) return response.data;
                throw new Error('Movie was not created');
            })
            // если всё успешно, переходим на просмотр страницы фильма с id,
            // указанным в ответе
            .then(movie => this.props.history.replace('/movies/' + movie.id))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Movie was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };

    render() {
        // распаковка данных фильма, чтобы было удобнее к ним обращаться
        const {name, description, release_date, finish_date} = this.state.movie;

        // создание разметки для алерта, если он есть
        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

        // форматирование дат для DatePicker'ов
        const release_date_selected = release_date ? new Date(release_date) : null;
        const finish_date_selected = finish_date ? new Date(finish_date) : null;

        // сборка опций для селекта с категориями.
        const select_options = this.state.categories.map(category => {
            return {value: category.id, label: category.name}
        });

        return <div>
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label>Описание</label>
                    <input type="text" className="form-control" name="description" value={description}
                           onChange={this.inputChanged}/>
                </div>
                <div className="form-group">
                    <label className="font-weight-bold">Дата выхода</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd" selected={release_date_selected} className="form-control"
                                    name="release_date" onChange={(date) => this.dateChanged('release_date', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Дата завершения проката</label>
                    <div>
                        <DatePicker dateFormat="yyyy-MM-dd" selected={finish_date_selected} className="form-control"
                                    name="finish_date" onChange={(date) => this.dateChanged('finish_date', date)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Категории</label>
                    <Select options={select_options} isMulti={true} name='categories'
                            onChange={(values) => this.selectChanged('categories', values)}/>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    }
}


export default MovieAdd;