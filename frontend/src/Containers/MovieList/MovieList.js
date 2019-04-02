import React, {Fragment, Component} from 'react'
import MovieCard from "../../Components/MovieCard/MovieCard";
import {loadMovies} from "../../store/actions/movie_list";
import {connect} from "react-redux";
import axios, {MOVIES_URL} from "../../api-urls"


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
class MovieList extends Component {
    componentDidMount() {
        this.props.loadMovies();
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
                {this.props.movies.map(movie => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={movie.id}>
                        <MovieCard movie={movie} onDelete={() => this.movieDeleted(movie.id)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

const mapStateToProps = (state) => state.movieList;
const mapDispatchToProps = (dispatch) => ({
    loadMovies: () => dispatch(loadMovies())
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieList);