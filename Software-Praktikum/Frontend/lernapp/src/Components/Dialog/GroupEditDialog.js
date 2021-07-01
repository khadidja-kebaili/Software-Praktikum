import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/styles';
import GroupBO from '../../API/GroupBO';
import LernappAPI from '../../API/LernappAPI';

class UserProfileDialog extends Component {
    constructor(props){
    super(props);

    let groupname = '', admin = '', description='', chatid = '';

    if (props.groups) {
      groupname= props.groups.getGroupname();
      admin = props.groups.getAdmin();
      description = props.groups.getDescription();
      chatid = props.groups.getChatid();
    }

    // Init the state
    this.state = {
      groupname: groupname,
      admin: admin,
      description: description,
      chatid: chatid
    };
    // save this state for canceling
    this.baseState = this.state;
  }


  updateGroup = () => {
    let updatedGroup = Object.assign(new GroupBO(), this.props.groups);
    console.log(updatedGroup)
    updatedGroup.setGroupname(this.state.groupname);
    updatedGroup.setAdmin(parseInt(this.state.admin));
    updatedGroup.setDescription(this.state.description);
    updatedGroup.setChatid(this.state.chatid)
    LernappAPI.getAPI().updateGroup(updatedGroup).then(group => {
    
      this.baseState.groupname = this.state.groupname;
      this.baseState.admin = this.state.admin;
      this.baseState.description = this.state.description;
      this.baseState.chatid = this.state.chatid
      this.props.onClose(updatedGroup);      // call the parent with the new customer
      console.log(updatedGroup)
    })}

handleChange = (e) =>{
   this.setState({ [e.target.name] : e.target.value });}

  handleClose = () => {
    this.props.onClose(null);
  }
  render() { 
      const { classes, show} = this.props 
    
    return ( 
        show ?
      
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogContent>
            <DialogTitle>
             <h2>Überarbeite dein Profil</h2>
            </DialogTitle>
            <form className={classes.root} noValidate autoComplete='off'>
                <div className={classes.Box}>
            <div  className={classes.Textfield}><TextField name="groupname"  label="Gruppenname" variant="outlined" value ={this.state.groupname} onChange={this.handleChange}/></div>
            <div  className={classes.Textfield}><TextField name="admin" label="Admin" variant="outlined" value ={this.state.admin} onChange={this.handleChange}/> </div>
            <div  className={classes.Textfield}><TextField name="description" label="Beschreibung" variant="outlined" value ={this.state.description} onChange={this.handleChange} /></div>
            </div>
            </form>
          </DialogContent>
          <DialogActions>
            <div className={classes.Button}>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" size="large" onClick={this.updateGroup} color='primary'>
              Bearbeiten
            </Button>
            </div>
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
        margin: "auto"
        },
        Box:{
            textAlign: "center"
        },
        Textfield:{
            marginBottom: "1ch",
            marginTop: "1ch",
           
        }, 
        Button:{
           margin: "auto"
        }
     
    });
export default withStyles(styles)(UserProfileDialog);


