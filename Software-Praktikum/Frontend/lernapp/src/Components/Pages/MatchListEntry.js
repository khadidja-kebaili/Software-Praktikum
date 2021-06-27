import React,{Component} from 'react';
import {Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import LernappAPI from '../../API/LernappAPI';
import AddRequest from '../Dialog/AddRequest';


class MatchListEntry extends Component{
    constructor(props){
        super(props);

        this.state={
            matches: props.profiles,
        };
    }

    addRequest = () =>{
        LernappAPI.getAPI().addRequest().then(profileBOs =>
            this.setState({
                requests : profileBOs,
            }))
    };

    render() {
        const{matches, request, showDeleteRequest}=this.state;
        
        return(
            <div>
                
                <Typography>
                    {matches.getFirstname()}, {matches.getLastname()}, {matches.getLearnstyle()}, {matches.getStudytime()},
                    {matches.getStudyplace()}, {matches.getStudyfrequence()}
                 
                <Button
                 color='primary' startIcon={<AddIcon />} flex="flex-end" onClick={this.addRequest}>Anfrage senden
                </Button>
                 
                 </Typography>
               
                
            </div>
        );
    }
}

export default MatchListEntry;

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid} from '@material-ui/core';
// import { Button, ButtonGroup } from '@material-ui/core';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MatchForm from '../Dialog/MatchForm';
// import BusinessObject from '../../API/BusinessObject';
// import LernappAPI from '../../API/LernappAPI';

// import profileDeleteDialog from '../Dialog/profileDeleteDialog';
// AccountList wird hier verlangt, aber noch nicht verstanden wieso?

//Rendert ein CustomerBO-Objekt in einem erweiterbaren / 
//reduzierbaren CustomerListEntry mit den Kundenmanipulationsfunktionen. 
//Wenn es erweitert wird, wird eine AccountList gerendert.

// class MatchListEntry extends Component{
//     constructor(props){
//         super(props);

//         //Init methoden
//         this.state = {
//             profile: props.profile,
//             // showprofileForm: false,
//             // showprofileDeleteDialog: false,
//         };
//     }
//     //Behandelt onChange-Ereignisse des zugrunde liegenden ExpansionPanel
//     expansionPanelStateChanged = () => {
//         this.props.expansionPanelStateChange(this.props.profile);
//     }

//     //Benhandelt den onClose-Event für das profileForm
//     profileFormClosed = (profile) => {
//         //profile sind nicht null deshalb ist es verändert
//         if (profile){
//             this.setState({
//                 profile: profile,
//                 // showprofileForm: false
//             });
//         }else {
//             this.setState({
//                 // showprofileForm: false
//             });
//         }
//     }

    
    
//     //Rendert die Komponente
//     render() {
//         const { classes } = this.props;
//         //Die state profile werden angewendet
//         const { profile, 
//             // showprofileForm, showprofileDeleteDialog
//         } = this.state;

//         return (
//             <div>
//                 <Accordion> 
//                     <AccordionSummary
                       
//                         id={`profile${profile.getID()}`}>
//                            <Grid container spacing={1} justify='flex-start' alignItems='center'>
//                                 <Typography variant='body1' className={classes.heading}>
//                                     {profile.getLastName()}, {profile.getFirstName()}
//                                 </Typography>
//                             </Grid>
//                             <Grid item>
//                                 <ButtonGroup variant='text' size='small'>
//                                     {/* Das muss geändert werden zu adden */}
                                    
//                                 </ButtonGroup>
//                             </Grid>
//                             <Grid item xs/>
//                      </AccordionSummary>
//                     {/* <MatchForm 
//                     // show={showprofileForm} 
//                     profile={profile} 
//                     onClose={this.profileFormClosed}/> */}
//                     {/* <profileDeleteDialog show={showprofileDeleteDialog} profile={profile} onClose={this.deleteprofileDialogClosed}/> */}
//                 </Accordion>
//             </div>
//         );
//     }
// }
// // Style für die Komponente
// const styles = theme => ({
//     root: {
//         width: '100%',
//     }
// });

// export default withStyles(styles)(MatchListEntry);