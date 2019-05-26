import {createStore, applyMiddleware, combineReducers,compose} from 'redux';
import thunk from 'redux-thunk';
import {reducer as userReducer} from '../pages/user/store';
import {reducer as homeReducer} from '../pages/home/store';
import {reducer as shopReducer} from '../pages/shop/store';
import {reducer as orderReducer} from '../pages/order/store';
import {reducer as addressReducer} from '../pages/address/store';
import logger from 'redux-logger';
const middlewares = [];
const reducer = combineReducers({
    user: userReducer,
    home: homeReducer,
    shop: shopReducer,
    order: orderReducer,
    address: addressReducer,
});
const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
// middlewares.push(logger);
middlewares.push(thunk);

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

const store = createStore(reducer,
    enhancer
);

export default store;