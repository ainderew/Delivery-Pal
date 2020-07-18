import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import {Main} from "./Main";
import {createStore} from "redux";
import {combinedReducers} from "./reducers/index"
import { Provider } from "react-redux";


//PERSIST REDUX STATE
const saveToLocalStorage = (state) =>{
  try{
    const usableState = JSON.stringify(state) 
    localStorage.setItem("state", usableState)
    
  }catch(err){
    console.log(err)
  }
}

const loadFromLocalStorage = () =>{
  try{
    const usableState = localStorage.getItem("state")
    if (usableState === null) return undefined;
    return JSON.parse(usableState)
  }catch(err){
    console.log(err)
    return undefined
  }
}

const presistedState = loadFromLocalStorage()
//REDUX
const store = createStore(
  combinedReducers,
  presistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

store.subscribe(() => saveToLocalStorage(store.getState()))

const renderReactDom = () =>{
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Main />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


if (window.cordova) {
  document.addEventListener('deviceready', () => {
    renderReactDom();
  }, false);
} else {
  renderReactDom();
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

