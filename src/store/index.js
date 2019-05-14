import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {reducer as userReducer} from '../pages/user/store';

const reducer = combineReducers({
    user:userReducer
});

const store = createStore(reducer,
	applyMiddleware(thunk)
);

export default store;