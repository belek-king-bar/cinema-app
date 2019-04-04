import React, {Fragment, Component} from 'react';
import HallCard from "../../Components/HallCard/HallCard.js";
import {loadHalls} from "../../store/actions/hall_list";
import {connect} from "react-redux";
import {HALLS_URL} from "../../api-urls"
import {DELETE_SUCCESS, deleteMovieHall} from "../../store/actions/delete";



// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
class HallList extends Component {
    componentDidMount() {
        this.props.loadHalls();
    }

    hallDeleted = (hallId) => {
        console.log(this.props.auth.is_admin);
        if(this.props.auth.is_admin) {
            this.props.deleteMovieHall(HALLS_URL, hallId).then(result => {
                if(result.type === DELETE_SUCCESS) {
                    this.props.loadHalls()
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
        return <Fragment>
            <div className='row'>
                {this.props.hallList.halls.map(hall => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={hall.id}>
                        <HallCard hall={hall} onDelete={() => this.hallDeleted(hall.id)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

const mapStateToProps = (state) => ({
    hallList: state.hallList,
    auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
    loadHalls: () => dispatch(loadHalls()),
    deleteMovieHall: (URL, id) => dispatch(deleteMovieHall(URL, id))
});


export default connect(mapStateToProps, mapDispatchToProps)(HallList);