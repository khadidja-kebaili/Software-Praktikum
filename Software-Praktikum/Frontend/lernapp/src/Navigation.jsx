import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { mergeClasses } from '@material-ui/styles';


/**
 * Shows the header with the main navigation Tabs within a Paper.
 * 
 * @see See Material-UIs [Tabs](https://material-ui.com/components/tabs/)
 * @see See Material-UIs [Paper](https://material-ui.com/components/paper/)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
 
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




const openNavigator = props => {
  const handleMenu = (event) => {
  setAnchorEl(event.currentTarget);
  const {history}=props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);}}


class Navigation extends Component {

  
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

  // defineClasses = (classes) => {
  //   this.defineClass({
  //     useStyles: classes 
  //   })
  // };

  /** Renders the component */
  render() {
    const { user } = this.props;

    return (
      <div className={useStyles.root}>
      <AppBar position="static">
        <Toolbar>
      <Paper variant='outlined' >
        
        <Typography variant='h3' component='h1' align='center'>
          Lernapp
        </Typography>
        
        {
          
          user ?
          <div>
          <IconButton
                edge="start"
                className={useStyles.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}>
              <MenuIcon/>
          </IconButton>
          <Menu>
            <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
              <Tab label='Customers' component={RouterLink} to={`/customers`} />
              <Tab label='All Accounts' component={RouterLink} to={`/accounts`} />
              <Tab label='About' component={RouterLink} to={`/about`} />
            </Tabs>
            
        
          </Menu>
          </div>
          : null
        }
      </Paper>
      </Toolbar>
      </AppBar>
      </div>
    )
  }

}
/** PropTypes */
Navigation.propTypes = {
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default Navigation;