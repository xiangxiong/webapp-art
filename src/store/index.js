import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {reducer as userReducer} from '../pages/user/store';
import {reducer as homeReducer} from '../pages/home/store';
import {reducer as shopReducer} from '../pages/shop/store';
import {reducer as orderReducer} from '../pages/order/store';

const reducer = combineReducers({
    user: userReducer,
    home: homeReducer,
    shop: shopReducer,
    order: orderReducer,
});

const store = createStore(reducer,
    applyMiddleware(thunk)
);

export default store;