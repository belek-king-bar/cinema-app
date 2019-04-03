import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import MovieCategories from "../../Components/MovieCategories/MovieCategories";
import ShowSchedule from "../../Components/ShowSchedule/ShowSchedule";
import {loadMovie} from "../../store/actions/movie_edit";
import {loadMovieShow} from "../../store/actions/show_load";
import {connect} from "react-redux";

// компонент, который выводит одну карточку с фильмом
// фильм также загружается при выводе компонента на экран (mount),
// а не при обновлении (didUpdate), т.к. компонент выводится на отдельной странице,
// и при переключении страниц исчезает с экрана, а потом снова маунтится.
class MovieDetail extends Component {
    componentDidMount() {
        this.props.loadMovie(this.props.match.params.id);
        this.props.loadMovieShow(this.props.match.params.id)
    }

    render() {
        // если movie в state нет, ничего не рисуем.
        if (!this.props.movieDetail.movie) return null;

        const {name, poster, description, release_date, finish_date, categories, id} = this.props.movieDetail.movie;
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

            {this.props.movieDetail.show ? <ShowSchedule shows={this.props.movieDetail.show} c_type={'hall'}/> : null}

        </div>;
    }
}

const mapStateToProps = state => {
    return {
        movieDetail: state.movieDetail,
        auth: state.auth  // auth нужен, чтобы получить из него токен для запроса
    }
};
const mapDispatchProps = dispatch => {
    return {
        loadMovie: (id) => dispatch(loadMovie(id)),  // прокидываем id в экшен-крейтор loadMovie.
        loadMovieShow: (movieId) => dispatch(loadMovieShow(movieId))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(MovieDetail);