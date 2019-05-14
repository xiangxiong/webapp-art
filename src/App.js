import React,{Component} from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import User from './pages/user';
import store from './store';
import Home from './pages/home';

function RenderRouter() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={User} />
        </div>
      </Router>
    );
}

class App extends Component{
    render(){
        return (
            <Provider store={store}>
                 <RenderRouter/>
            </Provider>
       )
    }
}

export default App;