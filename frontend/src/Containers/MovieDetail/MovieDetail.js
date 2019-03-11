import React, {Component} from 'react'
import {MOVIES_URL} from "../../api-urls";
import {NavLink} from "react-router-dom";
import MovieCategories from "../../Components/MovieCategories/MovieCategories";
import axios from 'axios';


// компонент, который выводит одну карточку с фильмом
// фильм также загружается при выводе компонента на экран (mount),
// а не при обновлении (didUpdate), т.к. компонент выводится на отдельной странице,
// и при переключении страниц исчезает с экрана, а потом снова маунтится.
class MovieDetail extends Component {
    state = {
        movie: null
    };

    componentDidMount() {
        // match - атрибут, передаваемый роутером, содержащий путь к этому компоненту
        const match = this.props.match;

        // match.params - переменные из пути (:id)
        // match.params.id - значение переменной, обозначенной :id в свойстве path Route-а.
        axios.get(MOVIES_URL + match.params.id)
            .then(response => {console.log(response.data); return response.data;})
            .then(movie => this.setState({movie}))
            .catch(error => console.log(error));
    }

    render() {
        // если movie в state нет, ничего не рисуем.
        if (!this.state.movie) return null;

        // достаём данные из movie
        const {name, poster, description, release_date, finish_date, categories} = this.state.movie;
        console.log(categories);

        return <div>
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

            {/* назад */}
            <NavLink to='' className="btn btn-primary">Movies</NavLink>
        </div>;
    }
}


export default MovieDetail;