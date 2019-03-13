import React, {Component} from 'react';
import {HALLS_URL} from "../../api-urls";
import axios from 'axios';


class HallAdd extends Component {
    state = {
        hall: {
            name: "",
        },

        alert: null,
        submitDisabled: false
    };

    updateHallState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let hall = {...prevState.hall};
            hall[fieldName] = value;
            console.log(value);
            newState.hall= hall;
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


        axios.post(HALLS_URL, this.state.hall)
            .then(response => {
                console.log(response.data);
                if (response.status === 201) return response.data;
                throw new Error('Hall was not created');
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

        let alert = null;
        if (this.state.alert) {
            alert = <div className={"alert alert-" + this.state.alert.type}>{this.state.alert.message}</div>
        }

     return <div className="mt-3">
            {alert}
            <form onSubmit={this.formSubmitted}>
                <div className="form-group">
                    <label className="font-weight-bold">Название</label>
                    <input type="text" className="form-control" name="name" value={this.state.hall.name} onChange={this.inputChanged}/>
                </div>
                <button disabled={this.state.submitDisabled} type="submit"
                        className="btn btn-primary">Сохранить</button>
            </form>
        </div>;
    }
}


export default HallAdd;