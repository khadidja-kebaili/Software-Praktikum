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
      showGruppeForm: true
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

//Suche leeren
clearFilterFieldButtonClicked = () => {
    this.setState({
        filteredGruppe: [...this.state.Gruppe],
        GruppeFilter: ''
    });
}}
