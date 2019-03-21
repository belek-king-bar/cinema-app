import React, {Fragment, Component} from 'react';
import {HALLS_URL, MOVIES_URL} from "../../api-urls";
import HallCard from "../../Components/HallCard/HallCard.js";
import axios from 'axios';


// компонент для показа списка фильмов клиенту
// фильмы запрашиваются из API в момент показа компонента на странце (mount)
class HallList extends Component {
    state = {
        halls: [],
    };

    componentDidMount() {
        axios.get(HALLS_URL)
            .then(response => {console.log(response.data); return response.data;})
            .then(halls => this.setState({halls}))
            .catch(error => console.log(error));
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
                {this.state.halls.map(hall => {
                    return <div className='col-xs-12 col-sm-6 col-lg-4 mt-3'  key={hall.id}>
                        <HallCard hall={hall} onDelete={() => this.hallDeleted(hall.id)}/>
                    </div>
                })}
            </div>
        </Fragment>
    }
}


export default HallList;