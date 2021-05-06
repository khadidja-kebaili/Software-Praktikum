import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MatchForm from '../Dialog/MatchForm';

// import MatchesDeleteDialog from '../Dialog/MatchesDeleteDialog';
// AccountList wird hier verlangt, aber noch nicht verstanden wieso?

//Rendert ein CustomerBO-Objekt in einem erweiterbaren / 
//reduzierbaren CustomerListEntry mit den Kundenmanipulationsfunktionen. 
//Wenn es erweitert wird, wird eine AccountList gerendert.

class MatchListEntry extends Component{
    constructor(props){
        super(props);

        //Init methoden
        this.state = {
            matches: props.matches,
            showMatchesForm: false,
            showMatchesDeleteDialog: false,
        };
    }
    //Behandelt onChange-Ereignisse des zugrunde liegenden ExpansionPanel
    expansionPanelStateChanged = () => {
        this.props.expansionPanelStateChange(this.props.matches);
    }

    //Behandelt das onClick-Ereignis der Schaltfläche "Kunden bearbeiten"
    //Noch unklar, ob wir es benötigen
    editMatchesButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
            showMatchesForm: true
        });
    }
    //Benhandelt den onClose-Event für das MatchesForm
    matchesFormClosed = (matches) => {
        //matches sind nicht null deshalb ist es verändert
        if (matches){
            this.setState({
                matches: matches,
                showMatchesForm: false
            });
        }else {
            this.setState({
                showMatchesForm: false
            });
        }
    }
    // //Behandelt den onClose-Event für MatchesDeleteDialog
    // deleteMatchesDialogClosed = (matches) => {
    //     //Wenn Matches is not null, dann wird es gelöscht
    //     if (matches){
    //         this.props.onMatchesDeleted(matches);
    //     };

    //     //Zeigt nicht den Dialog
    //     this.setState({
    //         showMatchesDeleteDialog: false
    //     });
    // }
    //Rendert die Komponente
    render() {
        const { classes, expandedState } = this.props;
        //Die state Matches werden angewendet
        const { matches, showMatchesForm, showMatchesDeleteDialog} = this.state;

        return (
            <div>
                <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}> 
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        id={`matches${matches.getID()}profilpanel-header`}>
                           <Grid container spacing={1} justify='flex-start' alignItems='center'>
                                <Typography variant='body1' className={classes.heading}>
                                    {matches.getLastName()}, {matches.getFirstName()}, {matches.getID()}
                                </Typography>
                            </Grid>
                            <Gird item>
                                <ButtonGroup variant='text' size='small'>
                                    {/* Das muss geändert werden zu adden */}
                                    <Button color='primary' onClick={this.editMatchesButtonClicked}>
                                        edit
                                    </Button>
                                </ButtonGroup>
                            </Gird>
                            <Grid item xs/>
                     </AccordionSummary>
                    <MatchForm show={showMatchesForm} matches={matches} onClose={this.matchesFormClosed}/>
                    {/* <MatchesDeleteDialog show={showMatchesDeleteDialog} matches={matches} onClose={this.deleteMatchesDialogClosed}/> */}
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
MatchListEntry.PropTypes ={
    /**@igrnore */
    classes: PropTypes.object.isRequired,
    /** Die ProfilBO wird gerenderd */
    matches: PropoTypes.object.isRequired,
    /**Der Status dieses CustomerListEntry. Wenn dies zutrifft, wird der Kunde mit seinen Konten angezeigt. */
    expandedState: PropTypes.bool.isRequired,
    /**Der Handler, der für die Bearbeitung erweiterter Statusänderungen (Erweitern / Reduzieren) 
     * dieses MatchListEntry verantwortlich ist
     * * Signatur: onReadyStateChange (Kundenkunde) * / */
    onExpandedStateChange: PropTypes.func.isRequired,
    /** * Event-Handler-Funktion, die nach erfolgreichem Löschen 
     * dieses Kunden aufgerufen wird. 
     * 
     * Unterschrift: onCustomerDelete (Kunde Kunde) */
     onMatchesDeleted: PropTypes.func.isRequired
}
export default withStyles(styles)(MatchListEntry);