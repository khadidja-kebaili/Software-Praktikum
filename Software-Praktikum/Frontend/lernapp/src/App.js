import React from 'react';
import MatchList from './Components/Pages/MatchList';
import RequestList from './Components/Pages/RequestList';
import ChatList from './Components/ChatList';
import Header from './Components/Layout/Header';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
// import DeleteRequest from "./Components/Dialog/DeleteRequest";
import GroupList from "./Components/GroupList";
import GroupListForProfile from "./Components/GroupListForProfile";
import Test from './Test';

class App extends React.Component {

//im ersten Schritt sollen die Matches und Navigation angezeigt werden.
  render(){
    return(
      
        <div>
          <Router>
            <Container maxWidth='md'>
              <Header/>
              {
                <>
                  <Redirect from='/' to='matchmaker'/>
                  <Route exact path='/matchmaker'>
                    <MatchList/>
                  </Route>
                  <Route exact path='/request'>
                    <RequestList/>
                  </Route>
<<<<<<< HEAD
                  <Route exact path='/chats'>
                    <ChatList/>
=======
                  <Route path='/chats'>
                    <Test/>
>>>>>>> e84bd475694ff2d6205fb008aed1ee0183ee1183
                  </Route>
                  <Route path='/groups'>
                      <GroupList/>
                  </Route>
                  <Route path='/mygroups'>
                      <GroupListForProfile/>
                  </Route>
                  <Route path='/profil'>
                  </Route>
                </>
              }

            </Container>
            
          </Router>
          </div>
    )
  }
}

export default App; 
