import React,{Component} from 'react';
import { Button } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPi';
import DeleteRequest from '../Dialog/DeleteRequest';
import Chatroom from '../Pages/Chatroom';
import Test from '../../Test';
import {BrowserRouter as Router,
    Switch, Route, Link as RouterLink} from "react-router-dom";
import {Paper, Typography, Tabs, Tab} from '@material-ui/core';



class RequestListEntry extends Component{
    constructor(props){
        super(props);

        this.state={
            request: props.profiles,
            // loadingInProgress: false,
            // deletingInProgress: false,
            // loadingError: null,
            // deletingError: null,
            currentUser: 6,
            showDeleteRequest: false

        };
    }

// deleteRequestButtonClicked = (event) => {
//     event.stopPropagation();
//     this.setState({
//         showDeleteRequest: true
//     });
// }
closeDeleteDialog = () => {
    this.setState({
    showDeleteRequest: false
  });
}


getRequest = () => {
    LernappAPI.getAPI().getRequestForProfile(this.state.currentUser).then(profileBOs =>
        this.setState({
            request:  profileBOs,
    
        }))} 

/** Handles onChange events of the Tabs component */
changeTab = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };



    render() {
        const{request}=this.state;
        
        return(
            <div>
                
                <Typography>
                    {request.getFirstname()}, {request.getLastname()}, {request.getLearnstyle()}, {request.getStudytime()},
                <div indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.changeTab} >
                <Tab label='Annehmen' component={RouterLink} to={'/chats'}/>
                </div>
                {/* <Button color='primary'
                    onClick={this.routeToChats}> 
                    Annehmen
                </Button> */}
                
                <div className="DeleteButton">
                <div className="RequestLöschen">
                <Button color="primary" size="large" onClick={this.deleteRequestButtonClicked}> Ablehnen</Button>
                </div>
                {/* <DeleteRequest show={this.state.showDeleteRequest} request={request} onClose={this.closeDeleteDialog}/> */}
                </div>
                
                </Typography>           
            
            </div>
        );
    }
}

export default RequestListEntry;