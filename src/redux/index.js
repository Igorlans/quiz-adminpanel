import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer.js";
import questionReducer from "./questionReducer.js";

const rootReducer = combineReducers({
    user: userReducer,
    question: questionReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));