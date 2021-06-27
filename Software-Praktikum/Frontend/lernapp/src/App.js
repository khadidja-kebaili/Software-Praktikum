import React from 'react';
import MatchList from './Components/Pages/MatchList';
import RequestList from './Components/Pages/RequestList';
import Header from './Components/Layout/Header';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import DeleteRequest from "./Components/Dialog/DeleteRequest";
import GroupList from "./Components/GroupList";


class App extends React.Component {
  
//im ersten Schritt sollen die Matches und Navigation angezeigt werden.
  render(){
    return(
      
        <div>
          <Router>
            <Container maxWidth='md'>
              <Header/>
              {/* <DeleteRequest/>
              <GroupList/> */}
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
                  </Route>
                  <Route path='/groups'>
                    
                  </Route>
                  <Route path='/mygroups'>
                    
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
