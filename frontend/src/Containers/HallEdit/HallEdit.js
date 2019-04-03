import React, {Component, Fragment} from 'react'
import HallForm from "../../Components/HallForm/HallForm"
import {loadHall, HALL_EDIT_SUCCESS, saveHall} from "../../store/actions/hall_edit";
import {connect} from "react-redux";


class HallEdit extends Component {
    componentDidMount() {
        this.props.loadHall(this.props.match.params.id);
    }


    formSubmitted = (hall) => {
        const {auth} = this.props;
        return this.props.saveHall(hall, auth.token).then(result => {
            if(result.type === HALL_EDIT_SUCCESS) {
                this.props.history.push('/halls/' + result.hall.id);
            }
        });
    };

    render() {
        const {hall, errors} = this.props.hallEdit;
        return <Fragment>
            {/* алёрт здесь больше не выводится, вместо него вывод ошибок внутри формы */}
            {hall ? <HallForm onSubmit={this.formSubmitted} hall={hall} errors={errors}/> : null}
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        hallEdit: state.hallEdit,
        auth: state.auth  // auth нужен, чтобы получить из него токен для запроса
    }
};
const mapDispatchProps = dispatch => {
    return {
        loadHall: (id) => dispatch(loadHall(id)),  // прокидываем id в экшен-крейтор loadMovie.
        saveHall: (hall, token) => dispatch(saveHall(hall, token))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(HallEdit);