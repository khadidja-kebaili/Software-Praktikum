import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
// import LernappAPI from '../../API/LernappAPI';
import LernappAPI from '../../API/LernappAPi';
import RequestListEntry from './RequestListEntry';
import AddIcon from '@material-ui/icons/Add';



class RequestList extends Component {
    constructor(props){
        super(props);
        
        //Eine leere INIT setzten für request
        this.state={
            request: [],
            currentUser : 3,
            
        };
    }
        //Lifecycle Methode wird aufgerufen, wenn die Komponente in den DOM Browser eingefügt wird
        componentDidMount(){
            this.getRequestForProfile();
        }
   
    
    // Die Funktion getrequest() soll die request anzeigen
    getRequestForProfile =() => {
        LernappAPI.getAPI().getRequestForProfile(this.state.currentUser).then(profileBOs =>
            this.setState({
                request:  profileBOs,
        
            }))}

    //Handles onrequestDelete events from an requestListEntry
    // deleterequestHandler = (deletedrequest) => {
    //     this.setState({
    //         requests: this.state.requests.filter(request => request.getID() !== deletedrequest.getID())
    //     })
    // }
    //

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
                            <RequestListEntry key={profiles.getID()} profiles={profiles} 
                            // onrequestDeleted={this.deleterequestHandler}
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