import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
// import LernappAPI from '../../API/LernappAPI';
import LernappAPI from '../../API/LernappAPi';
import RequestListEntry from './RequestListEntry';
import AddIcon from '@material-ui/icons/Add';
import RequestGroupListEntry from './RequestGroupListEntry'



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
            this.getRequestForProfile();
        }



    // Die Funktion getRequest() soll die request anzeigen
    getRequestForProfile =() => {
        LernappAPI.getAPI().getRequestForProfile(this.state.currentUser).then(profileBOs =>
            this.setState({
                request:  profileBOs,
        
            }))}

            //Die Funktion getRequest() soll die Request für die Gruppe anzeigen
            //getRequestForGroup =() => {
                //LernappAPI.getAPI().getRequestForGroup(this.state.currentUser).then(profileBOs =>
                    //this.setState({
                    //request:  profileBOs,
                
                   // }))}
        
   

        requestDeleted = request => {
        const newRequestList = this.state.request.filter(requestFromState => requestFromState.getID() !== request.getID());
        this.setState({
            customers: newRequestList,
            filteredCustomers: [...newRequestList],
            showCustomerForm: false
        });
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
                            <RequestListEntry key={profiles.getID()} profiles={profiles}/>)
                            
                    }
                            
                    {        <RequestGroupListEntry key={profiles.getID()} profiles={profiles}/>

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