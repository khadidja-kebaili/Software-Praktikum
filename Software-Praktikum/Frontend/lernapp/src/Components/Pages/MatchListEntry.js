import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid} from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MatchForm from '../Dialog/MatchForm';

// import profileDeleteDialog from '../Dialog/profileDeleteDialog';
// AccountList wird hier verlangt, aber noch nicht verstanden wieso?

//Rendert ein CustomerBO-Objekt in einem erweiterbaren / 
//reduzierbaren CustomerListEntry mit den Kundenmanipulationsfunktionen. 
//Wenn es erweitert wird, wird eine AccountList gerendert.

class MatchListEntry extends Component{
    constructor(props){
        super(props);

        //Init methoden
        this.state = {
            profile: props.profile,
            // showprofileForm: false,
            // showprofileDeleteDialog: false,
        };
    }
    //Behandelt onChange-Ereignisse des zugrunde liegenden ExpansionPanel
    expansionPanelStateChanged = () => {
        this.props.expansionPanelStateChange(this.props.profile);
    }

    //Benhandelt den onClose-Event für das profileForm
    profileFormClosed = (profile) => {
        //profile sind nicht null deshalb ist es verändert
        if (profile){
            this.setState({
                profile: profile,
                // showprofileForm: false
            });
        }else {
            this.setState({
                // showprofileForm: false
            });
        }
    }
    // //Behandelt den onClose-Event für profileDeleteDialog
    // deleteprofileDialogClosed = (profile) => {
    //     //Wenn profile is not null, dann wird es gelöscht
    //     if (profile){
    //         this.props.onprofileDeleted(profile);
    //     };

    //     //Zeigt nicht den Dialog
    //     this.setState({
    //         showprofileDeleteDialog: false
    //     });
    // }
    //Rendert die Komponente
    render() {
        const { classes, expandedState } = this.props;
        //Die state profile werden angewendet
        const { profile, 
            // showprofileForm, showprofileDeleteDialog
        } = this.state;

        return (
            <div>
                <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}> 
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        id={`profile${profile.getID()}profilpanel-header`}>
                           <Grid container spacing={1} justify='flex-start' alignItems='center'>
                                <Typography variant='body1' className={classes.heading}>
                                    {profile.getLastName()}, {profile.getFirstName()}, {profile.getID()}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <ButtonGroup variant='text' size='small'>
                                    {/* Das muss geändert werden zu adden */}
                                    <Button color='primary' onClick={this.editprofileButtonClicked}>
                                        edit
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                            <Grid item xs/>
                     </AccordionSummary>
                    <MatchForm 
                    // show={showprofileForm} 
                    profile={profile} 
                    onClose={this.profileFormClosed}/>
                    {/* <profileDeleteDialog show={showprofileDeleteDialog} profile={profile} onClose={this.deleteprofileDialogClosed}/> */}
                </Accordion>
            </div>
        );
    }
}
// Style für die Komponente
const styles = theme => ({
    root: {
        width: '100%',
    }
});
/**PropTypes */
// MatchListEntry.PropTypes ={
//     /**@igrnore */
//     classes: PropTypes.object.isRequired,
//     /** Die ProfilBO wird gerenderd */
//     profile: PropoTypes.object.isRequired,
//     /**Der Status dieses CustomerListEntry. Wenn dies zutrifft, wird der Kunde mit seinen Konten angezeigt. */
//     expandedState: PropTypes.bool.isRequired,
//     /**Der Handler, der für die Bearbeitung erweiterter Statusänderungen (Erweitern / Reduzieren) 
//      * dieses MatchListEntry verantwortlich ist
//      * * Signatur: onReadyStateChange (Kundenkunde) * / */
//     onExpandedStateChange: PropTypes.func.isRequired,
//     /** * Event-Handler-Funktion, die nach erfolgreichem Löschen 
//      * dieses Kunden aufgerufen wird. 
//      * 
//      * Unterschrift: onCustomerDelete (Kunde Kunde) */
//      onprofileDeleted: PropTypes.func.isRequired
// }
export default withStyles(styles)(MatchListEntry);