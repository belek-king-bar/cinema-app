import React, {Fragment, Component} from 'react';
import {MOVIES_URL} from "../../api-urls";
import MovieCard from "../../Components/MovieCard/MovieCard";
import {NavLink} from "react-router-dom";
import axios from 'axios';


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
class MovieList extends Component {
    state = {
        movies: [],
    };

    componentDidMount() {
        axios.get(MOVIES_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(movies => this.setState({movies}))
            .catch(error => console.log(error));
    }

    movieDeleted = (movieId) => {
        if(localStorage.getItem('auth-token')) {
            axios.delete(MOVIES_URL + movieId + '/', {
                headers: {
                    Authorization: "Token " + localStorage.getItem('auth-token')
                }
            }).then(response => {
                console.log(response.data);
                this.setState(prevState => {
                    let newState = {...prevState};
                    let movies = [...newState.movies];
                    let movieIndex = movies.findIndex(movie => movie.id === movieId);
                    movies.splice(movieIndex, 1);
                    newState.movies = movies;
                    return newState;
                })
            }).catch(error => {
                console.log(error);
                console.log(error.response);
            });
        } else {
            this.props.history.push({
                pathname: "/login",
                state: {next: this.props.location}
            })
        }
    };

    render() {
        return <Fragment>
            <div className='row'>
                {this.state.movies.map(movie => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={movie.id}>
                        <MovieCard movie={movie} onDelete={() => this.movieDeleted(movie.id)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default MovieList;