import React,{Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter,Route} from 'react-router-dom';
import Login from './pages/login/index';
import store from './store';

class App extends Component{
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route path='/' component={Login}/>
                </BrowserRouter>
            </Provider>
       )
    }
}
export default App;