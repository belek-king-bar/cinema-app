import React, {Component} from 'react'
import {HALLS_URL, SHOWS_URL} from "../../api-urls";
import axios from 'axios';
import {NavLink} from "react-router-dom";
import moment from 'moment';
import ShowSchedule from "../../Components/ShowSchedule/ShowSchedule";


// компонент, который выводит одну карточку с фильмом
// фильм также загружается при выводе компонента на экран (mount),
// а не при обновлении (didUpdate), т.к. компонент выводится на отдельной странице,
// и при переключении страниц исчезает с экрана, а потом снова маунтится.
class HallDetail extends Component {
    state = {
        hall: null,
        shows: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(HALLS_URL + match.params.id)
            .then(response => {console.log(response.data); return response.data;})
            .then(hall => {
                this.setState({hall});

                this.loadShows(hall.id);
            })
            .catch(error => console.log(error));
    }

    loadShows = (hallId) => {
        // https://momentjs.com/ - библиотека для работы с датой и временем в JS
        // более удобная, чем встроенный класс Date(). Не забудьте импортировать.
        // установка: npm install --save moment (уже ставится вместе с реактом)
        // импорт: import moment from 'moment';

        // вернёт текущую дату со временем в формате ISO с учётом временной зоны
        const startsAfter = moment().format('YYYY-MM-DD HH:mm');
        // вернёт только дату на 3 дня вперёд от текущей в указанном формате
        const startsBefore = moment().add(3, 'days').format('YYYY-MM-DD');

        // encodeURI закодирует строку для передачи в запросе
        // отличается от encodeURIComponent тем, что пропускает символы,
        // входящие в формат URI, в т.ч. & и =.
        const query = encodeURI(`hall_id=${hallId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
        axios.get(`${SHOWS_URL}?${query}`).then(response => {
            console.log(response);
            this.setState(prevState => {
                let newState = {...prevState};
                newState.shows = response.data;
                return newState;
            })
        }).catch(error => {
            console.log(error);
            console.log(error.response);
        });
    };

    render() {
        // если movie в state нет, ничего не рисуем.
        if (!this.state.hall) return null;

        return <div className="text-center">

            {/* название фильма */}
            <h1>{this.state.hall.name}</h1>

            {this.state.hall.seat.map(seat => {
                    return (
                        <p>Ряд: {seat.row} Место: {seat.place}</p>
                    )
                }

            )}

            <NavLink to={'/halls/' + this.state.hall.id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>

            {/* назад */}
            <NavLink to='/halls' className="btn btn-primary">Halls</NavLink>

            {this.state.shows ? <ShowSchedule shows={this.state.shows}/> : null}

        </div>;
    }
}


export default HallDetail;