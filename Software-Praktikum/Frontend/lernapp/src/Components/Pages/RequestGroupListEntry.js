import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';
import DeleteRequest from '../Dialog/DeleteRequest';
import RequestBO from '../../API/RequestBO';
import {BrowserRouter as Router,
    Switch, Route, Link as RouterLink} from "react-router-dom";
import {Tab, Tabs } from '@material-ui/core';




class RequestGroupListEntry extends Component{
    constructor(props){
        super(props);

        this.state={
            requestGroup: props.profiles,
            currentUser: 6,
            showDeleteGroupRequest: false,
            tabindex: 0,

        };
    }


// deleteGroupRequestButtonClicked = (event) => {
//     event.stopPropagation();
//     this.setState({
//         showDeleteGroupRequest: true
//     });
// }


// closeDeleteGroupDialog = () => {
//     this.setState({
//     showDeleteGroupRequest: false
//   });
// }

deleteRequestDialogClosed = (requestGroup) => {
    // if customer is not null, delete it
    if (requestGroup) {
        this.props.onRequestDeleted(requestGroup);
    };

    // Don´t show the dialog
    this.setState({
        showDeleteGroupRequest: false
    });
}
deleteRequestButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
        showDeleteGroupRequest: true
    });
}

// getRequestforGroup = () => {
//     LernappAPI.getAPI().getRequestforGroup(this.state.currentUser).then(profileBOs =>
//         this.setState({
//             requestGroup:  profileBOs,
    
//      }))} 

    //  addGroupRequest = () =>{
    //      let request_type ="E"
    //      let newRequest = new RequestBO(
    //          this.state.selectedMember.getID(),
    //          this.props.group.getID()
    //      )
    //     LernappAPI.getAPI().addGroupForRequest().then(profileBOs =>
    //         this.setState({
    //             requests : profileBOs,
    //         }))
    // };

    render() {
        const{requestGroup, showDeleteGroupRequest}=this.state;
        
        return(
            <div>
                
                <Typography>
                    {requestGroup.getFirstname()}, {requestGroup.getLastname()},
                 
                 <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.changeTab} >
                    <Tab label='Annehmen' component={RouterLink} to={'/chats'} /> 
                </Tabs>


                <div className="DeleteButton">
                <div className="RequestLöschen">
                <Button color="primary" size="large" onClick={this.deleteRequestButtonClicked}> Ablehnen</Button>
                </div>
                <DeleteRequest deleteRequest ={this.deleteRequest} show={this.state.showDeleteGroupRequest} requestGroup={requestGroup} onClose= {this.deleteRequestDialogClosed}/>
                </div>
                
                </Typography>           
            
             </div>
        );
    }
}

// /** Component specific styles */
// const styles = theme => ({
//     root: {
//         width: '100%'
//     },
//     buttonMargin: {
//         marginRight: theme.spacing(2),
//     },
//     groupEntry: {
//         fontSize: theme.typography.pxToRem(15),
//         flexBasis: '33.33%',
//         flexShrink: 0,
//     }
// });
    
export default RequestGroupListEntry;
