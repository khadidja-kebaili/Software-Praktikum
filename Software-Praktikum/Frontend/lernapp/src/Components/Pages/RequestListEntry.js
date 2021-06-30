import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import LernappAPI from "../../API/LernappAPI";
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

    deleteRequest = (id1) => {
        const { request } = this.state;
        id1 = this.state.request.getID()
        console.log(id1)
        console.log(this.state.request)
        LernappAPI.getAPI().deleteRequest(id1).then(() => {
            this.setState({  // Set new state when AccountBOs have been fetched
                deletingInProgress: false, // loading indicator
                deletingError: null
            })
            // console.log(account);
            // this.props.onRequestDeleted(request);
        }).then(this.closeDeleteDialog).catch(e =>
            this.setState({ // Reset state with error from catch
                deletingInProgress: false,
                deletingError: e
            })
        );

        // set loading to true
        this.setState({
            deletingInProgress: true,
            deletingError: null
        });
    }

deleteRequestButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
        showDeleteRequest: true
    });
}
closeDeleteDialog = () => {
    this.setState({
    showDeleteRequest: false
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
                <DeleteRequest deleteRequest = {this.deleteRequest} show={this.state.showDeleteRequest} request={request} onClose={this.closeDeleteDialog}/>
                </div>
                
                </Typography>           
            
            </div>
        );
    }
}

export default RequestListEntry;