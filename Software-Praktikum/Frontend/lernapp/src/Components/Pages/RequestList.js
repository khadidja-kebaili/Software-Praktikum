import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LernappAPI from '../../API/LernappAPI';
import RequestListEntry from './RequestListEntry';
import AddIcon from '@material-ui/icons/Add';
import RequestGroupListEntry from './RequestGroupListEntry';



class RequestList extends Component {
    constructor(props){
        super(props);
        
        //Eine leere INIT setzten für request
        this.state={
            request: [],
            currentUser : 6,
            requestGroup: [],
            groupRequests: null
            
            
        };
    }
        //Lifecycle Methode wird aufgerufen, wenn die Komponente in den DOM Browser eingefügt wird
        componentDidMount(){
            this.getRequestForProfile();
            this.getRequestForGroups();
        }
        
        requestAdded = (group) =>{
            const newGroupList = this.state.groups.filter(groupFromState => groupFromState.getID());
            this.setState({
                groups: newGroupList,
                filteredGroups: [...newGroupList]
            });
        }


    // Die Funktion getRequest() soll die request anzeigen
    getRequestForProfile =() => {
        LernappAPI.getAPI().getRequestForProfile(this.state.currentUser).then(requestBOs =>
            this.setState({
                request:  requestBOs,
        
            }))}

            //Die Funktion getRequest() soll die Request für die Gruppe anzeigen
            //getRequestForGroup =() => {
                //LernappAPI.getAPI().getRequestForGroup(this.state.currentUser).then(profileBOs =>
                    //this.setState({
                    //request:  profileBOs,
                
                   // }))}
        
        getRequestForGroups = () => {
            var res = []
            LernappAPI.getAPI().getRequestForGroups(this.state.currentUser).then(requestBOs =>
                this.setState({
                    requestGroup: requestBOs,
                }))
        }

        // getGroups = () =>{
        //     var result = this.getRequestForGroups()
        //     result.forEach(elem =>{
        //         console.log('BONJOOOORNOOO')
        //         console.log()
        //         }
        //     )
        //
        // }

        requestDeleted = request => {
        const newRequestList = this.state.request.filter(requestFromState => requestFromState.getID() !== request.getID());
        this.setState({
            request: newRequestList,
        });
        }

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
                            <RequestListEntry key={requests.getID()} requests={requests} onRequestDeleted = {this.requestDeleted}/>)
                            
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