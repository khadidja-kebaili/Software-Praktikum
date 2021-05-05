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
import ProfilBO from "../../API/ProfilBO";
import LernappAPI from "../../API/LernappAPI"

class UserProfile extends Component {
  constructor(props){
  super(props);
  let vn = '', nn = '', alt='', sem='', stud='', hob='', int = '',
      pers='', lernt='', lernz='', lerno='', lernf = '', beruf='';

  this.state = { 
    name: nn,
    vorname: vn,
    alter: alt,
    semester: sem,
    studiengang: stud,
    hobbies: hob,
    interessen: int,
    persönlichkeit: pers,
    lerntyp: lernt,
    lernzeitraum: lernz,
    lernort: lerno,
    lernfrequenz: lernf,
    berufserfahrung: beruf,
   };
   this.handleChange = this.handleChange.bind(this);
   this.baseState = this.state;
  }
  handleChange = (e) =>{
    this.setState({ [e.target.name] : e.target.value });}


 addProfil = () => {
  let newProfil = new ProfilBO(
    this.state.name, 
    this.state.vorname, 
    this.state.alter,
    this.state.semester,
    this.state.studiengang,
    this.state.hobbies,
    this.state.interessen,
    this.state.persönlichkeit,
    this.state.lerntyp,
    this.state.lernzeitraum,
    this.state.lernort,
    this.state.lernfrequenz,
    this.state.berufserfahrung);
   
    LernappAPI.getAPI().addProfil(newProfil).then(console.log(newProfil))
   
}
updateProfil = () => {
  // clone the original cutomer, in case the backend call fails
  let updatedProfil = Object.assign(new ProfilBO(), this.props.profil);
  // set the new attributes from our dialog
  updatedProfil.setNachname(this.state.name);
  updatedProfil.setVorname(this.state.vorname);
  updatedProfil.setAlter(this.state.alter);
  updatedProfil.setSemester(this.state.semester);
  updatedProfil.setStudiengang(this.state.studiengang);
  updatedProfil.setHobbies(this.state.hobbies);
  updatedProfil.setInteressen(this.state.interessen);
  updatedProfil.setPersönlichkeit(this.state.persönlichkeit);
  updatedProfil.setLerntyp(this.state.lerntyp);
  updatedProfil.setLernzeitraum(this.state.lernzeitraum); 
  updatedProfil.setLernort(this.state.lernort);
  updatedProfil.setLernfrequenz(this.state.lernfrequenz);
 
  updatedProfil.setBerufserfahrung(this.state.berufserfahrung);
  
  LernappAPI.getAPI().updateProfil(updatedProfil)
  // .then(profil => {
  //   // keep the new state as base state
  //   this.baseState.firstName = this.state.firstName;
  //   this.baseState.lastName = this.state.lastName;
  //   this.baseState.name = this.state.name;
  //   this.baseState.vorname =  this.state.vorname;
  //   this.baseState.alter =  this.state.alter;
  //   this.baseState.semester =  this.state.semester ;
  //   this.baseState.studiengang = this.state.studiengang;
  //   this.baseState.hobbies = this.state.hobbies;
  //   this.baseState.interessen =  this.state.interessen;
  //   this.baseState.persönlichkeit = this.state.persönlichkeit ;
  //   this.baseState.lerntyp =  this.state.lerntyp;
  //   this.baseState.lernzeitraum = this.state.lernzeitraum;
  //   this.baseState.lernort = this.state.lernort;
  //   this.baseState.lernfrequenz =  this.state.lernfrequenz;
  //   this.baseState.berufserfahrung = this.state.berufserfahrung;
  //   this.props.onClose(updatedProfil);      // call the parent with the new customer
  // });
}


