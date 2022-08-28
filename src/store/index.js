import {createStore} from "redux";

const reducerFn = (state = {contractAddress: null}, action) => {
    if (action.type === "SET") {
        return {contractAddress: action.payload}
    }
    return state;
}

const store = createStore(reducerFn);

export default store;