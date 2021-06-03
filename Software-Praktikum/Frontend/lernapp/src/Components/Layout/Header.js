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


class Header extends Component {

    constructor(props) {
      super(props);
  
      // Init an empty state
      this.state = {
        tabindex: 0
      };
    }
  
    /** Handles onChange events of the Tabs component */
    changeTab = (e, newIndex) => {
      // console.log(newValue)
      this.setState({
        tabindex: newIndex
      })
    };
  
    /** Renders the component */
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
                <Tab label='Gruppen' component={RouterLink} to={`/gruppen`} />
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
// class Header extends Component{
//     constructor(props){
//         super(props);

//         this.state = {
//             tabIndex: 0
//         };
//     }

//     changeTab = (e,newIndex) => {
//         this.setState({
//             tabIndex: newIndex
//         })
//     };

//     openInNewTab = (url) => {
//         const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
//         if (newWindow) newWindow.opener = null
//     };

//     onClickTabItem = (tab) => {
//         this.setState({ activeTab: tab });
//       }
    

//     render (){
//         const {profile} = this.props;

//         return(
//             <Paper>
//                 <Typography variant='h3' component='h1' align='center'>
//                     LernApp
//                 </Typography>
//                 <ClickAwayListener>
//                     <Router>
//                         <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabIndex} onChange={this.changeTab}>
//                             <Tab label='Matchmaker' component={RouterLink} to={`/matchmaker`}/>
//                             <Tab label='Chats' component={RouterLink} to={`/chats`} onClick={() => this.openInNewTab('./Test')} />
//                             <Tab label='Gruppen' component={RouterLink} to={`/gruppen`} />
                            
//                         </Tabs>
//                     </Router>
//                 </ClickAwayListener>
//             </Paper>
//         )
//     }
// }
// //Prototyp
// // Header.PropTypes ={
// //     profile: PropTypes.object,
// // }
    
        
        
// export default Header;
        