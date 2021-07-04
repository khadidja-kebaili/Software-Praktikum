import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button, Tab, Tabs } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';
import DeleteRequest from '../Dialog/DeleteRequest';
import {BrowserRouter as Router,
    Switch, Route, Link as RouterLink} from "react-router-dom";
import ChatroomBO from '../../API/ChatroomBO';
import ChataccessBO from '../../API/ChataccessBO';

/**
 * 
 * Hier werden die einzelnen Requests für Profile geholt.
 * 
 * 
 * @author [Esra Özkul (geb.Copuro)](https://github.com/EsraCopuro)
 */   
class RequestListEntry extends Component{
    constructor(props){
        super(props);

        this.state={
            request: props.requests,
            showDeleteRequest: false,
            tabindex: 0,
            profileFirstName: null,
            profileLastName: null,
            profile: null,

        };
    }
    //Nach dem der Request gelöscht wird, wird der Dialog geschlossen
    deleteRequestDialogClosed = (request) => {
        // Wenn Request nicht null, dann lösche diese
        if (request) {
            this.props.onRequestDeleted(request);
        };

        // Zeig den Dialog nicht mehr an
        this.setState({
            showDeleteRequest: false
        });
    }

    //Die Methode stopPropagation() der Event-Schnittstelle verhindert die weitere 
    //Ausbreitung des aktuellen Ereignisses in der Erfassungs- und Bubbling-Phase.
    deleteRequestButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showDeleteRequest: true
        });
    }

    //Hier werden die einzelnen Attribute aus dem Profil geholt
    getProfileById= (id) =>{
        LernappAPI.getAPI().getProfile(id).then(profileBO =>{
            this.setState({
                profile: profileBO,
                profileLastName:profileBO.getLastname(),
                profileFirstName:profileBO.getFirstname(),
            }, function(){
                var a
            })
        })
    }

    // newChat(data){
    //     let room = new ChatroomBO(
    //         'E'
    //     );
    //     LernappAPI.getAPI().addChatroom(room).then(console.log(room));
    //     let access1 = new ChataccessBO(
    //         this.props.googleId,
    //         room.getID(),
    //         'E'
    //     );
    //     LernappAPI.getAPI().addChataccess(access1).then(console.log(access1));
    //     let access2 = new ChataccessBO(
    //         data,
    //         room.getID(),
    //         'E'
    //     );
    //     LernappAPI.getAPI().addChataccess(access2).then(console.log(access2));
    // }

    // ComponentDidMount() wird unmittelbar nach dem Mounten einer Komponente 
    //aufgerufen (in den Baum eingefügt)
    componentDidMount() {
        const {request} = this.state
        this.getProfileById(request.getRequestedBy())
        // this.newGroup()
        // console.log("cdm")
        // let data = this.state.request.getRequestedBy();
        // this.newChat(data)

    }


    render() {
        const{request}=this.state;
        return(
            <div>
                <Typography>
                    {this.state.profileFirstName } {this.state.profileLastName} möchte mit dir chatten!
                <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.changeTab} >
                <Tab label='Annehmen' component={RouterLink} to={'/chats'} onClick={this.newGroup}/>
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