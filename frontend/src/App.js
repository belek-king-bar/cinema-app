import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import MovieList from "./Containers/MovieList/MovieList";
import MovieDetail from "./Containers/MovieDetail/MovieDetail";
import MovieAdd from "./Containers/MovieAdd/MovieAdd";
import MovieEdit from "./Containers/MovieEdit/MovieEdit";
import HallList from "./Containers/HallList/HallList";
import HallDetail from "./Containers/HallDetail/HallDetail";
import HallAdd from "./Containers/HallAdd/HallAdd";
import HallEdit from "./Containers/HallEdit/HallEdit";
import Layout from "./Components/Layout/Layout";
import Login from './Containers/Login/Login';
import Logout from './Containers/Logout/Logout';
import AuthRoute from "./Components/AuthRoute/AuthRoute";
import Register from "./Containers/Register/Register";
import RegisterActivate from "./Containers/Register/RegisterActivate/RegisterActivate";
import UserDetail from './Containers/User/User';
import {tokenLogin} from "./store/actions/token-login";
import {connect} from "react-redux";


class App extends Component {
    componentDidMount() {
        this.props.tokenLogin();
    }


    render() {
        return (
                <BrowserRouter>
                    <Layout>
                        <div className="container">
                            <Switch>
                                <Route path="/login" component={Login}/>
                                <Route path="/logout" component={Logout}/>
                                <Route path="/register" component={Register} exact/>
                                <Route path="/register/activate" component={RegisterActivate}/>
                                <Route path="/register" component={Register}/>
                                <AuthRoute path="/users/:id" component={UserDetail}/>
                                <AuthRoute path="/halls/add" component={HallAdd}/>
                                <AuthRoute path="/halls/:id/edit" component={HallEdit}/>
                                <Route path="/halls/:id" component={HallDetail}/>
                                <Route path="/halls" component={HallList}/>
                                <AuthRoute path="/movies/add" component={MovieAdd}/>
                                <AuthRoute path="/movies/:id/edit" component={MovieEdit}/>
                                {/* :id обозначает переменную id */}
                                <Route path="/movies/:id" component={MovieDetail}/>
                                <Route path="/" component={MovieList} exact/>
                            </Switch>
                        </div>
                    </Layout>
                </BrowserRouter>
        );
    }
}

const mapStateToProps = state => ({
    app: state.app,
});
const mapDispatchToProps = dispatch => ({
    tokenLogin: () => dispatch(tokenLogin())
});



export default connect(mapStateToProps, mapDispatchToProps)(App);