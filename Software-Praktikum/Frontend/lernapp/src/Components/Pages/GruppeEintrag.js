import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ListItem from '@material-ui/core/ListItem';
import {Typography, IconButton, Grid, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';

import GruppenForm from './Components/GruppenForm';
import GruppeDelete from './Components/GruppeDelete';



class GruppeEintrag extends Component {
    constructor(props){
        super(props);


        //leerer Status
        
        this.state = {
            showGruppenForm: false,
            showGruppeDelete: false,
            error: null,
            loadingInProgress: false,
        }

     
    // Gruppe bearbeiten
    bearbeitenButtonClicked = event => {
      event.stopPropagation();
      this.setState({
        showGruppenForm: true
      });
    }
    
    // wird aufgerufen, wenn Gruppe gelöscht werden soll
    GruppeDeleteButtonClicked =  event => {
      event.stopPropagation();
      this.setState({
        showGruppeDelete: true
      });
    }
    
    // wird aufgerufen, wenn DELETE Dialog Fenster geschloßen werden soll
    GruppeDeleteClosed = () => {
        this.setState({
          showGruppeDelete: false
        });
        this.getGruppe();


   // wird aufgerufen, wenn Dialog Fenster geschloßen werden soll
    GruppenFormClosed = (Gruppe) => {
      if (Gruppe){
        this.setState({
          Gruppe: Gruppe,
          showGruppenForm: false
        });
      }else {
        this.setState({
          showGruppenForm: false
        });
      }
    }
}

  // API Anbindung um Die Gruppe vom Backend zu bekommen 
  getGruppe = () => {
    this.props.getGruppe();
  }
          // Die komponente wird gerendert 
    render()
        const {classes, Gruppe} = this.props;
        const { showGruppenForm, showGruppeDelete,  error, loadingInProgress } = this.state;

        return(
          <div>
            <ListItem className={classes.root}>
                  <Grid container  alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography >{Gruppen.name}</Typography>
                    </Grid>
                    <Grid item xs/>
                    <Grid item>
                    <Tooltip title='Bearbeiten' placement="bottom">
                      <IconButton  className={classes.bearbeitenButton} variant='contained' onClick={this.bearbeitenButtonClicked}>
                          <EditIcon />
                      </IconButton>
                    </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title='Löschen' placement="bottom">
                          <IconButton variant="contained"  onClick={this.GruppeDeleteButtonClicked}><DeleteIcon /></IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
            </ListItem>
            <ListItem>
              <LoadingProgress show={loadingInProgress}/>
              <ContextErrorMessage error={error} contextErrorMsg = {'Diese Gruppe konnte nicht geladen werden'} onReload={this.getGruppe} />
            </ListItem>
            <Divider/>
            <GruppenForm show={showGruppenForm} Gruppe={Gruppe} onClose={this.GruppenFormClosed} getGruppe= {this.getGruppe}/>
            <GruppeDelete show={showGruppeDelete} Gruppe={Gruppe} onClose={this.GruppeDeleteClosed} getGruppe= {this.getGruppe}/>       
          </div>                        
        );
    }
}
// Proptypes 
GruppeEintrag.propTypes = {

  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}


export default withStyles(styles)(GruppeEintrag);
