// import React from "react";
// import "./App.css";
// import Matchmaker from "./Matchmaker";
// import Profil from "./Profil";
// import Chats from "./Chats";
// import Gruppen from "./Gruppen";
// import Navigation from './Navigation';
// import {BrowserRouter as Router,
//     Switch, Route, Link } from "react-router-dom";
// import {makeStyles} from "@material-ui/styles";
// import MatchForm from "./Components/Dialog/MatchForm"


// const useStyle = makeStyles ({});

// function App(){
//   const classes = useStyle();
//   return (
//     <div className={classes.container}>
      
//       <Navigation/>
      
//       {/* Dadurch werden in den neuen Tabs die Inhalte angezeigt */}
//       <Router>
//       <Switch>
//         <Route exact from="/matchmaker" render={props => <Matchmaker{...props}/>}/>
//         <Route exact path="/profil" render={props => <Profil{...props}/>}/>
//         <Route exact path="/chats" render={props => <Chats{...props}/>}/>
//         <Route exact path="/gruppen" render={props => <Gruppen{...props}/>}/>
//       </Switch>
//       </Router>
      
//     </div>
//   );
// }

// export default App;

import React from 'react';
// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
// import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import Navigation from '../src/Navigation';
// import MatchList from '../src/Components/Pages/MatchList';
// import Theme from './Components/Layout/Theme';
// import SignIn from './Components/Pages/SignIn';
// import Ladevorgang from './Components/Dialog/Ladevorgang';
// import Error_Message from './Components/Dialog/Error_Message';
// import PythonLernappBeispielConfig from '../src/http-fake-backend/server/api/PythonLernappBeispiel-config';
// import Bla from './showMatches';
import MatchOperations from './Components/Pages/MatchOperations';


class App extends React.Component {
  
  // constructor(props){
  //   super(props);

  //   //INIT leer
  //   this.state ={
  //     currrentUser:null,
  //     appError: null,
  //     authError: null,
  //     authLoading: false
  //   };
  // }
  // static getDerivedStateFromError(error){
  //   return {appError: error};
  // }

  // handleAuthStateChange = user => {
  //   if(user){
  //     this.setState({
  //       authLoading: true
  //     });
  //     user.getIdToken().then(token => {
  //       document.cookie = `token=${token};path=/`;

  //       this.setState({
  //         currrentUser: user,
  //         authError: null,
  //         authLoading: false
  //       });
  //     }).catch(e => {
  //       this.setState({
  //         // authError: e,
  //         authLoading: false
  //       });
  //     });
  //     }else {
  //       document.cookie = 'token=;path=/';

  //       this.setState({
  //         // authError: e,
  //         authLoading: false
  //       });
  //   }
  // }
  // handleSignIn = () => {
  //   this.setState({
  //     authLoading: true
  //   });
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithRedirect(provider);
  // }

  // componentDidMount() {
  //   firebase.initializeApp(PythonLernappBeispielConfig);
  //   firebase.auth().languageCode = 'en';
  //   firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  // }

  //Hier fehlen noch Funktionen
  render(){
    return(
      // <ThemeProvider theme={Theme}>
      //   <CssBaseline/>
      //   <Container maxWidth='md'>
      //     <Navigation/>
          
      //   </Container>
      // </ThemeProvider>
      <div>
        <MatchOperations/>
      </div> 
      
    )
  }
}

export default App; 
