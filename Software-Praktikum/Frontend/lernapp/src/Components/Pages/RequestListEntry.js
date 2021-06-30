import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';
import DeleteRequest from '../Dialog/DeleteRequest';


class RequestListEntry extends Component{
    constructor(props){
        super(props);

        this.state={
            request: props.profiles,
            currentUser: 6,
            showDeleteRequest: false

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


addRequest = () =>{
    LernappAPI.getAPI().addRequest().then(profileBOs =>
        this.setState({
            requests : profileBOs,
        }))
};

getRequest = () => {
    LernappAPI.getAPI().getRequest(this.state.currentUser).then(profileBOs =>
        this.setState({
            request:  profileBOs,
    
        }))} 


    render() {
        const{request, showDeleteRequest}=this.state;
        
        return(
            <div>
                
                <Typography>
                    {request.getFirstname()}, {request.getLastname()}, {request.getLearnstyle()}, {request.getStudytime()},
                    {request.getStudyplace()}, {request.getStudyfrequence()}
                 <Button color='primary' flex="flex-end" onClick={this.addRequest}> Annehmen </Button>
                <div className="DeleteButton">
                <div className="RequestLöschen">
                <Button color="primary" size="large" onClick={this.deleteRequestButtonClicked}> Ablehnen</Button>
                </div>
                <DeleteRequest deleteRequest = {this.deleteRequest} show={this.state.showDeleteRequest} request={request} onClose={this.deleteRequestDialogClosed}/>
                </div>
                
                </Typography>           
            
            </div>
        );
    }
}

export default RequestListEntry;