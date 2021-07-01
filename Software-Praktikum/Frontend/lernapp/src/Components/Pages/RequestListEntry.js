import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button, Tab, Tabs } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';
import DeleteRequest from '../Dialog/DeleteRequest';
import {BrowserRouter as Router,
    Switch, Route, Link as RouterLink} from "react-router-dom";


class RequestListEntry extends Component{
    constructor(props){
        super(props);

        this.state={
            request: props.requests,
            currentUser: 6,
            showDeleteRequest: false,
            tabindex: 0,
            profileFirstName: null,
            profileLastName:null,

        };
    }

    deleteRequestDialogClosed = (request) => {
        // if customer is not null, delete it
        if (request) {
            this.props.onRequestDeleted(request);
        };

        // Don´t show the dialog
        this.setState({
            showDeleteRequest: false
        });
    }

    deleteRequestButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showDeleteRequest: true
        });
    }

    getProfileById= (id) =>{
        LernappAPI.getAPI().getProfile(id).then(profileBO =>{
            this.setState({
                profileLastName:profileBO.getLastname(),
                profileFirstName:profileBO.getFirstname(),
            }, function(){
                var a
            })
        })
    }

    componentDidMount() {
        this.getProfileById(this.state.request.getRequestedBy())

    }


    render() {
        const{request}=this.state;
        return(
            <div>
                <Typography>
                    {this.state.profileFirstName}, {this.state.profileLastName}
                <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.changeTab} >
                    <Tab label='Annehmen' component={RouterLink} to={'/chats'} />
                </Tabs>
                <div className="DeleteButton">
                <div className="RequestLöschen">
                <Button color="primary" size="large" onClick={this.deleteRequestButtonClicked}> Ablehnen</Button>
                </div>
                <DeleteRequest deleteRequest = {this.deleteGroupRequest} show={this.state.showDeleteRequest} request={request} onClose={this.deleteRequestDialogClosed}/>
                </div>
                
                </Typography>           
            
            </div>
        );
    }
}

export default RequestListEntry;