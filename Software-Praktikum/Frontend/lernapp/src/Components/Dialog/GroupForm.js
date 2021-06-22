
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import GroupBO from "../../API/GroupBO";


//Gruppe erstellen und bearbeiten 

class GroupForm extends Component {

    constructor(props){
        super(props);

        let    groupname ='', id = '', admin = '', member ='' , description =''; 
        
        
        
        this.state = {
            groupname:groupname,
            groupID: id,
            groupmember: member,
            admin: admin,
            description: description,
            groupnameEdited: false,
          };
          this.handleChange = this.handleChange.bind(this);
          this.baseState = this.state;}
         
         handleChange = (e) =>{
           this.setState({ [e.target.name] : e.target.value });}

      addGroup = () => {
        let newGroup = new GroupBO(
          this.state.groupname, 
          this.state.id, 
          this.state.member,
          this.state.admin,
          this.state.description);
         
          LernappAPI.getAPI().addGroup(newGroup).then(console.log(newGroup))
         
      }

      addMemberButtonClicked = (event) => {
        event.stopPropagation();
        this.setState({
          showAddMember: true
        });
      }

      

      render() { 
        let header = "";
        if (this.props.group){
          header = "hier kannst du deine Gruppe bearbeiten"
        } else{
          header = "Hier kannst du eine Gruppe erstellen und Mitglieder hinzufügen!"
        }
        return ( 
          <div>
          <div className="Gruppe">
            <h1>{header}</h1>
          </div>
              <form onSubmit={this.addGroup}>
              <div className="GroupForm">
                  <TextField name="groupname" fullWidth label="Gruppenname" variant="outlined" value ={this.state.groupname} onChange={this.handleChange}/>
                  <TextField name="groupname" fullWidth label="Beschreibung" multiline rows={6} defaultValue="Gruppenbeschreibung" variant="outlined"/>
              </div>
              </form>
                  <div className="Buttons">
                  {
                  this.props.group ?
                    <Button type="submit" variant="contained" color="primary" size="large" onClick={this.updateGroup} color='primary'>
                      Gruppe bearbeiten
                  </Button>
                    : <Button type="submit" variant="contained" color="primary" size="large" onClick={this.addGroup} color='primary'>
                      neue Gruppe erstellen
                 </Button>
                } <br></br>
                <Button type="submit" variant="contained" color="primary" size="large" onClick={this.addMemberButtonClicked} color='primary'>
                  Mitglieder Hinzufügen
                </Button>

                </div> 
                </div> 
       
          );
      }
    }
      
    
  export default GroupForm;
