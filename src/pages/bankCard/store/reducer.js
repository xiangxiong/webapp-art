import {BANK_CARD_LIST} from './constants';

const defaultState = {
    bankCardList: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case BANK_CARD_LIST:
            return {
                ...state,
                bankCardList: action.value
            };
        default:
            return state;
    }
}