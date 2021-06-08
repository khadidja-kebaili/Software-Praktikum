import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {IconButton, TextField, Typography, InputAdornment, MenuItem, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';


class AddMember extends Component {

  initialState = {
    // TextField values
    memberName: '',
    targetMembers: [],
    selectedMember: null,
    transferAmountValidationFailed: false,
    transferAmountFieldEdited: false,
    // Network states
    
  };

  constructor(props) {
    super(props);

    // Init the state
    this.state = this.initialState;
  }

  /** Searches for customers with a customerName and loads the corresponding accounts */
  searchMember = async () => {
    const { memberName } = this.state;
    if (memberName.length > 0) {
      try {
        // set loading to true
        this.setState({
          targetMember: [],              // Set empty array
          selectedMember: null,               // the initial customer

        });

        // Load customers first
        const members = await LernappAPI.getAPI().searchMember(memberName);

 
        let selectedMember = null;

        if (members.length > 0) {
          selectedMember = members[0];
        }
        // Set the final state
        this.setState({
          targetMembers: members,
          selectedMember: selectedMember,
        });
      } catch (e) {
        this.setState({
          targetMembers: [],              // Set empty array
          selectedMember: null,
        });
      }
    }
  }

  


  /** Handles value changes of the forms textfields and validates the transferAmout field */
  textFieldValueChange = (event) => {
    const val = event.target.value;
    // Validate the amount field
    if (event.target.id === 'transferAmount') {
      let result = false;
      let amount = val.replace(/,/g, '.');
      if (amount.length === 0) {
        // length must not be 0
        result = true;
      }
      if (isNaN(amount)) {
        // Its not a numer in the text field
        result = true;
      }
      this.setState({
        transferAmountValidationFailed: result,
        transferAmountFieldEdited: true
      });
    }
    this.setState({
      [event.target.id]: val
    });
  }

  /** Handles value changes of the customer select textfield */
  memberSelectionChange = (event) => {
    let member = event.target.value;
    this.setState({
      selectedMember: member,
    });
  }


  /** Renders the component */
  render() {
    const {show, member} = this.props;
    const { memberName, targetMembers, selectedMember, } = this.state;

    return (
      show ?
        <Dialog open={this.props.show}  maxWidth='md'>
          <DialogTitle id='form-dialog-title'>Füge Mitglieder hinzu
          </DialogTitle>
          <DialogContent>
            <form noValidate autoComplete='off'>
              {
                // show a search text field if there are no searchedCustomer yet
                (targetMembers.length === 0) ?
                  <TextField autoFocus fullWidth margin='normal' type='text' required id='memberName' label='Member name:'
                    onChange={this.textFieldValueChange}
                    onBlur={this.searchMember}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>
                        <IconButton onClick={this.searchMember}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>,
                    }} />
                  :
                  // Show a selection of targetCustomers, if there are any. Provide no search button. 
                  <TextField select autoFocus fullWidth margin='normal' type='text' required id='memberName' label='Member name:'
                    value={selectedMember}
                    onChange={this.memberSelectionChange}>
                    {
                      this.state.targetMembers.map((member) => (
                        <MenuItem key={member.getID()} value={member}>
                          {member.getLastName()}, {member.getFirstName()}
                        </MenuItem>
                      ))
                    }
                  </TextField>
              }
            </form>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color='secondary'>
              Cancel
            </Button>
            <Button disabled={!selectedMember} variant='contained' color='primary'>
             Hinzufügen
            </Button>
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

export default AddMember;
