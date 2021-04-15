import React from 'react';
import './App.css';
import { makeStyles}  from "@material-ui/core/styles";
import {BrowserRouter as Router,
  Switch, Route, Link } from "react-router-dom";
import 
{Drawer, List, ListItem, 
  ListItemIcon, ListItemText,
  Container, Typography} 
  from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';

const matchmakerStyle = makeStyles ((theme) => ({
  drawerPaper:{width:'inherit'},
  link: {textDecoration: 'none', 
  // Durch theme.palette.text.primary konnte der Link wieder ohne Unterstrich->blau angezeigt werden
  color: theme.palette.text.primary }
}))

function App(){
  const classes = matchmakerStyle();
  return (
    <Router>
      <div style={{display: 'flex'}}>
        <Drawer
        style={{width:'240px'}}
        varian="persistent"
        anchor="left"
        open={true}
        classes={{paper: classes.drawerPaper}}
        >
        {/* Hier wird jetzt ein Link erstellt, damit auf dem Router der Pfad steht */}
          <List>
          <Link to="/" className={classes.link} >
            <ListItem button>
              <ListItemIcon>
                <PersonIcon/>
              </ListItemIcon>
              <ListItemText primary={"Profil"}/>
            </ListItem>       
          </Link>
          <Link to="/chats" className={classes.link} >
            <ListItem button>
              <ListItemIcon>
                <ChatIcon/>
              </ListItemIcon>
              <ListItemText primary={"Chats"}/>
            </ListItem>       
          </Link>
          </List>
          </Drawer>
          <Switch>
            <Route exact path="/">
            <Container>
              <Typography variant="h3" gutterBottum>
                Profil
              </Typography>
            </Container>
            </Route>
            <Route exact path="/chats">
              Chats
            </Route>
          </Switch>
      </div>
    </Router>
    
  );
}

export default App;


