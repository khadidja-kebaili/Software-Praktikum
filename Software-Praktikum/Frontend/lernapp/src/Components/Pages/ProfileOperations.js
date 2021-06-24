import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPi";
import "./ProfileOperations.css"
import DeleteProfile from '../Dialog/DeleteProfile';
import UserProfile from '../Dialog/UserprofileForm';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

class ProfileOperations extends Component {
  constructor(props){
  super(props);
  
  this.state = { 
    profile: null,
    showDeleteProfile: false,
   };
  }
  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    let data = 8;
    LernappAPI.getAPI().getProfile(data).then(profile =>
      this.setState({
        profile: profile,
      }))
  }

  deleteButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showDeleteProfile: true
    });
  }

  closeDeleteDialog = () => {
      this.setState({
      showDeleteProfile: false
    });
  }

 


  render() { 
    const { profile } = this.state;
    return ( 
      <div>
      <div className="Profil">
      <div className="Überschrift">
        <h1>Profil</h1>
      </div> 
      {
         profile ?
            <div>
              <div className="PersProfil">
                <h2 className="header">Persönliches Profil</h2>
                <h3>Name: {profile.getLastname()}</h3> 
                <h3>Vorname: {profile.getFirstname()}</h3>
                <h3>Alter: {profile.getAge()}</h3>
                <h3>Semester: {profile.getSemester()}</h3>
                <h3>Studiengang: {profile.getMajor()}</h3>
                <h3>Hobbies: {profile.getHobbys()}</h3>
                <h3>Interessen: {profile.getInterests()}</h3>
                <h3>Persönlichkeit: {profile.getPersonality()} </h3>
               </div>
              <div className="Lernprofil">
                <h2>Lernprofil</h2> 
                <h3>Lerntyp: {profile.getLearnstyle()}</h3> 
                <h3>Lernfrequenz: {profile.getStudyfrequence()} x in der Woche</h3>
                <h3>Lernzeitraum: {profile.getStudytime()}</h3>
                <h3>Lernort:  {profile.getStudyplace()}</h3>
                <h3>Berufserfahrung: {profile.getWorkexperience()}</h3>
               </div>
            </div>
            : null
        }
        <div className="DeleteButton">
          <div className="KontoLöschen"><Button variant="contained" color="primary" size="large" onClick={this.deleteButtonClicked}> Profil Löschen</Button></div>
        <DeleteProfile show={this.state.showDeleteProfile} profile={profile} onClose={this.closeDeleteDialog}/>
        </div>
       </div>
       <div className="Buttons">
       <Router>
         <Link to="/updateprofile">
       <div className="Bearbeiten"><Button variant="contained" color="primary" size="large"> Bearbeiten</Button></div>
        </Link>
        <Switch>
        <Route path='/updateprofile'>
					<UserProfile profile={profile}/>
			  </Route>
        </Switch>
        </Router>
            
      </div>
      
      </div>
   
      );
  }
}

export default ProfileOperations;
