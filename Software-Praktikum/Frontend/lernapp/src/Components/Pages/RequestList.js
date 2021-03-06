import React, {Component} from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';
import RequestListEntry from './RequestListEntry';
import RequestGroupListEntry from './RequestGroupListEntry';

/**
 * 
 * Hier werden die einzelnen Requests für die Gruppen und Profile gerendert
 * 
 * 
 * @author [Esra Özkul (geb.Copuro)](https://github.com/EsraCopuro)
 */

class RequestList extends Component {
    constructor(props){
        super(props);
        
        //Eine leere INIT setzten für request
        this.state={
            request: [],
            requestGroup: [],
            groupRequests: null,
            newRoom: null
            
            
        };
    }
        //Lifecycle Methode wird aufgerufen, wenn die Komponente in den DOM Browser eingefügt wird
        componentDidMount(){
            this.getRequestForProfile();
            this.getRequestForGroups();
        }
        //Durch requestAdded werden die Request in eienm Array gespeichert
        requestAdded = (group) =>{
            const newGroupList = this.state.groups.filter(groupFromState => groupFromState.getID());
            this.setState({
                groups: newGroupList,
                filteredGroups: [...newGroupList]
            });
        }


    // Die Funktion getRequest() soll die request anzeigen
    getRequestForProfile =() => {
        let data = this.props.googleId
        LernappAPI.getAPI().getRequestForProfile(data).then(requestBOs =>
            this.setState({
                request:  requestBOs,
        
            }))}

    //Die Funktion getRequest() soll die Request für die Gruppe anzeigen
    getRequestForGroups = () => {
        var res = []
        let data = this.props.googleId
        LernappAPI.getAPI().getRequestForGroups(data).then(requestBOs =>
            this.setState({
                requestGroup: requestBOs,
            }))
    }

    //Die Request werden gefiltert/abgeglichen und in den in dem Array gespeichert
    requestDeleted = request => {
    const newRequestList = this.state.request.filter(requestFromState => requestFromState.getID() !== request.getID());
    this.setState({
        request: newRequestList,
    });
    }

    //Die Request werden gefiltert/abgeglichen und in den in dem Array gespeichert
    groupRequestDeleted = request => {
        const newRequestList = this.state.requestGroup.filter(requestFromState => requestFromState.getID() !== request.getID());
        this.setState({
            requestGroup: newRequestList,
        });
    }


    //Die Komponente die gerendert werden
    render(){
        const{request,requestGroup}=this.state
            return(
                <div id='head'>
                    <Grid item>
                        <Typography id='title'>
                            Hier sind deine Anfragen:
                        </Typography>
                    </Grid>
                    {
                        request.map(requests =>
                            <RequestListEntry key={requests.getID()} requests={requests} googleId={this.props.googleId} onRequestDeleted = {this.requestDeleted}/>)
                            
                    }

                    <Typography>
                        Hier sind deine Anfrage für Gruppen:
                    </Typography>
                    {
                        requestGroup.map(requests =>
                            <RequestGroupListEntry key={requests.getID()} requests={requests} onGroupRequestDeleted={this.groupRequestDeleted}/>)
                    }
            
                </div>
            )
    }
        
}


// Komponenten-Style wird jetzt definiert
//Das kann natürlich noch geändert werdeb
const styles = theme => ({
    root:{
        width: '100%'
    }  
});

export default withStyles(styles)(RequestList);