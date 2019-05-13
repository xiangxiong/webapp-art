import React,{Component} from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './pages/home/index';
import store from './store';

class App extends Component{
    render(){
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route path='/' component={Home}/>
                </BrowserRouter>
            </Provider>
       )
    }
}
export default App;