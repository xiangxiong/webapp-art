import React,{Component} from 'react';
import {Router,Route} from 'react-router-dom';
import routes from './Routes';
import {Provider} from 'react-redux';
import store from './store';
import history from '@/utils/history';

class App extends Component{
  render() {
    return (
      <Provider store={store}>
            <Router history={history}>
                {
                   routes.map(route =>(
                        <Route {...route} />
                   ))
                }
            </Router>
        </Provider>
    );
  }
}
export default App;
