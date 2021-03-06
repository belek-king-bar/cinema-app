import React, {Component, Fragment} from 'react';
import MovieForm from "../../Components/MovieForm/MovieForm";
import {MOVIE_ADD_SUCCESS, saveMovie} from "../../store/actions/movie_add";
import {connect} from "react-redux";


class MovieAdd extends Component {

    // обработчик отправки формы
    formSubmitted = (movie) => {
        const {auth} = this.props;
        return this.props.saveMovie(movie, auth.token).then(result => {
            if(result.type === MOVIE_ADD_SUCCESS) {
                this.props.history.push('/movies/' + result.movie.id);
            }
        });
    };

    render() {
        const {errors} = this.props.movieAdd;
        return <Fragment>
            <MovieForm onSubmit={this.formSubmitted} errors={errors}/>
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        movieAdd: state.movieAdd,
        auth: state.auth  // auth нужен, чтобы получить из него токен для запроса
    }
};
const mapDispatchProps = dispatch => {
    return {
        saveMovie: (movie, token) => dispatch(saveMovie(movie, token))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(MovieAdd);