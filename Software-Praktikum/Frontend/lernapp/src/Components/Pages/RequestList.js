import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LernappAPI from '../../API/LernappAPI';
import RequestListEntry from './RequestListEntry';
import AddIcon from '@material-ui/icons/Add';



class RequestList extends Component {
    constructor(props){
        super(props);
        
        //Eine leere INIT setzten für request
        this.state={
            request: [],
            currentUser : 6,
            
        };
    }
        //Lifecycle Methode wird aufgerufen, wenn die Komponente in den DOM Browser eingefügt wird
        componentDidMount(){
            this.getRequest();
        }
   
    
    // Die Funktion getRequest() soll die request anzeigen
    getRequest =() => {
        LernappAPI.getAPI().getRequest(this.state.currentUser).then(profileBOs =>
            this.setState({
                request:  profileBOs,
        
            }))}

    //Handles onRequestDelete events from an RequestListEntry
    deleteRequestHandler = (deletedRequest) => {
        this.setState({
            requests: this.state.requests.filter(request => request.getID() !== deletedRequest.getID())
        })
    }
    

    //Die Komponente die gerendert werden
    render(){
        const{request}=this.state
            return(
                <div id='head'>
                    <Grid item>
                        <Typography id='title'>
                            Hier sind deine Anfragen:
                        </Typography>
                    </Grid>
                    {
                        request.map(profiles =>
                            <RequestListEntry key={profiles.getID()} profiles={profiles} onRequestDeleted={this.deleteRequestHandler}
                            />)
                            
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

// //PropTypes
// MatchList.PropTypes = {
//     /** @ignore */
//     classes: PropTypes.object.isRequired,
//     /** @ignore */
//     location: PropTypes.object.isRequired,
// }
export default withStyles(styles)(RequestList);