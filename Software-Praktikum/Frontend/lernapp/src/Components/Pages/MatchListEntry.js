import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LernappAPI from '../../API/LernappAPI';
import RequestBO from './../../API/RequestBO';

/**
 * In dieser Komponente werden die einzelnen Eigenschaften, wie Name, Vorname, Lernfrequenz, etc.
 * rausgeholt und die Methode addRequest wird hier definiert
 * 
 * @author [Esra Özkul (geb.Copuro)](https://github.com/EsraCopuro)
 */
class MatchListEntry extends Component{
    constructor(props){
        super(props);

        //die Matches werden als Profile geholt und die Request als Request
        this.state={
            matches: props.profiles,
            request: props.request,

            
        };
    }

//Diese Funktion soll in MatchListEnty ermöglichen, dass der User eine Anfrage schicken kann 
//Diese werden im Datenbank request gespeichert
addProfileRequest = () => {
    let data = this.props.googleId;
    let request_type = "E";
    let groupid = 0;
      let newRequest = new RequestBO(
        this.state.matches.getID(), 
        data,
        request_type,
        groupid

      )
      LernappAPI.getAPI().addRequest(newRequest).then(console.log(newRequest))
    } 

//In der Render-Methode werden die einzelnen Namen, Vorname, Lernfrequenz und andere Eigenschaften gerendert, aber auch
//die Methode addProfileRequest aufgerufen
    render() {
        const{matches}=this.state;
        
        return(
            <div>
                
                <Typography>
                    {matches.getFirstname()}, {matches.getLastname()}, {matches.getLearnstyle()}, {matches.getStudytime()},
                    {matches.getStudyplace()}, {matches.getStudyfrequence()}
                 
                <Button
                 color='primary'  flex="flex-end" onClick={this.addProfileRequest}>Anfrage senden
                </Button>
                
                 
                 </Typography>
               
                
            </div>
        );
    }
}

export default MatchListEntry;

