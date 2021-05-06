import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
//Hier kommt API
import {LernappAPI} from '../../../../lernapp/src/API/LernappAPI';
import Error_Message from '../Dialog/Error_Message';
import Ladevorgang from '../Dialog/Ladevorgang';

/** Zeigt einen modalen Lösch- / Abbruchdialog an, in dem Sie zum Löschen eines Kunden aufgefordert werden. Das zu löschende CustomerBO muss im Requisiten-Kunden angegeben werden.
  * In Abhängigkeit von der Benutzerinteraktion (Löschen / Abbrechen) erfolgt der jeweilige Backendcall. Danach wird die Funktion der onClose-Stütze
  * wird mit dem gelöschten CustomerBO-Objekt als Parameter aufgerufen. Wenn der Dialog abgebrochen wird, wird onClose mit null aufgerufen. 
  * */
 
//Brauchen wir nicht, da der User die Matches nicht löschen kann.

