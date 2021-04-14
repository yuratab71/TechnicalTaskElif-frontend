import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducer";

let reducers = combineReducers({
    data: reducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;


