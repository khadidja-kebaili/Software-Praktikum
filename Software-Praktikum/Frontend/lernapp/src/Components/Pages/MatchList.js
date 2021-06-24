import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LernappAPI from '../../API/LernappAPI';
import MatchListEntry from './MatchListEntry';
import AddIcon from '@material-ui/icons/Add';



class MatchList extends Component {
    constructor(props){
        super(props);

        //Eine leere INIT setzten für matches
        this.state={
            matches: [],
            currentUser : 3
        };
    }
        //Lifecycle Methode wird aufgerufen, wenn die Komponente in den DOM Browser eingefügt wird
        componentDidMount(){
            this.getMatchmaking();
        }



    // Die Funktion getMatchmaking() soll die matches anzeigen
    getMatchmaking =() => {

        LernappAPI.getAPI().getMatchmaking(this.state.currentUser).then(profileBOs =>
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
