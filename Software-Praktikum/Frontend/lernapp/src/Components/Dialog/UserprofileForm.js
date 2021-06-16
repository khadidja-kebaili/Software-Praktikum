import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import "./UserprofileForm.css"
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';
import ProfileBO from "../../API/ProfileBO";
import LernappAPI from "../../API/LernappAPI"

class UserProfile extends Component {
  constructor(props){
  super(props);
  let fn = '', ln = '', age='', sem='', maj='', hob='', int = '',
      pers='', lerns='', studyt='', studyp='', studyf = '', work='';
    
  if (props.profile){
    ln = props.profile.getLastname();
    fn = props.profile.getFirstname();
    age = props.profile.getAge();
    sem = props.profile.getSemester();
    maj = props.profile.getMajor();
    hob = props.profile.getHobbys();
    int = props.profile.getInterests();
    pers = props.profile.getPersonality();
    lerns = props.profile.getLearnstyle();
    studyt = props.profile.getStudytime();
    studyp = props.profile.getStudyplace();
    studyf = props.profile.getStudyfrequence();
    work = props.profile.getWorkexperience();
  }

  this.state = { 
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
   };
   this.handleChange = this.handleChange.bind(this);
   this.baseState = this.state;
  }
  handleChange = (e) =>{
    this.setState({ [e.target.name] : e.target.value });}


 addProfile = () => {
  let newProfile = new ProfileBO(
    this.state.first_name, 
    this.state.last_name, 
    this.state.age,
    this.state.semester,
    this.state.major,
    this.state.hobbys,
    this.state.interests,
    this.state.personality,
    this.state.learnstyle,
    this.state.studytime,
    this.state.studyplace,
    this.state.studyfrequence,
    this.state.workexperience);
   
    LernappAPI.getAPI().addProfile(newProfile).then(console.log(newProfile))
   
}
updateProfile = () => {
  // clone the original cutomer, in case the backend call fails
  let updatedProfile = Object.assign(new ProfileBO(), this.props.profile);
  // set the new attributes from our dialog
  updatedProfile.setLastname(this.state.last_name);
  updatedProfile.setFirstname(this.state.first_name);
  updatedProfile.setAge(this.state.age);
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
  
  LernappAPI.getAPI().updateProfile(updatedProfile)
  // .then(profil => {
  //   // keep the new state as base state
  //   this.baseState.firstName = this.state.firstName;
  //   this.baseState.Lastnam = this.state.Lastnam;
  //   this.baseState.name = this.state.name;
  //   this.baseState.Firstname =  this.state.Firstname;
  //   this.baseState.Age =  this.state.Age;
  //   this.baseState.semester =  this.state.semester ;
  //   this.baseState.Major = this.state.Major;
  //   this.baseState.Hobbys = this.state.Hobbys;
  //   this.baseState.Interests =  this.state.Interests;
  //   this.baseState.Personality = this.state.Personality ;
  //   this.baseState.Learnstyle =  this.state.Learnstyle;
  //   this.baseState.Studytime = this.state.Studytime;
  //   this.baseState.Studyplace = this.state.Studyplace;
  //   this.baseState.Studyfrequence =  this.state.Studyfrequence;
  //   this.baseState.Workexperience = this.state.Workexperience;
  //   this.props.onClose(updatedProfil);      // call the parent with the new customer
  // });
}


