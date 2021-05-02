import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Icon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { LernappAPI, ProfilBO } from '../../API';
import ContextErrorMessage from './Error_Message';
import Ladevorgang from './Ladevorgang';

class MatchForm extends Component {
    constructor(props){
        super(props);

        let fn='', ln='', id='';
        if(props.match){
            fn=props.match.getFirstName();
            ln=props.match.getLastName();
            id=props.match.getID();
        }
        this.state={
            firstName: fn,
            firstNameValidationFailed: false,
            firstNameEdited: false,
            lastName: ln,
            lastNameValidationFailed: false,
            lastNameEdited: false,
            id: id,
            idValidationFailed: false,
            addingInProgress: false,
            updatingInProgress: false,
            addingError: null,
            updatingError: null
            
        };}
        //* Update the matches*/
        updateMatches = () => {
            let updateMatches = Object.assign(new ProfilBO(), this.props.customer);
            updateMatches.setFirstName(this.state.firstName);
            updateMatches.setLastName(this.state.lastName);
            upsateMatches.setID(this.state.id);
            LernappAPI.getAPI().updateMatches(updateMatches).then(matches => {
                this.setState({
                    updatingInProgress: false,
                    updatingError: null
                });
                this.baseState.firstName = this.state.firstName;
                this.baseState.lastName = this.state.lastName;
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
        const{firstName, firstNameValidationFailed, firstNameEdited, lastName, lastNameValidationFailed, lastNameEdited, id, idValidationFailed, updatingInProgress, updatingError} = this.state;
    
        let title = '';
        let header='';

        if(match){
        // customer defindet, so ist an edit dialog
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
                   <TextField autoFocus type='text'required fullWidth margin='normal' id='firstName' label='First name:' value={firstName} 
                    onChange={this.textFieldValueChange} error={firstNameValidationFailed} 
                    helperText={firstNameValidationFailed ? 'The first name must contain at least one character' : ' '}/>
                    <TextField type='text' required fullWidth margin='normal' id='lastName' label='Last name:' value={lastName}
                    onChange={this.textFieldValueChange} error={lastNameValidationFailed}
                    helperText={lastNameValidationFailed ? 'The last name must contain at least one character' : ' '} />
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
              <Button disabled={firstNameValidationFailed || lastNameValidationFailed} variant='contained' onClick={this.updateCustomer} color='primary'>
                Update
            </Button>
              : <Button disabled={firstNameValidationFailed || !firstNameEdited || lastNameValidationFailed || !lastNameEdited} variant='contained' onClick={this.addCustomer} color='primary'>
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




