// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Icon } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
// import LernappAPI from '../../API/LernappAPI';
// import ProfileBOs from '../../API/ProfileBO';
// import ContextErrorMessage from './Error_Message';
// import LoadingProcess from './LoadingProcess';

// class MatchForm extends Component {
//     constructor(props){
//         super(props);

//         let fn='', ln='', id='';
//         if(props.profile){
//             fn=props.profile.getFirstname();
//             ln=props.profile.getLastname();
            
            
//         }
//         this.state={
//             first_name: fn,
//             last_name: ln,
            
            
            
//         };}
    
    
//     /** Handles value changes of the forms textfields and validates them */
//   //   textFieldValueChange = (event) => {
//   //   const value = event.target.value;

//   //   let error = false;
//   //   if (value.trim().length === 0) {
//   //     error = true;
//   //   }

//   //   this.setState({
//   //     [event.target.id]: event.target.value,
//   //     [event.target.id + 'ValidationFailed']: error,
//   //     [event.target.id + 'Edited']: true
//   //   });
//   // }
//     /** Handles the close / cancel button click event */
//     handleClose = () => {
//     // Reset the state
//     this.setState(this.baseState);
//     this.props.onClose(null);
//     }
//     // Render the component 
//     render(){
//         const {classes, profile, show}=this.props;
//         const{first_name, 
//           // first_nameValidationFailed, first_nameEdited, 
//           last_name, 
//           // last_nameValidationFailed, last_nameEdited
//         }=this.props;
//         let title = 'test';
//         let header='test2';

//         if(profile){
//         // customer definiert, so ist an edit dialog
//         title = 'Blu Blu';
//         header = `Profil ID: ${profile.getID()}`;
//         } else {
//         title='Bla Bla'
//         }
//         return(
//        show ?
//        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
//            <DialogTitle id='from-dialog-title'>{title}
//                 <IconButton className={classes.closeButton} onClick={this.handleClose}>
//                     <CloseIcon/>
//                 </IconButton>
//            </DialogTitle>
//            <DialogContent>
//                <DialogContentText>
//                    {header}
//                </DialogContentText>
//                <form className={classes.root} noValidate autoComplete='off'>
//                    <TextField autoFocus type='text'required fullWidth margin='normal' id='first_name' label='Vorname:' value={first_name} 
//                     onChange={this.textFieldValueChange} 
//                     // error={first_nameValidationFailed} 
//                     // helperText={first_nameValidationFailed ? 'The first name must contain at least one character' : ' '}
//                     />
//                     <TextField type='text' required fullWidth margin='normal' id='last_name' label='Name:' value={last_name}
//                     onChange={this.textFieldValueChange} 
//                     // error={last_nameValidationFailed}
//                     // helperText={last_nameValidationFailed ? 'The last name must contain at least one character' : ' '}
//                      />
//                     {/* <TextField type='int' required fullWidth margin='normal' id='id' label='ID:' value={id}
//                     onChange={this.textFieldValueChange} error={idValidationFailed}
//                     helperText={idValidationFailed ? 'The ID must contain at least one character' : ' '} />   */}
//                </form>
//                <LoadingProcess/>
//             {/* {
//               // Show error message in dependency of customer prop
//                 profile ?
//                 <ContextErrorMessage contextErrorMsg={`The profile ${profile.getID()} could not be updated.`} onReload={this.updateprofile} />
//                 :
//                 <ContextErrorMessage  contextErrorMsg={`The profile could not be added.`} onReload={this.addprofile} />
//             } */}
//             </DialogContent>          
//             <DialogActions>
//             <Button onClick={this.handleClose} color='secondary'>
//               Cancel
//             </Button>
//             </DialogActions>
//        </Dialog>
//        : null
//         );
//         }
//     }
    

// /** Component specific styles */
// const styles = theme => ({
//     root: {
//       width: '100%',
//     },
//     closeButton: {
//       position: 'absolute',
//       right: theme.spacing(1),
//       top: theme.spacing(1),
//       color: theme.palette.grey[500],
//     },
//   });
  
//   /** PropTypes */
//   MatchForm.propTypes = {
//     /** @ignore */
//     classes: PropTypes.object.isRequired,
//     /** The CustomerBO to be edited */
//     profile: PropTypes.object,
//     /** If true, the form is rendered */
//     show: PropTypes.bool.isRequired,
//     /**  
//      * Handler function which is called, when the dialog is closed.
//      * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
//      *  
//      * Signature: onClose(CustomerBO customer);
//      */
//     onClose: PropTypes.func.isRequired,
//   }
  
//   export default withStyles(styles)(MatchForm);




