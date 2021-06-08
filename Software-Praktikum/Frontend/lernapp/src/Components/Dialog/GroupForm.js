import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import "./GroupForm.css";
import FormControl from '@material-ui/core/FormControl'; 
import Button from '@material-ui/core/Button';
import GroupBO from "../../API/GroupBO";
import LernappAPI from "../../API/LernappAPI"
import AddMember from "./AddMember.js"

class GroupForm extends Component {
  constructor(props){
  super(props);
  let gn = '', descr = ''
    
  // if (props.group){
  //   gn = props.group.getGroupname();
  //   descr = props.group.getDescription();
  // }

  this.state = { 
    groupname: gn,
    description: descr,
    showAddMember: false
   };
   this.handleChange = this.handleChange.bind(this);
   this.baseState = this.state;
  }
  handleChange = (e) =>{
    this.setState({ [e.target.name] : e.target.value });}


    
  addMemberButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showAddMember: true
    });
  }

  closeAddMemberDialog = () => {
    this.setState({
    showAddMember: false
  });
}

//  addGroup = () => {
//   let newGroup = new GroupBO(
//     this.state.groupname, 
//     this.state.description);
   
//     LernappAPI.getAPI().addProfile(newGroup).then(console.log(newGroup))
   
// }
// updateGroup = () => {
//   // clone the original cutomer, in case the backend call fails
//   let updatedGroup = Object.assign(new GroupBO(), this.props.group);
//   // set the new attributes from our dialog
//   updatedGroup.setGroupname(this.state.groupname);
//   updatedGroup.setDescription(this.state.description);
  
//   LernappAPI.getAPI().updateGroup(updatedGroup)
// }


  render() { 
    let header = "";
    if (this.props.group){
      header = "Überarbeite deine Gruppe!"
    } else{
      header = "Erstelle deine Gruppe und füge Mitglieder hinzu!"
    }
    return ( 
      <div>
      <div className="Überschrift">
        <h1>{header}</h1>
      </div>
          <form onSubmit={this.addGroup}>
          <div className="GroupForm">
              <TextField name="groupname" fullWidth label="Gruppenname" variant="outlined" value ={this.state.groupname} onChange={this.handleChange}/>
              <TextField name="groupname" fullWidth label="Beschreibung" multiline rows={6} defaultValue="Beschreibe hier die Inhalte der Gruppe :)" variant="outlined"/>
          </div>
          </form>
              <div className="Buttons">
              {
              this.props.group ?
                <Button type="submit" variant="contained" color="primary" size="large" onClick={this.updateGroup} color='primary'>
                  Bearbeiten
              </Button>
                : <Button type="submit" variant="contained" color="primary" size="large" onClick={this.addGroup} color='primary'>
                  Erstellen
             </Button>
            } <br></br>
            <Button type="submit" variant="contained" color="primary" size="large" onClick={this.addMemberButtonClicked} color='primary'>
              Mitglieder Hinzufügen
            </Button>
            <AddMember show={this.state.showAddMember} onClose={this.closeAddMemberDialog}/>
            </div> 
            </div> 
   
      );
  }
}

export default GroupForm;


