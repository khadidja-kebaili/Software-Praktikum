import React from 'react';
import MatchList from './Components/Pages/MatchList';
import RequestList from './Components/Pages/RequestList';
import Header from './Components/Layout/Header';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Chats from './Chats';
import Gruppen from './Gruppen';
import Profil from './Profil';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';

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
                  <Route path='/chats'>
                    <Chats/>
                  </Route>
                  <Route path='/groups'>
                    <Gruppen/>
                  </Route>
                  <Route path='/mygroups'>
                    <Gruppen/>
                  </Route>
                  <Route path='/profil'>
                    <Profil/>
                  </Route>
                </>
              }

            </Container>
          </Router>
          {/* {
            <div>
              <Router>
                <Redirect from='/' to='matchmaker'/>
                <Route exact path='/matchmaker'>
                  <MatchList/>
                </Route>
                  <Route path='/chats'>
                  <Chats/>
                </Route>
              </Router>
            </div>
          } */}
            
          
        </div> 
      
    )
  }
}

export default App; 
