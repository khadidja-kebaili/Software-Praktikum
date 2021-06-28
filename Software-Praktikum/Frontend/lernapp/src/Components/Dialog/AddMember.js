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
import ChataccessBO from '../../API/ChataccessBO';


class AddMember extends Component {

  initialState = {
    // TextField values

  };

  constructor(props) {
    super(props);

    // Init the state
    // this.state = this.initialState;
  }

  handleClose = (addmember) => {
    // Reset the state
    // this.setState(this.initialState);
    this.props.onClose(addmember);
  }


  /** Renders the component */
  render() {
    const {show, targetMember, selectedMember} = this.props;
    

    return (
      show ?
        <Dialog open={this.props.show}  maxWidth='md'>
          <DialogTitle id='form-dialog-title'>Füge Mitglieder hinzu
          </DialogTitle>
          <DialogContent>
            <form>
              { 
                // show a search text field if there are no searchedmember yet
                (targetMember.length === 0) ?
                  <TextField autoFocus fullWidth margin='normal' type='text' required id='memberName' label='Member name:'
                    onChange={this.props.textFieldValueChange}
                    onBlur={this.props.searchMember}
                    InputProps={{
                      endAdornment: <InputAdornment position='end'>
                        <IconButton onClick={this.props.searchMember}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>,
                    }} />
                  :
                  <TextField select autoFocus fullWidth margin='normal' type='text' required id='memberName' label='Member name:'
                  value={this.props.selectedMember}
                  onChange={this.props.memberSelectionChange}>
                  {
                    this.props.targetMember.map((member) => (
                      <MenuItem key={member.getID()} value={member}>
                        {member.getLastname()}, {member.getFirstname()}
                      </MenuItem>
                    ))
                  }
                </TextField>
  }
            </form>

          </DialogContent>
          <DialogActions>
            <Button  onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button disabled={!selectedMember} onClick={this.props.addMember} variant='contained' color='primary'>
             Hinzufügen
            </Button>
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

export default AddMember;
