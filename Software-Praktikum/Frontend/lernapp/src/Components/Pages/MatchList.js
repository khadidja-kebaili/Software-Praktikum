import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import { withRouter } from 'react-router-dom';
import LernappAPI from '../../API/LernappAPI';
import Error_Message from '../Dialog/Error_Message';
import Ladevorgang from '../Dialog/Ladevorgang';
import MatchForm from '../Dialog/MatchForm';
import MatchListEntry from './MatchListEntry';

class MatchList extends Component {
    constructor(props){
        super(props);

        let expandendID = null;

        if (this.props.lacation.expandMatch) {
            expandendID = this.props.lacation.expandMatch.getID();    
        }
        //Eine leere INIT setzten
        this.state={
            matches: [],
            filteredMatches:[],
            matchesFilter:'',
            error: null,
            loadingInProgress: false,
            expandedMatchID: expandendID,
            showMatchForm: false
        };
    }
    getAllProfiles = () => {
        LernappAPI.getAPI().getAllProfiles()
        .then(matchesBOs =>
            this.setState({
                matches: matchesBOs,
                filteredMatches: [...matchesBOs],
                loadingInProgress: false,
                error: null
            })).catch(e =>
                this.setState({
                    matches: [],
                    loadingInProgress: false,
                    error: e
                })
                );
                //setzt loading auf true
            this.setState({
                loadingInProgress: true,
                error: null
            });
        }
        //Lifecycle Methode wird aufgerufen, wenn die Komponente in den DOM Browser eingefügt wird
        componentDidMount(){
            this.getMatches();
        }
        //behandelt onExpandedStateChange Ereignisse aus der MatchListEntry Komponente. Toggelt den Zustand von MatchListEntry von dem angegebenen 
        //ProfilBO (=Eigentlich ist es voraussichtloch so gedacht.).
        /** 
        * @param {matches} ProfilBO of the CustomerListEntry to be toggeled
        */
        onExpandedStateChange = matches =>{
          //Kundeneintrag wird dann auf null gesetzt
          let newID = null;
          
          //Wenn auf Matcheseintrag geklickt wird, soll es diese erweitern oder reduzieren
          if (matches.getID() !== this.state.expandMatchID){
              //Erweitert den Matcheintrag mit MatchID
              newID = matches.getID();
          }
          this.setState({
              expandedMatchID: newID,
          });
        }
        //Behandelt den onclose Event von MatchForm
        matchFormClosed = matches => {
            //Matches sind nicht null und wird daher erstellt
            if (matches){
                const newMatchList = [...this.state.matches, matches];
                this.setState({
                    matches: newMatchList,
                    showMatchForm: false
                });
            }else{
                this.setState({
                    showMatchForm: false
                });
            }
        }
        //Die Komponente die gerendert werden
        render(){
           const {classes}= this.props
           const{expandMatchID,loadingInProgress,error,showMatchForm}=this.state;
        
            return(
                <div className={classes.root}>
                    {
                        //Zeigt die MatchesListEntry Komponente
                        <MatchListEntry key={matches.getID()} matches={matches} expandedState={expandedMatchID === matches.getID()}
                            onExpandedStateChange={this.onExpandedStateChange}/>    
                    }
                    <Ladevorgang show={loadingInProgress}/>
                    <Error_Message error={error} contextErrorMsg={'Die Liste konnte leider nicht geladen werden.'} onReload={this.getMatches}/>
                    <MatchForm show ={showMatchForm} onClose={this.matchFormClosed}/> 
                </div>
            );     
        } 
}

// Komponenten-Style wird jetzt definiert
//Das kann natürlich noch geändert werdeb
const styles = theme => ({
    root:{
        width: '100%'
    }  
});

//PropTypes
MatchList.PropTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** @ignore */
    location: PropTypes.object.isRequired,
}
export default withRouter(withStyles(styles)(MatchList));
