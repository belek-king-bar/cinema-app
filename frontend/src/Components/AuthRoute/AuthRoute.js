import React from 'react'
import {Redirect, Route} from 'react-router'

// для передачи данных из state в AuthRoute его нужно завернуть в коннектор.
import {connect} from "react-redux";


const AuthRoute = (props) => {
    if(props.auth.id) {
        return <Route {...props} />
    } else {
        return <Redirect to={{
            pathname: "/login",
            state: {next: props.location}
        }}/>
    }
};


// вытаскиваем данные об аутентификации из state
const mapStateToProps = state => ({auth: state.auth});
// никаких дополнительных действий здесь не нужно
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);