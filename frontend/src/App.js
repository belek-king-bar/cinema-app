import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import './App.css';
import MovieList from "./Containers/MovieList/MovieList";
import MovieDetail from "./Containers/MovieDetail/MovieDetail";
import MovieAdd from "./Containers/MovieAdd/MovieAdd";

class App extends Component {
    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/movies/add" component={MovieAdd}/>
                        {/* :id обозначает переменную id */}
                        <Route path="/movies/:id" component={MovieDetail}/>
                        <Route path="/" component={MovieList}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
