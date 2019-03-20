import React, {Component} from 'react'
import {HALLS_URL} from "../../api-urls";
import axios from 'axios';
import {Container} from 'reactstrap';


class HallEdit extends Component {
    state = {
        hall: [],
        alert: null,
        submitDisabled: false
    };


    componentDidMount() {
        const match = this.props.match;

        axios.get(HALLS_URL + match.params.id, {headers: {
                Authorization: "Token " + localStorage.getItem('auth-token')
            }})
            .then(response => {
                console.log(response.data);
                return response.data;
            })
            .then(hall => this.setState({hall}))
            .catch(error => console.log(error));
    }


    updateHallState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let hall = {...prevState.hall};
            hall[fieldName] = value;
            newState.hall = hall;
            console.log(hall);
            return newState;
        });
    };

    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateHallState(fieldName, value);
    };


    formSubmitted = (event) => {
        event.preventDefault();

        this.setState(prevState => {
            let newState = {...prevState};
            newState.submitDisabled = true;
            return newState;
        });

        console.log(this.state.hall);
        axios.put(HALLS_URL + this.state.hall.id + '/', this.state.hall, {headers: {
                Authorization: "Token " + localStorage.getItem('auth-token')
            }})
            .then(response => {
                console.log(response.data);
                if (response.status === 200) return response.data;
            })
            .then(hall => this.props.history.replace('/halls/' + hall.id))
            .catch(error => {
                console.log(error);
                this.setState(prevState => {
                    let newState = {...prevState};
                    newState.alert = {type: 'danger', message: `Hall was not added!`};
                    newState.submitDisabled = false;
                    return newState;
                });
            });
    };


    render() {
        if (!this.state.hall) return null;

        return <Container className="mt-3">
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="name" value={this.state.hall.name} onChange={this.inputChanged}/>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить</button>
            </form>
        </Container>
    }
}


export default HallEdit;