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
  Switch, Route, Link} from "react-router-dom";
import { Paper, Tabs, Tab } from '@material-ui/core';
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

//TabIndex wird jetzt 'empty state' zeigen
  this.state = {
      tabindex: 0
    }
//Funktion für die änderung von den Tabs
  const handleMenuClick = (newindex) => {
    this.setState({
      tabindex : newindex
  })
  }
 
//   /** Handles onChange events of the Tabs component */
//   handleTabChange = (e, newIndex) => {
//     // console.log(newValue)
//     this.setState({
//       tabindex: newIndex
//     })
//   };

  // const handleMenuClick = (newPage) => {
  //   history.push(newPage);
  //   setAnchorEl(null);

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
                  <MenuItem><Link to="/Chats">Chats</Link></MenuItem>
                
                </Router>
                
              </Menu>
            </div>
       
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Navigation;


// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
// import { Link as RouterLink } from 'react-router-dom';
// import Match from './Match';
// import Matchmaker from "./Matchmaker";
// import Profil from "./Profil";
// import Chats from "./Chats";

// /**
//  * Shows the header with the main navigation Tabs within a Paper.
//  * 
//  * @see See Material-UIs [Tabs](https://material-ui.com/components/tabs/)
//  * @see See Material-UIs [Paper](https://material-ui.com/components/paper/)
//  * 
//  * @author [Christoph Kunz](https://github.com/christophkunz)
//  */
// class Navigation extends Component {

//   constructor(props) {
//     super(props);

//     // Init an empty state
//     this.state = {
//       tabindex: 0
//     };
//   }

//   /** Handles onChange events of the Tabs component */
//   handleTabChange = (e, newIndex) => {
//     // console.log(newValue)
//     this.setState({
//       tabindex: newIndex
//     })
//   };

//   /** Renders the component */
//   render() {
//     const { user } = this.props;

//     return (
//       <Paper variant='outlined' >
//         <ProfileDropDown user={user} />
//         <Typography variant='h3' component='h1' align='center'>
//           HdM Bank Administration
//         </Typography>
//         <Typography variant='h4' component='h2' align='center'>
//           Client Advisor Home
//         </Typography>
//         {
//           user ?
//             <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
//               <Tab label='Matchmaker' component={RouterLink} to={`/matchmaker`} />
//               <Tab label='Profil' component={RouterLink} to={`/profil`} />
//               <Tab label='Chats' component={RouterLink} to={`/chats`} />
//             </Tabs>
//             : null
//         }
//       </Paper>
//     )
//   }
// }

// /** PropTypes */
// Header.propTypes = {
//   /** The logged in firesbase user */
//   user: PropTypes.object,
// }

// export default Navigation;