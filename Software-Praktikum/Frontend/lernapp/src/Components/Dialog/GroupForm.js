
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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

      render() { 
        return (
          <div className="Gruppe">
              <h2>Gruppe</h2>
              <p>Gib hier bitte den Gruppenamen und ID der Gruppe an, die du bearbeiten möchtest</p>
              <div className="groupname"><TextField name="groupname" label="Name" variant="outlined" /></div>
              <div className="groupiD"><TextField name="groupid" label="ID" variant="outlined" /> </div>
          <Typography variant="h9" color="inherit" >
            Hier kannst du deine Gruppe bearbeiten oder eine neue Gruppe erstellen
          </Typography>
         
          <Button href="#" color="primary" variant="outlined">
            Gruppe bearbeiten 
          </Button> 
          <Button href="#" color="primary" variant="outlined">
            Eine neue Gruppe erstellen  
          </Button>
         
         </div>
        
        )}
    }
        
    
  export default GroupForm;
