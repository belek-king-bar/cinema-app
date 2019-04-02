import React, {Component} from 'react'
import {MOVIES_URL, SHOWS_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import MovieCategories from "../../Components/MovieCategories/MovieCategories";
import axios from 'axios';
import moment from 'moment';
import ShowSchedule from "../../Components/ShowSchedule/ShowSchedule";
import connect from "react-redux/es/connect/connect";

// компонент, который выводит одну карточку с фильмом
// фильм также загружается при выводе компонента на экран (mount),
// а не при обновлении (didUpdate), т.к. компонент выводится на отдельной странице,
// и при переключении страниц исчезает с экрана, а потом снова маунтится.
class MovieDetail extends Component {
    state = {
        movie: null,
        shows: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(MOVIES_URL + match.params.id)
            .then(response => {console.log(response.data); return response.data;})
            .then(movie => {
                this.setState({movie});

                this.loadShows(movie.id);
            })
            .catch(error => console.log(error));
    }

    loadShows = (movieId) => {
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
        const query = encodeURI(`movie_id=${movieId}&starts_after=${startsAfter}&starts_before=${startsBefore}`);
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
        if (!this.state.movie) return null;

        // достаём данные из movie
        const {name, poster, description, release_date, finish_date, categories, id} = this.state.movie;
        const {is_admin} = this.props.auth;

        return <div className="mb-4">
            {/* постер, если есть */}
            {poster ? <div className='text-center'>
                <img className="img-fluid rounded" src={poster}/>
            </div> : null}

            {/* название фильма */}
            <h1>{name}</h1>

            {/* категории, если указаны */}
            {categories.length > 0 ? <MovieCategories categories={categories}/> : null}

            {/* даты проката c: по: (если указано)*/}
            <p className="text-secondary">В прокате c: {release_date} до: {finish_date ? finish_date : "Неизвестно"}</p>
            {description ? <p>{description}</p> : null}

            {is_admin ? <NavLink to={'/movies/' + id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>
                : null}

            {/* назад */}
            <NavLink to='' className="btn btn-primary">Movies</NavLink>

            {this.state.shows ? <ShowSchedule shows={this.state.shows} c_type={'hall'}/> : null}

        </div>;
    }
}

const mapStateToProps = state => ({auth: state.auth});
// никаких дополнительных действий здесь не нужно
const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);