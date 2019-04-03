import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import ShowSchedule from "../../Components/ShowSchedule/ShowSchedule";
import connect from "react-redux/es/connect/connect";
import {loadHall} from "../../store/actions/hall_edit";
import {loadHallShow} from "../../store/actions/show_load";

// компонент, который выводит одну карточку с фильмом
// фильм также загружается при выводе компонента на экран (mount),
// а не при обновлении (didUpdate), т.к. компонент выводится на отдельной странице,
// и при переключении страниц исчезает с экрана, а потом снова маунтится.
class HallDetail extends Component {
    componentDidMount() {
        this.props.loadHall(this.props.match.params.id);
        this.props.loadHallShow(this.props.match.params.id)
    }

    render() {
        const {is_admin} = this.props.auth;
        // если movie в state нет, ничего не рисуем.
        if (!this.props.hallDetail.hall) return null;

        return <div className="text-center">

            {/* название фильма */}
            <h1>{this.props.hallDetail.hall.name}</h1>

            {this.props.hallDetail.hall.seat.map(seat => {
                    return (
                        <p>Ряд: {seat.row} Место: {seat.place}</p>
                    )
                }

            )}

            {is_admin ? <NavLink to={'/halls/' + this.props.hallDetail.hall.id + '/edit'} className="btn btn-primary mr-2">Edit</NavLink>
                : null}

            {/* назад */}
            <NavLink to='/halls' className="btn btn-primary">Halls</NavLink>

            {this.props.hallDetail.show ? <ShowSchedule shows={this.props.hallDetail.show}/> : null}
            {console.log(this.props.hallDetail.show)}

        </div>;
    }
}

const mapStateToProps = state => {
    return {
        hallDetail: state.hallDetail,
        auth: state.auth  // auth нужен, чтобы получить из него токен для запроса
    }
};
const mapDispatchProps = dispatch => {
    return {
        loadHall: (id) => dispatch(loadHall(id)),  // прокидываем id в экшен-крейтор loadMovie.
        loadHallShow: (hallId) => dispatch(loadHallShow(hallId))
    }
};

export default connect(mapStateToProps, mapDispatchProps)(HallDetail);