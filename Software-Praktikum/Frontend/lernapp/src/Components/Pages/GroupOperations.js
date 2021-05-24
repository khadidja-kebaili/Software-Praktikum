import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import "./GroupOperations.css"
//import LernappAPI from "../../API/LernappAPI";

//import GroupDelete from '../Dialog/GroupDelete';
//import GroupForm from '../Dialog/GroupForm';


class GroupOperations extends Component {
  constructor(props){
  super(props);
  
  this.state = { 
    profile: null,
    showGroupDelete: false,
    filteredGroup: [],
    GroupFilter: '',
    showGroupForm: false,
   };
  }
  
  render() { 
    return ( 
      <div>
      <div className="Gruppe">
      <div className="Überschrift">
        <h1>Gruppe</h1>
      </div> 
      </div>
      <div>
        <div className="Gruppeninfo">
          <h2 className="header">Ihre Gruppe</h2> 
          <div className= "Suche"><TextField className= "Filter" type='text' label='Gruppesuchen'> Suche </TextField></div>
           <h3 >Name: </h3> 
            <h3>Mitglieder: </h3>
            <h3>Beschreibung: </h3>
            </div>
            </div>
            <div className="GruppeLöschen"><Button variant="contained" color="primary" size="large"> Löschen </Button></div>
           <br/>
            <div className="Gruppebearbeiten"><Button variant="contained" color="primary" size="large"> Bearbeiten </Button></div>
            </div> 
    );
  }
}
      
   

export default GroupOperations;