import {combineReducers} from 'redux-immutable';
import {reducer as loginReducer} from '../pages/user-login/store';

const reducer = combineReducers({
    login:loginReducer
})

export default reducer;