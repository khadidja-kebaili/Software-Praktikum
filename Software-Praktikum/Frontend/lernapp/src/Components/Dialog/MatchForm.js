import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Icon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LernappAPI from '../../API/LernappAPI';
import ProfilBO from '../../API/ProfilBO';
import ContextErrorMessage from './Error_Message';
import Ladevorgang from './Ladevorgang';

class MatchForm extends Component {
    constructor(props){
        super(props);

        let fn='', ln='', id='';
        if(props.match){
            fn=props.match.getfirst_name();
            ln=props.match.getlast_name();
            id=props.match.getID();
        }
        this.state={
            first_name: fn,
            first_nameValidationFailed: false,
            first_nameEdited: false,
            last_name: ln,
            last_nameValidationFailed: false,
            last_nameEdited: false,
            id: id,
            idValidationFailed: false,
            
            
        };}
        //* Update the matches*/
        updateMatches = () => {
            let updateMatches = Object.assign(new ProfilBO(), this.props.matches);
            updateMatches.setfirst_name(this.state.first_name);
            updateMatches.setlast_name(this.state.last_name);
            upsateMatches.setID(this.state.id);
            LernappAPI.getAPI().updateMatches(updateMatches).then(matches => {
                this.setState({
                    updatingInProgress: false,
                    updatingError: null
                });
                this.baseState.first_name = this.state.first_name;
                this.baseState.last_name = this.state.last_name;
                this.baseState.id = this.state.id;
                this.props.onClose(updatedMatches);
                
            }).catch( e =>
                this.setState({
                    updatingInProgress: false,
                    updatingError: e
                })
                );
             //set loading to true
             this.setState({
                 updatingError: null,
                 updatingInProgress: true
             });

        }
    /** Handles value changes of the forms textfields and validates them */
    textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }
    /** Handles the close / cancel button click event */
    handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
    }
    // Render the component 
    render(){
        const {classes, match, show}=this.props;
        const{first_name, first_nameValidationFailed, first_nameEdited, last_name, last_nameValidationFailed, last_nameEdited, id, idValidationFailed, updatingInProgress, updatingError} = this.state;
    
        let title = '';
        let header='';

        if(match){
        // customer definiert, so ist an edit dialog
        title = 'Update a match';
        header = `Profil ID: ${match.getID()}`;
        }
        return(
       show ?
       <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
           <DialogTitle id='from-dialog-title'>{title}
                <IconButton className={classes.closeButton} onClick={this.handleClose}>
                    <CloseIcon/>
                </IconButton>
           </DialogTitle>
           <DialogContent>
               <DialogContentText>
                   {header}
               </DialogContentText>
               <form className={classes.root} noValidate autoComplete='off'>
                   <TextField autoFocus type='text'required fullWidth margin='normal' id='first_name' label='First name:' value={first_name} 
                    onChange={this.textFieldValueChange} error={first_nameValidationFailed} 
                    helperText={first_nameValidationFailed ? 'The first name must contain at least one character' : ' '}/>
                    <TextField type='text' required fullWidth margin='normal' id='last_name' label='Last name:' value={last_name}
                    onChange={this.textFieldValueChange} error={last_nameValidationFailed}
                    helperText={last_nameValidationFailed ? 'The last name must contain at least one character' : ' '} />
                    <TextField type='int' required fullWidth margin='normal' id='id' label='ID:' value={id}
                    onChange={this.textFieldValueChange} error={idValidationFailed}
                    helperText={idValidationFailed ? 'The ID must contain at least one character' : ' '} />  
               </form>
               <Ladevorgang show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of customer prop
              match ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The match ${match.getID()} could not be updated.`} onReload={this.updateMatch} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The match could not be added.`} onReload={this.addMatch} />
            }
            </DialogContent>          
            <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
            // If a customer is given, show an update button, else an add button
              match ?
              <Button disabled={first_nameValidationFailed || last_nameValidationFailed} variant='contained' onClick={this.updateCustomer} color='primary'>
                Update
            </Button>
              : <Button disabled={first_nameValidationFailed || !first_nameEdited || last_nameValidationFailed || !last_nameEdited} variant='contained' onClick={this.addCustomer} color='primary'>
                Add
            </Button>
            }
            </DialogActions>
       </Dialog>
       : null
        );
        }
    }
    

/** Component specific styles */
const styles = theme => ({
    root: {
      width: '100%',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  /** PropTypes */
  MatchForm.propTypes = {
    /** @ignore */
    classes: PropTypes.object.isRequired,
    /** The CustomerBO to be edited */
    match: PropTypes.object,
    /** If true, the form is rendered */
    show: PropTypes.bool.isRequired,
    /**  
     * Handler function which is called, when the dialog is closed.
     * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
     *  
     * Signature: onClose(CustomerBO customer);
     */
    onClose: PropTypes.func.isRequired,
  }
  
  export default withStyles(styles)(MatchForm);




