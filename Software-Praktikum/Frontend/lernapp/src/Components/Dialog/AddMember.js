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
import ChataccessBO from '../../API/ChatAccessBO';


class AddMember extends Component {

  initialState = {
    // TextField values
    memberName: '',
    targetMember: [],
    selectedMember: null,
    chattype: "",
    room: null,
    profilID: null,


  };

  constructor(props) {
    super(props);

    // Init the state
    this.state = this.initialState;
  }

  /** Searches for members with a memberName and loads the corresponding accounts */
  searchMember = async () => {
    const { memberName } = this.state;
    if (memberName.length > 0) {
      try {
        // Load members first
        const member = await LernappAPI.getAPI().searchMember(memberName);

        let selectedMember = null;

        if (member.length > 0) {
          selectedMember = member[0];
        }
        // Set the final state
        this.setState({
          targetMember: member,
          selectedMember: selectedMember,
        });
      } catch (e) {
        this.setState({
          targetMember: [],              // Set empty array
          selectedMember: null,
        });
        console.log(this.state.targetMember)
      }
    }
  }


  addMember = () => {
      let newChataccess = new ChataccessBO(
        this.state.selectedMember.getID(),
        this.props.groups.getID()
      )
      LernappAPI.getAPI().addMember(newChataccess).then(console.log(newChataccess))
    }

  /** Handles value changes of the forms textfields and validates the transferAmout field */
  textFieldValueChange = (event) => {
    const val = event.target.value;
    this.setState({
      [event.target.id]: val
    });
  }

  /** Handles value changes of the member select textfield */
 memberSelectionChange = (event) => {
    this.setState({
      selectedMember: event.target.value,
    });
  }


  /** Renders the component */
  render() {
    const {show} = this.props;
    const {targetMember, selectedMember} = this.state;

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
                  <TextField select autoFocus fullWidth margin='normal' type='text' required id='memberName' label='Member name:'
                  value={selectedMember}
                  onChange={this.memberSelectionChange}>
                  {
                    this.state.targetMember.map((member) => (
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
            <Button onClick={this.props.onClose} color='secondary'>
              Cancel
            </Button>
            <Button disabled={!selectedMember} onClick={this.addMember} variant='contained' color='primary'>
             Hinzufügen
            </Button>
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

export default AddMember;
