import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPi";
import "./GroupOperations.css"
import AddMember from '../Dialog/AddMember';
import GroupForm from '../Dialog/GroupForm';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

class GroupOperations extends Component {
  constructor(props){
  super(props);
  
  this.state = { 
    group: null,
    showAddMember: false,
   };
  }
  componentDidMount() {
    this.getGroup();
  }

  getGroup = () => {
    let data = 2;
    LernappAPI.getAPI().getGroup(data).then(group =>
      this.setState({
        group: group,
      }))
  }

  addButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showAddMember: true
    });
  }

  closeDeleteDialog = () => {
      this.setState({
      showAddMember: false
    });
  }

 


  render() { 
    const { group} = this.state;
    return ( 
      <div>
      <div className="Group">
      <div className="Überschrift">
        <h1>Gruppe</h1>
      </div> 
      {
         group ?
            <div>
              <div className="Groupprofile">
                <h2 className="header">Gruppen</h2>
                <h3>Gruppenname: {group.getGroupname()}</h3> 
                <h3>Beschreibung: {group.getFirstname()}</h3>
               </div>
            </div>
            : null
        }
        <div className="AddMemberButton">
          <div className="AddMember"><Button variant="contained" color="primary" size="large" onClick={this.addButtonClicked}> Mitglied Hinzufügen</Button></div>
        <AddMember show={this.state.showAddMember} group={group} onClose={this.closeDeleteDialog}/>
        </div>
       </div>
       <div className="Buttons">
       <Router>
         <Link to="/updategroup">
       <div className="Bearbeiten"><Button variant="contained" color="primary" size="large"> Bearbeiten</Button></div>
        </Link>
        <Switch>
        <Route path='/updategroup'>
					<GroupForm group={group}/>
			  </Route>
        </Switch>
        </Router>
            
      </div>
      
      </div>
   
      );
  }
}

export default GroupOperations;
