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

class App extends Component {
    render() {
        return (
                <BrowserRouter>
                    <Layout>
                        <div className="container">
                            <Switch>
                                <Route path="/login" component={Login}/>
                                <Route path="/logout" component={Logout}/>
                                <Route path="/halls/add" component={HallAdd}/>
                                <Route path="/halls/:id/edit" component={HallEdit}/>
                                <Route path="/halls/:id" component={HallDetail}/>
                                <Route path="/halls" component={HallList}/>
                                <Route path="/movies/add" component={MovieAdd}/>
                                <Route path="/movies/:id/edit" component={MovieEdit}/>
                                {/* :id обозначает переменную id */}
                                <Route path="/movies/:id" component={MovieDetail}/>
                                <Route path="/" component={MovieList}/>
                            </Switch>
                        </div>
                    </Layout>
                </BrowserRouter>
        );
    }
}

export default App;
