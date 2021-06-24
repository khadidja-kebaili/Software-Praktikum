import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import {BrowserRouter, Route, Redirect,Switch} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const routes =(
//   <BrowserRouter>
//   <Switch>
//     <Route path="/matchmaking" component={App}/>
//     <Redirect from ="/" to="/matchmaking"/>
//   </Switch>
  
//   </BrowserRouter>
// )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
