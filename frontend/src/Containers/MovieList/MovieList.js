import React, {Fragment, Component} from 'react'
import MovieCard from "../../Components/MovieCard/MovieCard";
import {loadMovies} from "../../store/actions/movie_list";
import {DELETE_SUCCESS, deleteMovieHall} from "../../store/actions/delete";
import {connect} from "react-redux";
import {MOVIES_URL} from "../../api-urls"


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
class MovieList extends Component {
    componentDidMount() {
        this.props.loadMovies();
    }



    movieDeleted = (movieId) => {
        console.log(this.props.auth.is_admin);
        if(this.props.auth.is_admin) {
            this.props.deleteMovieHall(MOVIES_URL, movieId).then(result => {
                if(result.type === DELETE_SUCCESS) {
                    this.props.loadMovies()
                }
            })
        } else {
            this.props.history.push({
                pathname: "/login",
                state: {next: this.props.location}
            })
        }
    };

    render() {
        console.log(this.props.movieList);
        return <Fragment>
            <div className='row'>
                {this.props.movieList.movies.map(movie => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={movie.id}>
                        <MovieCard movie={movie} onDelete={() => this.movieDeleted(movie.id)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

const mapStateToProps = (state) => ({
    movieList: state.movieList,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    loadMovies: () => dispatch(loadMovies()),
    deleteMovieHall: (URL, id) => dispatch(deleteMovieHall(URL, id))
});


export default connect(mapStateToProps, mapDispatchToProps)(MovieList);