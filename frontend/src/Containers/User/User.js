import React, {Component, Fragment} from 'react';
import UserForm from "../../Components/UserForm/UserForm";
import {loadUser} from "../../store/actions/user_detail";
import {connect} from "react-redux"

class UserDetail extends Component {
    state = {
        edit: false,
        alert: null
    };

    componentDidMount() {
        this.props.loadUser(this.props.match.params.id)
    }

    onUserUpdate = (user) => {
        this.setState(prevState => {
            return {
                ...prevState,
                user,
                edit: false,
                alert: {type: 'success', text: 'Данные пользователя успешно обновлены!'}
            };
        });
    };

    toggleEdit = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                edit: !prevState.edit,
                alert: null
            };
        });
    };

    render() {
        // не забываем конвертировать user_id из localStorage в int для сравнения
        // (по умолчанию всё из localStorage считывается, как строка).
        const currentUserId = this.props.auth.id;
        const {username, first_name, last_name, email, id} = this.props.user.user;
        console.log(this.props.user.user.username);
        const alert = this.state.alert;
        return <Fragment>
            {alert ? <div className={"alert mt-3 py-2 alert-" + alert.type} role="alert">{alert.text}</div> : null}
            <h1 className="mt-3">Личный кабинет</h1>
            {username ? <p>Имя пользователя: {username}</p> : null}
            {first_name ? <p>Имя: {first_name}</p> : null}
            {last_name ? <p>Фамиилия: {last_name}</p> : null}
            {email ? <p>Email: {email}</p> : null}

            {/* весь блок формы выходит только если страница принадлежит текущему пользователю */}
            {/* и данные пользователя (откуда берётся id для сравнения) загрузились. */}
            {currentUserId === id ? <Fragment>
                <div className="my-4">
                    <button className="btn btn-primary" type="button" onClick={this.toggleEdit}>Редактировать</button>
                    <div className={this.state.edit ? "mt-4" : "mt-4 collapse"}>
                        <h2>Редактировать</h2>
                        <UserForm user={this.props.user.user} onUpdateSuccess={this.onUserUpdate}/>
                    </div>
                </div>
            </Fragment> : null}
        </Fragment>;
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        auth: state.auth  // auth нужен, чтобы получить из него токен для запроса
    }
};
const mapDispatchProps = dispatch => {
    return {
        loadUser: (id) => dispatch(loadUser(id)),  // прокидываем id в экшен-крейтор loadMovie.
    }
};

export default connect(mapStateToProps, mapDispatchProps)(UserDetail);