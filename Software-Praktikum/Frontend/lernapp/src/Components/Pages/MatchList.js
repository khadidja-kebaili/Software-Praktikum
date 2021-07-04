import React, {Component} from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import LernappAPI from '../../API/LernappAPI';
import MatchListEntry from './MatchListEntry';


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
            matches: []
        };
    }
        //Lifecycle Methode wird aufgerufen, wenn die Komponente in den DOM Browser eingefügt wird
        componentDidMount(){
            this.getMatchmaker();
        }
        
        
    
    // Die Funktion getMatchmaking() soll die matches anzeigen
    getMatchmaker =() => {
        let data = this.props.googleId
        console.log(data)
        LernappAPI.getAPI().getMatches(data).then(profileBOs =>
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
                            <MatchListEntry key={profiles.getID()} profiles={profiles} googleId={this.props.googleId}/>)
                            
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

export default withStyles(styles)(MatchList);
