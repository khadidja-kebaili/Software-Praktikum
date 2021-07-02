import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';
import RequestBO from '../../API/RequestBO';
import {BrowserRouter as Router,
    Switch, Route, Link as RouterLink} from "react-router-dom";
import {Tab, Tabs } from '@material-ui/core';
import DeleteGroupRequest from "./../Dialog/DeleteGroupRequest"

/**
 *
 * Hier werden die einzelnen Requests für die Gruppen gerendert
 * Mit bestimmten Eigenschaften wie Vorname und Nachname geholt
 *
 *
 * @author [Esra Özkul (geb.Copuro)](https://github.com/EsraCopuro)
 * @coauthor [Khadidja Kebaili] (https://github.com/khadidjakebaili)
 */

class RequestGroupListEntry extends Component{
    constructor(props){
        super(props);

        this.state={
            requestGroup: props.requests,
            currentUser: 6,
            showDeleteGroupRequest: false,
            tabindex: 0,
            group: "",
            profileLastName: "",
            profileFirstName:"",

        };
    }

    //Nach dem der Request gelöscht wird, wird der Dialog geschlossen
    deleteRequestDialogClosed = (requestGroup) => {
        // Wenn Request nicht null, dann lösche diese
        if (requestGroup) {
            this.props.onGroupRequestDeleted(requestGroup);
        };

        // Zeig den Dialog nicht mehr an
        this.setState({
            showDeleteGroupRequest: false
        });
    }

    //Die Methode stopPropagation() der Event-Schnittstelle verhindert die weitere
    //Ausbreitung des aktuellen Ereignisses in der Erfassungs- und Bubbling-Phase.
    deleteRequestButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showDeleteGroupRequest: true
        });
    }
    //Hier werden die Gruppen durch die GruppenID geholt
    getGroupById= (id) =>{
        LernappAPI.getAPI().getGroup(id).then(groupBO =>{
            this.setState({
                group:groupBO
            })
        })
    }
    //Hier werden die Profile durch die ProfileID geholt --> Vorname und Nachname
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
    // ComponentDidMount() wird unmittelbar nach dem Mounten einer Komponente
    //aufgerufen (in den Baum eingefügt)
    componentDidMount() {
        this.getGroupById(this.props.requests.getGroupId())
        this.getProfileById(this.props.requests.getRequestedBy())

    }

    render() {
        const{requestGroup, showDeleteGroupRequest}=this.state;
        return(
            <div>
                <Typography>
                    Hey, {this.state.profileLastName} möchte in die Gruppe: {this.state.group.groupname}
                 <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.changeTab} >
                    <Tab label='Annehmen' component={RouterLink} to={'/chats'} /> 
                </Tabs>


                <div className="DeleteButton">
                <div className="RequestLöschen">
                <Button color="primary" size="large" onClick={this.deleteRequestButtonClicked}> Ablehnen</Button>
                </div>
                <DeleteGroupRequest deleteGroupRequest ={this.deleteGroupRequest} show={this.state.showDeleteGroupRequest} requestGroup={requestGroup} onClose= {this.deleteRequestDialogClosed}/>
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
