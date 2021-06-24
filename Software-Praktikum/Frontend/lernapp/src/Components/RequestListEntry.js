import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import LernappAPI from "../API/LernappAPi";
import DeleteRequest from "./Dialog/DeleteRequest";

class RequestListEntry extends Component{
    constructor(props){
        super(props);

        this.state={
            request: props.profiles,
            currentUser: 6,
            showDeleteRequest: false,
            requestss : props.requests

        };
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
    getAllRequests = () => {
        LernappAPI.getAPI().getAllRequests().then(requestBOs =>
            this.setState({
                requestss : requestBOs
            }))
    }


    render() {
        const{request, showDeleteRequest, requestss}=this.state;

        return(
            <div>

                <Typography>
                    {/*{request.getFirstname()}, {request.getLastname()}, {request.getLearnstyle()}, {request.getStudytime()},*/}
                    {/*{request.getStudyplace()}, {request.getStudyfrequence()}*/}
                    {console.log(requestss.getID())}
                    <Button color='primary' flex="flex-end" onClick={this.addRequest}> Annehmen </Button>
                    <div className="DeleteButton">
                        <div className="RequestLöschen">
                            <Button color="primary" size="large" onClick={this.deleteRequestButtonClicked}> Ablehnen</Button>
                            <Button onClick={this.props.deleteRequest}>Something</Button>
                        </div>
                        <DeleteRequest show={this.state.showDeleteRequest} request={request} onClose={this.closeDeleteDialog}/>
                    </div>

                </Typography>

            </div>
        );
    }
}

export default RequestListEntry;