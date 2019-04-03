import React, {Fragment, Component} from 'react';
import HallCard from "../../Components/HallCard/HallCard.js";
import {loadHalls} from "../../store/actions/hall_list";
import {connect} from "react-redux";
import axios, {HALLS_URL} from "../../api-urls"



// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
class HallList extends Component {
    componentDidMount() {
        this.props.loadHalls();
    }

    hallDeleted = (hallId) => {
        if(localStorage.getItem('auth-token')) {
            axios.delete(HALLS_URL + hallId + '/', {
                headers: {
                    Authorization: "Token " + localStorage.getItem('auth-token')
                }
            }).then(response => {
                console.log(response.data);
                this.setState(prevState => {
                    let newState = {...prevState};
                    let halls = [...newState.halls];
                    let hallIndex = halls.findIndex(hall => hall.id === hallId);
                    halls.splice(hallIndex, 1);
                    newState.halls = halls;
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
                {this.props.halls.map(hall => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={hall.id}>
                        <HallCard hall={hall} onDelete={() => this.hallDeleted(hall.id)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}

const mapStateToProps = (state) => state.hallList;
const mapDispatchToProps = (dispatch) => ({
    loadHalls: () => dispatch(loadHalls())
});


export default connect(mapStateToProps, mapDispatchToProps)(HallList);