  render() { 
    let header = "";
    if (this.props.profil){
      header = "Überarbeite dein Profil!"
    } else{
      header = "Erstelle dein Profil und finde deine Lerngruppe!"
    }
    return ( 
      <div>
      <div className="Überschrift">
        <h1>{header}</h1>
      </div>
          <form onSubmit={this.addProfil}>
          <div className="PersProfil"> 
              <div className="Name"><TextField name="name" label="Name" variant="outlined" value ={this.state.name} onChange={this.handleChange}/></div>
              <div className="Vorname"><TextField name="vorname" label="Vorname" variant="outlined" value ={this.state.vorname} onChange={this.handleChange}/> </div>
              <div className="Alter"> <TextField name="alter" label="Alter" variant="outlined" value ={this.state.alter} onChange={this.handleChange}/> </div>
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
              <FormControl className="Studiengang">
              <InputLabel id="label"> &nbsp; Studiengang</InputLabel>
              <Select
                    labelId="label" id="select"
                    name="studiengang" variant="outlined" value={this.state.studiengang} 
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
              <div className="Hobbies"><TextField name="hobbies" label="Hobbies" variant="outlined"value ={this.state.hobbies} onChange={this.handleChange}/></div>
              <div className="Interessen"><TextField name="interessen" label="Interessen" variant="outlined" value ={this.state.interessen} onChange={this.handleChange}/></div>
              <div className="radio">
              <FormLabel component="legend">Persönlichkeit (introvertiert 1 - extrovertiert 5)</FormLabel>
                    <RadioGroup aria-label="persönlichkeit" name="persönlichkeit"  row value={this.state.persönlichkeit} onChange={this.handleChange} >
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
              <FormControl className="Lerntyp">
              <InputLabel> &nbsp; Lerntyp</InputLabel>
              <Select
                    name="lerntyp" variant="outlined" value={this.state.lerntyp} 
                    onChange={this.handleChange}>
                    <MenuItem value={"auditiv"}>auditiv</MenuItem> 
                    <MenuItem value={"kommunikativ"}>kommunikativ</MenuItem>
                    <MenuItem value={"motorisch"}>motorisch</MenuItem>
                    <MenuItem value={"visuell"}>visuell</MenuItem>
              </Select>
              </FormControl>
              <FormControl className="Lernzeitraum">
              <InputLabel> &nbsp; Bevorzugter Lernzeitraum</InputLabel>
              <Select
                    name="lernzeitraum" variant="outlined"
                    value={this.state.lernzeitraum} 
                    onChange={this.handleChange}>
                    <MenuItem value={"Morgens"}>Morgens</MenuItem> 
                    <MenuItem value={"Mittags"}>Mittags</MenuItem>
                    <MenuItem value={"Abends"}>Abends</MenuItem>
                    <MenuItem value={"Flexibel"}>Flexibel</MenuItem>
              </Select>
              </FormControl>
              <FormControl className="Lernort">
              <InputLabel> &nbsp; Bevorzugter Lernort</InputLabel>
                <Select
                    name="lernort" variant="outlined"
                    value={this.state.lernort} 
                    onChange={this.handleChange}>
                    <MenuItem value={"Universität"}>Universität</MenuItem> 
                    <MenuItem value={"Online Meetings"}>Online Meetings</MenuItem>
                </Select>
                </FormControl>
                <FormControl className="Lernfrequenz">
                <InputLabel> &nbsp; Bevorzugte Lernfrequenz</InputLabel>
                <Select
                    name="lernfrequenz" variant="outlined"
                    value={this.state.lernfrequenz} 
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
                <div className="Berufserfahrung"><TextField name="berufserfahrung" label="Berufserfahrung" variant="outlined"value ={this.state.berufserfahrung} onChange={this.handleChange} /></div>
               </div>
              </form>
              <div className="Buttons">
              {
              this.props.profil ?
                <Button type="submit" variant="contained" color="primary" size="large" onClick={this.updateProfil} color='primary'>
                  Update
              </Button>
                : <Button type="submit" variant="contained" color="primary" size="large" onClick={this.addProfil} color='primary'>
                  Add
             </Button>
            }  
            </div> 
            </div> 
   
      );
  }
}

export default UserProfile;


