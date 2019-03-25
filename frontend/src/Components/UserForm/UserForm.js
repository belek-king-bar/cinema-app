import React, {Fragment, Component} from 'react'


class UserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            errors: {}

        };

    }


    inputChanged = (event) => {
        const value = event.target.value;
        const fieldName = event.target.name;
        this.updateUserState(fieldName, value);
    };


    updateUserState = (fieldName, value) => {
        this.setState(prevState => {
            let newState = {...prevState};
            let user = {...prevState.user};
            user[fieldName] = value;
            newState.user = user;
            return newState;
        })
    };

    submitForm = (event) => {
        event.preventDefault();
        if (this.state.user.password && this.state.user.passwordConfirm) {
            this.props.onSubmit(this.state.user);
            console.log(this.state.user)
        } else {
            delete this.state.user.password;
            delete this.state.user.passwordConfirm;
            this.props.onSubmit(this.state.user);
            console.log(this.state.user)
        }

    };

    passwordConfirmChange = (event, compareWith) => {
        this.inputChanged(event);
        const password = event.target.value;
        const errors = (compareWith === password) ? [] : ['Password do not match'];
        this.setState({
            errors: {
                ...this.state.errors,
                passwordConfirm: errors
            }
        })

    };

    showErrors = (name) => {
        if (this.state.errors && this.state.errors[name]) {
            return this.state.errors[name].map((error, index) => <p className="text-danger" key={index}>{error}</p>);
        }
        return null;
    };


    render() {
        if (this.state.user) {
            const {email, first_name, last_name, password, passwordConfirm} = this.state.user;
            const {alert} = this.props;
            return <Fragment>
                <form onSubmit={this.submitForm}>
                    <div className="form-row mt-3">
                        <label className="font-weight-bold col-sm-2 m-auto">Имя:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="first_name" value={first_name}
                                   onChange={this.inputChanged}/>
                            {this.showErrors('first_name')}
                        </div>
                    </div>
                    <div className="form-row mt-3">
                        <label className="font-weight-bold col-sm-2 m-auto">Фамилия:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="text" name="last_name" value={last_name}
                                   onChange={this.inputChanged}/>
                            {this.showErrors('last_name')}
                        </div>
                    </div>
                    <div className="form-row mt-3">
                        <label className="font-weight-bold col-sm-2 m-auto">E-mail:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="email" name="email" value={email}
                                   onChange={this.inputChanged}/>
                            {this.showErrors('email')}
                        </div>
                    </div>
                    <div className="form-row mt-3">
                        <label className="font-weight-bold col-sm-2 m-auto">Изменить пароль:</label>
                        <div className="col-sm-10">
                            <input className="form-control" type="password" name="password" value={password}
                                   onChange={(event) => this.passwordConfirmChange(event, passwordConfirm)}/>
                            {this.showErrors('password')}
                        </div>
                    </div>
                    <div className="form-row mt-3">
                        <label className="font-weight-bold col-sm-2 m-auto">Подтвердить пароль:</label>

                    <div className="col-sm-10">
                            <input className="form-control" type="password" name="passwordConfirm"
                                   value={passwordConfirm}
                                   onChange={(event) => this.passwordConfirmChange(event, password)}/>
                            {this.showErrors('passwordConfirm')}
                        </div>
                    </div>
                    {alert ? <p className="text-success text-center mt-3">{alert}</p> : null}
                    <div className="text-center">
                        <button className="btn btn-primary w-25 m-3" type="submit">Сохранить</button>
                    </div>
                </form>
            </Fragment>

        }

    }

}

export default UserForm;