  render() { 
    let header = "";
    if (this.props.profile){
      header = "Überarbeite dein Profil!"
    } else{
      header = "Erstelle dein Profil und finde deine Lerngruppe!"
    }
    return ( 
      <div>
      <div className="Überschrift">
        <h1>{header}</h1>
      </div>
          <form onSubmit={this.addProfile}>
          <div className="PersProfil"> 
              <div className="Name"><TextField name="last_name" label="Name" variant="outlined" value ={this.state.last_name} onChange={this.handleChange}/></div>
              <div className="Firstname"><TextField name="first_name" label="Vorname" variant="outlined" value ={this.state.first_name} onChange={this.handleChange}/> </div>
              <div className="Age"> <TextField name="age" label="Alter" variant="outlined" value ={this.state.age} onChange={this.handleChange}/> </div>
              <FormControl className="Semester">
              <InputLabel id="label"> &nbsp; Semester</InputLabel>
              <Select
                    labelId="label" id="select"
                    name="semester" variant="outlined" value={this.state.semester} 
                    onChange={this.handleChange}>
                    <MenuItem value={1}>1.</MenuItem> 
                    <MenuItem value={2}>2.</MenuItem>
                    <MenuItem value={3}>3.</MenuItem>
                    <MenuItem value={4}>4.</MenuItem>
                    <MenuItem value={5}>5.</MenuItem>
                    <MenuItem value={6}>6.</MenuItem>
                    <MenuItem value={7}>7.</MenuItem>
              </Select>
              </FormControl>
              <FormControl className="Major">
              <InputLabel id="label"> &nbsp; Studiengang</InputLabel>
              <Select
                    labelId="label" id="select"
                    name="major" variant="outlined" value={this.state.major} 
                    onChange={this.handleChange}>
                    <MenuItem value={"AM3"}>AM3</MenuItem> 
                    <MenuItem value={"AM7"}>AM7</MenuItem>
                    <MenuItem value={"BI5"}>BI5</MenuItem>
                    <MenuItem value={"BI7"}>BI7</MenuItem>
                    <MenuItem value={"BM5"}>BM5</MenuItem>
                    <MenuItem value={"CP3"}>CP3</MenuItem>
                    <MenuItem value={"CR7"}>CR7</MenuItem>
                    <MenuItem value={"CS3"}>CS3</MenuItem>
                    <MenuItem value={"ID7"}>ID7</MenuItem>
                    <MenuItem value={"IP7"}>IP7</MenuItem>
                    <MenuItem value={"ME7"}>ME7</MenuItem>
                    <MenuItem value={"MI7"}>MI7</MenuItem>
                    <MenuItem value={"MM3"}>MM3</MenuItem>
                    <MenuItem value={"MM7"}>MM7</MenuItem>
                    <MenuItem value={"MP7"}>MP7</MenuItem>
                    <MenuItem value={"MR3"}>MR3</MenuItem>
                    <MenuItem value={"MW7"}>MW7</MenuItem>
                    <MenuItem value={"OM7"}>OM7</MenuItem>
                    <MenuItem value={"PD3"}>PD3</MenuItem>
                    <MenuItem value={"CR7"}>CR7</MenuItem>
                    <MenuItem value={"PM7"}>PM7</MenuItem>
                    <MenuItem value={"PT7"}>PT7</MenuItem>
                    <MenuItem value={"UK3"}>UK3</MenuItem>
                    <MenuItem value={"CR7"}>CR7</MenuItem>
                    <MenuItem value={"VT7"}>VT7</MenuItem>
                    <MenuItem value={"CR7"}>CR7</MenuItem>
                    <MenuItem value={"WI3"}>WI3</MenuItem>
                    <MenuItem value={"WI7"}>WI7</MenuItem>
                    <MenuItem value={"WM7"}>WM7</MenuItem>
              </Select>
              </FormControl>
              <div className="Hobbys"><TextField name="hobbys" label="Hobbies" variant="outlined"value ={this.state.hobbys} onChange={this.handleChange}/></div>
              <div className="Interests"><TextField name="interests" label="Interessen" variant="outlined" value ={this.state.interests} onChange={this.handleChange}/></div>
              <div className="radio">
              <FormLabel component="legend">Personality (introvertiert 1 - extrovertiert 5)</FormLabel>
                    <RadioGroup aria-label="Persönlichkeit" name="personality"  row  value={this.state.personality} onChange={this.handleChange} >
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4"/>
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                    </RadioGroup>
              </div>
              </div>
              <div className="Lernprofil">
              <h2>Lernprofil</h2>
              <FormControl className="Learnstyle">
              <InputLabel> &nbsp; Lerntyp</InputLabel>
              <Select
                    name="learnstyle" variant="outlined" value={this.state.learnstyle} 
                    onChange={this.handleChange}>
                    <MenuItem value={"auditiv"}>auditiv</MenuItem> 
                    <MenuItem value={"kommunikativ"}>kommunikativ</MenuItem>
                    <MenuItem value={"motorisch"}>motorisch</MenuItem>
                    <MenuItem value={"visuell"}>visuell</MenuItem>
              </Select>
              </FormControl>
              <FormControl className="Studytime">
              <InputLabel> &nbsp; Bevorzugter Lernzeitraum</InputLabel>
              <Select
                    name="studytime" variant="outlined"
                    value={this.state.studytime} 
                    onChange={this.handleChange}>
                    <MenuItem value={"Morgens"}>Morgens</MenuItem> 
                    <MenuItem value={"Mittags"}>Mittags</MenuItem>
                    <MenuItem value={"Abends"}>Abends</MenuItem>
                    <MenuItem value={"Flexibel"}>Flexibel</MenuItem>
              </Select>
              </FormControl>
              <FormControl className="Studyplace">
              <InputLabel> &nbsp; Bevorzugter Lernort</InputLabel>
                <Select
                    name="studyplace" variant="outlined"
                    value={this.state.studyplace} 
                    onChange={this.handleChange}>
                    <MenuItem value={"Universität"}>Universität</MenuItem> 
                    <MenuItem value={"Online Meetings"}>Online Meetings</MenuItem>
                </Select>
                </FormControl>
                <FormControl className="Studyfrequence">
                <InputLabel> &nbsp; Bevorzugte Lernfrequenz</InputLabel>
                <Select
                    name="studyfrequence" variant="outlined"
                    value={this.state.studyfrequence} 
                    onChange={this.handleChange}>
                    <MenuItem value={1}>1x pro Woche</MenuItem> 
                    <MenuItem value={2}>2x pro Woche</MenuItem>
                    <MenuItem value={3}>3x pro Woche</MenuItem>
                    <MenuItem value={4}>4x pro Woche</MenuItem>
                    <MenuItem value={5}>5x pro Woche</MenuItem>
                    <MenuItem value={6}>6x pro Woche</MenuItem>
                    <MenuItem value={7}>7x pro Woche</MenuItem>
                </Select>
                </FormControl>
                <div className="Workexperience"><TextField name="workexperience" label="Berufserfahrung" variant="outlined" value ={this.state.workexperience} onChange={this.handleChange} /></div>
               </div>
              </form>
              <div className="Buttons">
              {
              this.props.profile ?
                <Button type="submit" variant="contained" color="primary" size="large" onClick={this.updateProfile} color='primary'>
                  Bearbeiten
              </Button>
                : <Button type="submit" variant="contained" color="primary" size="large" onClick={this.addProfile} color='primary'>
                  Hinzufügen
             </Button>
            }  
            </div> 
            </div> 
   
      );
  }
}

export default UserProfile;


