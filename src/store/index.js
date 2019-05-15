import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {reducer as userReducer} from '../pages/user/store';
import {reducer as homeReducer} from '../pages/home/store';
import {reducer as shopReducer} from '../pages/shop/store';

const reducer = combineReducers({
    user: userReducer,
    home: homeReducer,
    shop: shopReducer,
});

const store = createStore(reducer,
    applyMiddleware(thunk)
);

export default store;