import React, {Component} from 'react';
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
  Switch, Route, Link as RouterLink} from "react-router-dom";
import { Paper, Tabs, Tab } from '@material-ui/core';
import Matchmaker from "./Matchmaker";
import Profil from "./Profil";
import Chats from "./Chats";
import { List } from '@material-ui/core';


class Navigation extends Component {

   useStyles = makeStyles((theme) => ({
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
        
    constructor(props) {
      super(props);
  
      // Init an empty state
      this.state = {
        tabindex: 0
      };
    }
  
    /** Handles onChange events of the Tabs component */
    handleTabChange = (e, newIndex) => {
      // console.log(newValue)
      this.setState({
        tabindex: newIndex
      })
    };
  
    /** Renders the component */
    render() {
      const { user } = this.props;
  
      return (
        <div className={classes.root}>
        <AppBar variant='outlined' >
         <Toolbar>
          {/* <ProfileDropDown user={user} /> */}
          <Typography variant='h3' component='h1' align='center'>
            Lernapp
          </Typography>
          <Typography variant='h4' component='h2' align='center'>
            Client Advisor Home
          </Typography>
          
          <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                className={classes.menuButton}
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
                
              >
          
          
          
          {
            user ?
              <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
                <Tab label='Matchmaker' component={RouterLink} to={`/matchmaker`} />
                <Tab label='Profil' component={RouterLink} to={`/profil`} />
                <Tab label='Chats' component={RouterLink} to={`/chats`} />
              </Tabs>
              : null
          }
          </Menu>
          </div> 
          </Toolbar>
        </AppBar>
        </div>
      )
    }
  }
  

  
  export default Navigation;