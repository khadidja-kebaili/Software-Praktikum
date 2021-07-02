import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Paper, Typography, Tabs, Tab} from '@material-ui/core';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import {BrowserRouter as Router,
  Switch, Route, Link as RouterLink} from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

/**
 * 
 * Hier wurde die Navigationsleiste definiert.
 * Die Tabs ermöglichen das Switchen zwischen zwischen den einzelnen Komponente.
 * 
 * @author [Esra Özkul (geb.Copuro)](https://github.com/EsraCopuro)
 */


class Header extends Component {

    constructor(props) {
      super(props);
  
      // Ein leerer INIT
      this.state = {
        tabindex: 0
      };
    }
  
   
  /** Behandelt onChange-Ereignisse der Tabs-Komponente */ 
    changeTab = (e, newIndex) => {
      this.setState({
        tabindex: newIndex
      })
    };
  
    /** Rendert die Komponente */
    render() {
      const { user } = this.props;
  
      return (
        <Paper variant='outlined' >
          
          <Typography variant='h3' component='h1' align='center'>
            LernApp
          </Typography>
          
          {
            
              <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.changeTab} >
                <Tab label='Matchmaker' component={RouterLink} to={`/matchmaker`} />
                <Tab label='Anfragen' component={RouterLink} to={`/request`} />
                <Tab label='Chats' component={RouterLink} to={`/chats`} />
                <Tab label='Gruppen' component={RouterLink} to={`/groups`} />
                <Tab label='Meine Gruppen' component={RouterLink} to={`/mygroups`} />
                <Tab label='Profil' component={RouterLink} to={`/profil`} />
              </Tabs>
              
          }
        </Paper>
      )
    }
  }
  
  /** PropTypes */
  Header.propTypes = {
    /** The logged in firesbase user */
    user: PropTypes.object,
  }
  
  export default Header;

        