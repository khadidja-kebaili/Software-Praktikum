import React from 'react';
import MatchList from './Components/Pages/MatchList';
import RequestList from './Components/Pages/RequestList';
import Header from './Components/Layout/Header';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';


class App extends React.Component {
<<<<<<< HEAD

=======
  
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
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
<<<<<<< HEAD

                  </Route>
                  <Route path='/groups'>

                  </Route>
                  <Route path='/mygroups'>

                  </Route>
                  <Route path='/profil'>

=======
                    
                  </Route>
                  <Route path='/groups'>
                    
                  </Route>
                  <Route path='/mygroups'>
                    
                  </Route>
                  <Route path='/profil'>
                    
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
                  </Route>
                </>
              }

            </Container>
<<<<<<< HEAD

          </Router>

=======
            
          </Router>
          
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
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
<<<<<<< HEAD


        </div>

=======
            
          
        </div> 
      
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
    )
  }
}

<<<<<<< HEAD
export default App;


=======
export default App; 
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
