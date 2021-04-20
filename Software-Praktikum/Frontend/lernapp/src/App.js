// import React from 'react';
// import './App.css';
// import { makeStyles}  from "@material-ui/core/styles";
// import {BrowserRouter as Router,
//   Switch, Route, Link } from "react-router-dom";
// import 
// {Drawer, List, ListItem, 
//   ListItemIcon, ListItemText,
//   Container, Typography} 
//   from '@material-ui/core';
// import PersonIcon from '@material-ui/icons/Person';
// import ChatIcon from '@material-ui/icons/Chat';
// import GroupWorkIcon from '@material-ui/icons/GroupWork';


// const matchmakerStyle = makeStyles ((theme) => ({
//   drawerPaper:{width:'inherit'},
//   link: {textDecoration: 'none', 
//   // Durch theme.palette.text.primary konnte der Link wieder ohne Unterstrich->blau angezeigt werden
//   color: theme.palette.text.primary }
// }))

// function App(){
//   const classes = matchmakerStyle();
//   return (
//     <div>
//       <h1>
//         Hello
//       </h1> 
//       <Router>
//       <div style={{display: 'flex'}}>
//         <Drawer
//         style={{width:'240px'}}
//         varian="persistent"
//         anchor="left"
//         open={true}
//         classes={{paper: classes.drawerPaper}}
//         >
//         {/* Hier wird jetzt ein Link erstellt, damit auf dem Router der Pfad steht */}
//           <List>
//           <Link to="/profil" className={classes.link} >
//             <ListItem button>
//               <ListItemIcon>
//                 <PersonIcon/>
//               </ListItemIcon>
//               <ListItemText primary={"Profil"}/>
//             </ListItem>       
//           </Link>
//           <Link to="/chats" className={classes.link} >
//             <ListItem button>
//               <ListItemIcon>
//                 <ChatIcon/>
//               </ListItemIcon>
//               <ListItemText primary={"Chats"}/>
//             </ListItem>       
//           </Link>
//           <Link to="/matchmaker" className={classes.link} >
//             <ListItem button>
//               <ListItemIcon>
//                 <GroupWorkIcon/>
//               </ListItemIcon>
//               <ListItemText primary={"Matchmaker"}/>
//             </ListItem>       
//           </Link>
//           </List>
//           </Drawer>
//           <Switch>
//             <Route exact path="/profil">
//             <Container>
//               <Typography variant="h3" gutterBottum>
//                 Profil
//               </Typography>
//             </Container>
//             </Route>
//             <Route exact path="/chats">
//               Chats
//             </Route>
//             <Route exact path="/matchmaker">
//               Matchmaker
//             </Route>
//           </Switch>
//       </div>
//       </Router>
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./App.css";
import Matchmaker from "./Matchmaker";
import Profil from "./Profil";
import Chats from "./Chats";
import Gruppen from "./Gruppen";
import Navigation from './Navigation';
import {BrowserRouter as Router,
    Switch, Route, Link } from "react-router-dom";
import {makeStyles} from "@material-ui/styles";

const useStyle = makeStyles ({});

function App(){
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <Navigation/>
      <Router>
      <Switch>
        <Route exact from="/matchmaker" render={props => <Matchmaker{...props}/>}/>
        <Route exact path="/profil" render={props => <Profil{...props}/>}/>
        <Route exact path="/chats" render={props => <Chats{...props}/>}/>
        <Route exact path="/gruppen" render={props => <Gruppen{...props}/>}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;