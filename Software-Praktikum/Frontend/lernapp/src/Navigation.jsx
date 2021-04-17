import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {withRouter} from "react-router-dom";
import {BrowserRouter as Router,
  Switch, Route, Link } from "react-router-dom";
import Matchmaker from "./Matchmaker";
import Profil from "./Profil";
import Chats from "./Chats";
import { List } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navigation = props => {
  const {history}=props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (newPage) => {
    history.push(newPage);
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" className={classes.title}>
            LernApp
          </Typography>
         
            <div>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {/* <MenuItem onClick={() => handleMenuClick('./Matchmaker')}>Matchmaker</MenuItem>
                <MenuItem onClick={() => handleMenuClick('./Profil')}>Profil</MenuItem>
                <MenuItem onClick={() => handleMenuClick('./Chats')}>Chats</MenuItem> */}
                {/* <MenuItem>
                  <Router>
                    <Switch>
                      <Route path="/" onClick={() => handleMenuClick('./Matchmaker')} exact component ={Matchmaker}>Matchmaker</Route>
                      <Route path="/" onClick={() => handleMenuClick('./Profil')} exact component ={Profil}>Profil</Route>
                      <Route path="/" onClick={() => handleMenuClick('./Chats')} exact component ={Chats}>Chats</Route>
                    </Switch>               
                   <List> 
                    <Link to="/matchmaker" className="link"> Matchmaker </Link> <br/>
                    <Link to = "/chat" className="link"> Chat </Link> <br/>
                    <Link to = "/profil" className="link"> Profil </Link> <br/>
                   </List>             
                  </Router>
                </MenuItem> */}
                <Router>
                  <Switch>
                    <Route path="/Matchmaker" component={Matchmaker}/>
                    <Route path="/Profil" component={Profil}/>
                    <Route path="/Chats" component={Chats}/>
                  </Switch>
                  
                  <MenuItem><Link to="/Matchmaker">Matchmaker</Link></MenuItem>
                  <MenuItem><Link to="/Profil">Profil</Link></MenuItem>
                
                </Router>
                
              </Menu>
            </div>
       
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navigation;


