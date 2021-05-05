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
import GroupDelete from './dialogs/GroupDelete';
import GroupForm from './Components/GroupForm';


class GroupEntry extends Component {
    constructor(props){
        super(props);


        //leerer Status
        
        this.state = {
            showGroupForm: false,
            showGroupDelete: false,
            error: null,
            loadingInProgress: false,
        }

     
    // Gruppe bearbeiten
    editButtonClicked = event => {
      event.stopPropagation();
      this.setState({
        showGroupForm: true
      });
    }
    
    // wird aufgerufen, wenn Gruppe gelöscht werden soll
    GroupDeleteButtonClicked =  event => {
      event.stopPropagation();
      this.setState({
        showGroupDelete: true
      });
    }
    
    // wird aufgerufen, wenn DELETE Dialog Fenster geschloßen werden soll
    GroupDeleteClosed = () => {
        this.setState({
          showGroupDelete: false
        });
        this.getGroupe();


   // wird aufgerufen, wenn Dialog Fenster geschloßen werden soll
    GroupFormClosed = (Group) => {
      if (Group){
        this.setState({
          Group: Group,
          showGroupForm: false
        });
      }else {
        this.setState({
          showGroupForm: false
        });
      }
    }
}

 // API Anbindung um Die Gruppe vom Backend zu bekommen 
  getGroup = () => {
    this.props.getGroup();
  }
          // Die komponente wird gerendert 
    render()
        const {classes, Group} = this.props;
        const { showGroupForm, showGroupDelete,  error, loadingInProgress} = this.state;

        return(
          <div>
            <ListItem className={classes.root}>
                  <Grid container  alignItems="center" spacing={2}>
                    <Grid item>
                        <Typography >{Group.name}</Typography>
                    </Grid>
                    <Grid item xs/>
                    <Grid item>
                    <Tooltip title='Bearbeiten' placement="bottom">
                      <IconButton  className={classes.editButton} variant='contained' onClick={this.editButtonClicked}>
                          <EditIcon />
                      </IconButton>
                    </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title='Löschen' placement="bottom">
                          <IconButton variant="contained"  onClick={this.GroupDeleteButtonClicked}><DeleteIcon /></IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
            </ListItem>
            <ListItem>
              <LoadingProgress show={loadingInProgress}/>
              <ContextErrorMessage error={error} contextErrorMsg = {'Diese Gruppe konnte nicht geladen werden'} onReload={this.getGroup} />
            </ListItem>
            <Divider/>
            <GroupForm show={showGroupForm} Group={Group} onClose={this.GroupFormClosed} getGroup= {this.getGroup}/>
            <GroupDelete show={showGroupDelete} Group={Group} onClose={this.GroupDeleteClosed} getGroup= {this.getGroup}/>       
          </div>                        
        );
    }
}
// Proptypes 
GroupEntry.propTypes = {

  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}


export default withStyles(styles)(GroupEntry);
