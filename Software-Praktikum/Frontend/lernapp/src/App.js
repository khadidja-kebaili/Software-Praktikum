import React from 'react';
// import MatchList from './Components/Pages/MatchList';
// import RequestList from './Components/Pages/RequestList';
// import Header from './Components/Layout/Header';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
// import DeleteRequest from "./Components/Dialog/DeleteRequest";
import GroupList from "./Components/GroupList";


class App extends React.Component {
  
//im ersten Schritt sollen die Matches und Navigation angezeigt werden.
  render(){
    return(
      // <DeleteRequest/>
      <GroupList/>
    )
  }
}

export default App; 
