// import React, {Component} from "react";
// import {Link, Switch, Route} from "react-router-dom";
// import "./App.css"

// const Matchmaking = () => <div>Du bist auf Matchmaking!</div> 
// const Chat = () => <div>Du bist auf Chat!</div>
// const Profil = () => <div>Du bist auf Profil!</div>

// class Matchmaker extends Component {
//   render(){
//     return(
//       <div>
//         <h1>Hey du bist auf der Matchmaking-Seite!</h1>
        
//         <div className="tabs">
//           <br/>
//           <hr/>
//           <Switch>
//             <Route path="/matchmaking" exact component ={Matchmaking} />
//             <Route path="/matchmaking/chat" exact component ={Chat} />
//             <Route path="/matchmaking/profil" exact component ={Profil} />

//           </Switch>
//         </div>
//         <div className="herz"> </div>
//         <button></button>
//         <div className="kreuz">
          
//         </div>
        
        
//         <div className="links">
//           <Link to = "/matchmaking" className="link"> Matchmaking </Link>
//           <Link to = "/matchmaking/chat" className="link"> Chat </Link>
//           <Link to = "/matchmaking/profil" className="link"> Profil </Link>
//         </div>
        
//       </div>
//     )
//   }
// }

// export default Matchmaker;

// import React from 'react';
// import './Matchmaker.css';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import { List } from '@material-ui/core';


// function Matchmaker(){
//     return (
//         <div className="Matches">
//             {/* <FavoriteIcon onClick={() => showNextMatch()}/> */}
//             <FavoriteIcon/>
//         </div>
//     )
// };

// export default Matchmaker; 

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default function InteractiveList() {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  return (
    <div className={classes.root}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            Avatar with text and icon
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircleIcon/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <AddIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
        </Grid>
    
    </div>
  );
}
