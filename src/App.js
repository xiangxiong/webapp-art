import React,{Component} from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import routes from './Routes';
import User from './pages/user';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component{

  render() {
    
    return (
      <Provider store={store}>
            <BrowserRouter>
                <div>
                {
                   routes.map(route => (
                        <Route {...route} />
                   ))
                }
                </div>
            </BrowserRouter>
        </Provider>
    );
  }
}
export default App;
