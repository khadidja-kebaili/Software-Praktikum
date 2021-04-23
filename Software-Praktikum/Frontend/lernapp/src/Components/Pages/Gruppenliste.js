import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, IconButton, InputAdornment, TextField,  Paper , Grid} from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from 'react-router-dom';
import { ElectivAPI } from '../api';
import ClearIcon from '@material-ui/icons/Clear';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import List from '@material-ui/core/List';

import GruppenEintrag from "./Components/GruppeEintrag.js";
import GruppenForm from "./Pages/GruppeForm.js"; 

//Der Admin ist der einzige mit berechtigung-- zum löschen und hinzufügen 
//import Gruppeneintrag from './GruppenListeEintrag';
//import GruppenForm from './/GruppenForm';


class GruppenListe extends Component {

  constructor(props) {
    super(props);

    //gebe einen leeren status
    this.state = {
        Grupppe: [],
        filteredGruppe: [],
        GruppeFilter: '',
        showGruppeForm: false,
        showDeleteForm: false,
        error: null,
        loadingInProgress: false,
    };
  }

  //Button um eine neue Gruppe anzulegen. Damit öffnet sich das Dialog Fenster
  addButtonClicked = event => {
    event.stopPropagation();
    this.setState({
      showGruppenForm: true
    });
  }

  //Suche-Funktion zum Suchen von Gruppen
  filterFieldValueChange= event => {
    const value = event.target.value.toLowerCase();
    this.setState({
        filteredGruppe: this.state.Gruppe.filter(Gruppe => {
            let nameContainsValue = semester.getname().toLowerCase().includes(value);
            return nameContainsValue;
        }),
        GruppeFilter: value
    });
}

// Die Suche leeren
clearFilterFieldButtonClicked = () => {
    this.setState({
        filteredGruppe: [...this.state.Gruppe],
        GruppeFilter: ''
    });

}}
//wird aufgerufen, wenn das Dialog Fenster geschloßen wird

GruppenFormClosed = Gruppe => {
  if (Gruppe) {
    const newGruppenrList = [...this.state.Gruppe, Gruppe];
    this.setState({
      Gruppe: newGruppenList,
      filteredGruppe: [...newGruppenList],
      showGruppenForm: false
    });
  } else {
    this.setState({
      showGruppenForm: false
    });
  }
}

 // API Anbindung um alle User vom Backend zu bekommen 
 getGruppe = () => {
  ElectivAPI.getAPI().getGruppe()
  .then(GruppeBOs =>
      this.setState({
          Gruppe: GruppeBOs,
          filteredGruppe: [...GruppeBOs],
          error: null,
          loadingInProgress: false,
      })).catch(e =>
          this.setState({
              Gruppe: [],
              filteredGruppe: [],
              error: e,
              loadingInProgress: false,
          }));
  this.setState({
      error: null,
      loadingInProgress: true,
  });
}


// Die Lifecycle methode, wird erst aufgerufen, wenn eine Komponente in den DOM eingesetzt wird
componentDidMount() 
    this.getGruppe();


//Componente wird gerendert

render() 
  const { classes } = this.props;
  const {  loadingInProgress, error, GruppeFilter, filteredGruppe, showGruppenForm} = this.state;

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="center">
          <Grid item >
          <TextField
              className={classes.filter}
              type='text'
              label='Gruppe suchen'
              value={GruppeFilter}
              onChange={this.filterFieldValueChange}
              InputProps={{
                  endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                      <ClearIcon fontSize="small"/>
                  </IconButton>
                  </InputAdornment>,
              }}
          />
          </Grid>
          <Grid item xs/>
          <Grid item>
              <Tooltip title='eine Gruppe erstellen' placement="left">
                  <Fab size="medium"  className={classes.addButton} color="primary" aria-label="add" onClick={this.addButtonClicked}>
                      <AddIcon />
                  </Fab>
              </Tooltip>
          </Grid>
      </Grid>
      <Paper>
          <List className={classes.root} dense>
              {
              filteredGruppe.map(Gruppe => 
                  <GruppenEintrag key={Gruppe.getID()} Gruppe = {Gruppe} show={this.props.show} getGruppe={this.getGruppe}/>)
              }
          </List>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`Es konnte keine Gruppe geladen werden.`} onReload={this.getGruppe} />
      </Paper>
      <GruppenForm show={showGruppenForm} onClose={this.GrupenFormClosed} getGruppe= {this.getGruppe}/>
    </div>
  );


