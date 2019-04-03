import React, {Component, Fragment} from 'react';
import HallForm from "../../Components/HallForm/HallForm";
import {HALL_ADD_SUCCESS, saveHall} from "../../store/actions/hall_add";
import {connect} from "react-redux";


class HallAdd extends Component {

    // обработчик отправки формы
    formSubmitted = (hall) => {
        const {auth} = this.props;
        return this.props.saveHall(hall, auth.token).then(result => {
            if(result.type === HALL_ADD_SUCCESS) {
                this.props.history.push('/halls/' + result.hall.id);
            }
        });
    };

    render() {
        const {errors} = this.props.hallAdd;
        return <Fragment>
            <HallForm onSubmit={this.formSubmitted} errors={errors}/>
        </Fragment>
    }
}

const mapStateToProps = state => {
    return {
        hallAdd: state.hallAdd,
        auth: state.auth  // auth нужен, чтобы получить из него токен для запроса
    }
};
const mapDispatchProps = dispatch => {
    return {
        saveHall: (hall, token) => dispatch(saveHall(hall, token))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(HallAdd);