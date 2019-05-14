import React,{Component} from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './pages/home/index';
import store from './store';

class App extends Component{
    render(){
        return (
            <Provider store={store}>
                <Router>
                    <Route path="/" exact component={Home} />
                    <Route path="/about/" component={About} />
                    <Route path="/users/" component={Users} />
                </Router>
            </Provider>
       )
    }
}

export default App;