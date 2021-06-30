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
import AddGroup from "./Components/Dialog/AddGroup";

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
                  <Route exact path='/chats'>
                    <ChatList/>
                  </Route>
                  <Route path='/groups'>
                      <GroupList/>
                      <AddGroup/>
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
