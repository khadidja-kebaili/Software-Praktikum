import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import "./ProfileOperations.css"
import DeleteProfile from '../Dialog/DeleteProfile';
import UserProfileDialog from '../Dialog/UserProfileDialog';
import ProfileBO from '../../API/ProfileBO';

class ProfileOperations extends Component {
  constructor(props){
   super(props);
    let fn = '', ln = '',  sem='', maj='', hob='', int = '',
          pers='', lerns='', studyt='', studyp='', studyf = '', work='', age= 0;

  this.state = { 
      profile: null,
      showDeleteProfile: false,
      showEditProfile: false,
      last_name: ln,
      first_name: fn,
      age: age,
      semester: sem,
      major: maj,
      hobbys: hob,
      interests: int,
      personality: pers,
      learnstyle: lerns,
      studytime: studyt,
      studyplace: studyp,
      studyfrequence: studyf,
      workexperience: work,
      // users:[]
   };
   this.baseState = this.state;
  }
  componentDidMount() {
    this.getProfile();
  }


  // doesProfileExist(){
  //   if (LernappAPI.getAPI().getProfile(this.props.currentUser.getID())) {
  //     this.getProfile()
  //     //sollte umbenannt werden sonst kommt es zur Verwirrung zu getProfiles oder so
  //   } else {
  //     let newProfile = new ProfileBO(
  //       this.state.currentUser.getID(),
  //       this.state.last_name,
  //       this.state.first_name,
  //       this.state.age,
  //       this.state.semester,
  //       this.state.major,
  //       this.state.hobbys,
  //       this.state.interests,
  //       this.state.personality,
  //       this.state.learnstyle,
  //       this.state.studytime,
  //       this.state.studyplace,
  //       this.state.studyfrequence,
  //       this.state.workexperience);
  //     LernappAPI.getAPI().addProfile(newProfile)
  //   }
  // }


  handleChange = (e) =>{
    this.setState({ [e.target.name] : e.target.value });}

  getProfile = () => {
    let data = 1;
    LernappAPI.getAPI().getProfile(data).then(profile =>
      this.setState({
        profile: profile,
        last_name: profile.getLastname(),
        first_name: profile.getFirstname(),
        age: profile.getAge(),
        semester: profile.getSemester(),
        major: profile.getMajor(),
        hobbys:  profile.getHobbys(),
        interests: profile.getInterests(),
        personality: profile.getPersonality(),
        learnstyle:  profile.getLearnstyle(),
        studytime: profile.getStudytime(),
        studyplace: profile.getStudyplace(),
        studyfrequence: profile.getStudyfrequence(),
        workexperience: profile.getWorkexperience(),
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

  editButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showEditProfile: true
    });
  }

closeEditDialog = (profile) => {
  if (profile) {
    this.setState({
      profile: profile,
      showEditProfile: false
    });
  } else {
    this.setState({
      showEditProfile: false
    });
  }
}



updateProfile = () => {
  // clone the original cutomer, in case the backend call fails
  let updatedProfile = Object.assign(new ProfileBO(), this.state.profile);
  // set the new attributes from our dialog
  updatedProfile.setLastname(this.state.last_name);
  updatedProfile.setFirstname(this.state.first_name);
  updatedProfile.setAge(parseInt(this.state.age));
  updatedProfile.setSemester(this.state.semester);
  updatedProfile.setMajor(this.state.major);
  updatedProfile.setHobbys(this.state.hobbys);
  updatedProfile.setInterests(this.state.interests);
  updatedProfile.setPersonality(this.state.personality);
  updatedProfile.setLearnstyle(this.state.learnstyle);
  updatedProfile.setStudytime(this.state.studytime); 
  updatedProfile.setStudyplace(this.state.studyplace);
  updatedProfile.setStudyfrequence(this.state.studyfrequence);
  updatedProfile.setWorkexperience(this.state.workexperience);

  LernappAPI.getAPI().updateProfile(updatedProfile).then(console.log(updatedProfile)).then(profil => {
    // keep the new state as base state
    this.baseState.first_name = this.state.first_name;
    this.baseState.last_name = this.state.last_name;
    this.baseState.age =  this.state.age;
    this.baseState.semester =  this.state.semester ;
    this.baseState.major = this.state.major;
    this.baseState.hobbys = this.state.hobbys;
    this.baseState.interests =  this.state.interests;
    this.baseState.personality = this.state.personality ;
    this.baseState.learnstyle =  this.state.learnstyle;
    this.baseState.studytime = this.state.studytime;
    this.baseState.studyplace = this.state.studyplace;
    this.baseState.studyfrequence =  this.state.studyfrequence;
    this.baseState.workexperience = this.state.workexperience;
    this.closeEditDialog(updatedProfile)
      // call the parent with the new customer
  });
}


  render() { 
    const { profile, last_name, first_name, age, semester, major, hobbys, interests, personality, learnstyle, studytime, studyplace, studyfrequence, workexperience} = this.state;
    return ( 
      <div>
      <div className="Profil">
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
       <div className="Bearbeiten"><Button variant="contained" color="primary" size="large" onClick={this.editButtonClicked}> Bearbeiten</Button></div>
					<UserProfileDialog onClose={this.closeEditDialog} show={this.state.showEditProfile} profile={profile} last_name={last_name} first_name={first_name} age = {age} semester ={semester}
          major={major} hobbys={hobbys} interests={interests} personality={personality}
          learnstyle={learnstyle}
          studytime={studytime}
          studyplace={studyplace}
          studyfrequence={studyfrequence}
          workexperience={workexperience} handleChange={this.handleChange} updateProfile={this.updateProfile}/>
      </div>
      </div>
   
      );
  }
}

export default ProfileOperations;
