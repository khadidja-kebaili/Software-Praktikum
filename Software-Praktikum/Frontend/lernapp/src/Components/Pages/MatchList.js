import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
// import LernappAPI from '../../API/LernappAPI';
import LernappAPI from '../../API/LernappAPI';
import MatchListEntry from './MatchListEntry';
import AddIcon from '@material-ui/icons/Add';


/**
 * In dieser Komponente werden die alle Matches für den CurrentUser angezeigt.
 * 
 * 
 * @author [Esra Özkul (geb.Copuro)](https://github.com/EsraCopuro)
 */

class MatchList extends Component {
    constructor(props){
        super(props);
        
        //Eine leere INIT setzten für matches und der CurrentUser wurde gesetzt
        this.state={
            matches: [],
            currentUser : 6
        };
    }
        //Lifecycle Methode wird aufgerufen, wenn die Komponente in den DOM Browser eingefügt wird
        componentDidMount(){
            this.getMatchmaker();
        }
        
        
    
    // Die Funktion getMatchmaking() soll die matches anzeigen
    getMatchmaker =() => {
        
        LernappAPI.getAPI().getMatches(this.state.currentUser).then(profileBOs =>
            this.setState({
                matches:  profileBOs,
        
            }))}

    

        
    //Die Komponente die gerendert werden
    render(){
        const{matches}=this.state
            return(
                <div id='head'>
                    <Grid item>
                        <Typography id='title'>
                            Hier sind deine Matches:
                        </Typography>
                    </Grid>
                    {
                        matches.map(profiles =>
                            <MatchListEntry key={profiles.getID()} profiles={profiles}/>)
                            
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
export default withStyles(styles)(MatchList);
