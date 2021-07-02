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
import ProfileOperations from "./Components/Pages/ProfileOperations"


/**
 * 
 * Die einzelnen Komponente werden hier aufgerufen.
 * Dadurch können wir sie auf der Webseite anzeigen lassen.
 * 
 * @author [Esra Özkul (geb.Copuro)](https://github.com/EsraCopuro)
 */

class App extends React.Component {


//im ersten Schritt sollen die Matches und Navigation angezeigt werden.
//Durch Redirect kann die URL weitergeleietet werden.
//Route ermöglicht es dass eine bestimmte Path zugeordnet werden kann.
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
                  </Route>
                  <Route path='/mygroups'>
                      <GroupListForProfile/>
                  </Route>
                  <Route path='/profil'>
                    <ProfileOperations></ProfileOperations>
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
