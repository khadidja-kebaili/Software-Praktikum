import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LernappAPI from '../../API/LernappAPI';
import Error_Message from '../Dialog/Error_Message';
import LoadingProcess from '../Dialog/LoadingProcess';
import MatchListEntry from './MatchListEntry';
import BusinessObject from '../../API/BusinessObject';
import ProfileBOs from '../../API/ProfileBO';

//Kommentar
class MatchList extends Component {
    constructor(props){
        super(props);
        
        //Eine leere INIT setzten
        this.state={
            profile: [],
            error: null,
            // LoadingProcess: false,
            
        };
    }
    getMatchmaking = () => {
         let data= 3
        LernappAPI.getAPI().getMatchmaking(data)
        .then(ProfileBOs =>
            this.setState({
                profile: ProfileBOs,
                LoadingProcess: false,
                error: null
            })).catch(e =>
                this.setState({
                    profile: [],
                    LoadingProcess: false,
                    error: e
                })
                );
                //setzt loading auf true
            this.setState({
                LoadingProcess: true,
                error: null
            });
        }
        //Lifecycle Methode wird aufgerufen, wenn die Komponente in den DOM Browser eingefügt wird
        componentDidMount(){
            this.getMatchmaking();
        }
        //behandelt onExpandedStateChange Ereignisse aus der MatchListEntry Komponente. Toggelt den Zustand von MatchListEntry von dem angegebenen 
        //ProfilBO (=Eigentlich ist es voraussichtloch so gedacht.).
        /** 
        * @param {profile} ProfilBO of the CustomerListEntry to be toggeled
        */
        // onExpandedStateChange = profile =>{
        //   //Kundeneintrag wird dann auf null gesetzt
        //   let newID = null;
          
        //   //Wenn auf profileeintrag geklickt wird, soll es diese erweitern oder reduzieren
        //   if (profile.getID() !== this.state.expandMatchID){
        //       //Erweitert den Matcheintrag mit MatchID
        //       newID = profile.getID();
        //   }
        //   this.setState({
        //       expandedMatchID: newID,
        //   });
        // }
        //Behandelt den onclose Event von MatchForm
        // matchFormClosed = profile => {
        //     //profile sind nicht null und wird daher erstellt
        //     if (profile){
        //         const newMatchList = [this.state.profile, profile];
        //         this.setState({
        //             profile: newMatchList,
        //             showMatchForm: false
        //         });
        //     }else{
        //         this.setState({
        //             showMatchForm: false
        //         });
        //     }
        // }
        //Die Komponente die gerendert werden
        render(){
           const {classes,profile}= this.props
           const{LoadingProcess,error,
            // showMatchForm
        }=this.state;
        
            return(
                <div className={classes.root}>
                    
                        
            {/* Zeigt die profileListEntry Komponente */}
                       
                    {/* <MatchListEntry key={profile.getID()} profile={profile}
                    // onExpandedStateChange={this.onExpandedStateChange}
            />    */}

            {/* <MatchListEntry>
                    
                     
                    <LoadingProcess show={LoadingProcess}/> */}
                    <MatchListEntry>Hallo Kaddi</MatchListEntry>
                    <Error_Message error={error} contextErrorMsg={'Die Liste konnte leider nicht geladen werden.'} onReload={this.getMatchmaking}/>
                   
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

// //PropTypes
// MatchList.PropTypes = {
//     /** @ignore */
//     classes: PropTypes.object.isRequired,
//     /** @ignore */
//     location: PropTypes.object.isRequired,
// }
export default withStyles(styles)(MatchList);
