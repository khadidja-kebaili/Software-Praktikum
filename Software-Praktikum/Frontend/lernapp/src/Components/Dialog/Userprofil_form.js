import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import "./Userprofil_form.css"
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

class UserProfil extends Component {
  constructor(props){
  super(props);
  let vn = '', nn = '', alt='', sem='', stud='', hob='', int = '', vor = '', 
      pers='', lernt='', lernz='', lerno='', lernf = '', vork = '', beruf='';

  this.state = { 
    name: nn,
    vorname: vn,
    alter: alt,
    semester: sem,
    studiengang: stud,
    hobbies: hob,
    interessen: int,
    vorlieben: vor,
    persönlichkeit: pers,
    lerntyp: lernt,
    lernzeitraum: lernz,
    lernort: lerno,
    lernfrequenz: lernf,
    vorkentnisse: vork,
    berufserfahrung: beruf
   };
   this.handleChange = this.handleChange.bind(this);
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
    this.state.vorlieben,
    this.state.persönlichkeit,
    this.state.lerntyp,
    this.state.lernzeitraum,
    this.state.lernort,
    this.state.lernfrequenz,
    this.state.vorkentnisse,
    this.state.berufserfahrung);
   
    LernappAPI.getAPI().addProfil(newProfil).then(console.log(newProfil))
}

  render() { 
    return ( 
      <div>
      <div className="Überschrift">
        <h1>Erstelle dein Profil und finde deine Lerngruppe!</h1>
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
              <div className="Studiengang"><TextField fullwidth="true" name="studiengang" label="Studiengang" variant="outlined" value ={this.state.studiengang} onChange={this.handleChange} /></div>
              <div className="Hobbies"><TextField name="hobbies" label="Hobbies" variant="outlined"value ={this.state.hobbies} onChange={this.handleChange}/></div>
              <div className="Interessen"><TextField name="interessen" label="Interessen" variant="outlined" value ={this.state.interessen} onChange={this.handleChange}/></div>
              <div className="Vorlieben"><TextField name="vorlieben" label="Vorlieben" variant="outlined" value ={this.state.vorlieben} onChange={this.handleChange}/></div>
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
                <div className="Vorkenntnisse"><TextField name="vorkenntnisse" label="Vorkenntnisse" variant="outlined" value ={this.state.vorkenntnisse} onChange={this.handleChange}/></div>
                <div className="Berufserfahrung"><TextField name="berufserfahrung" label="Berufserfahrung" variant="outlined"value ={this.state.berufserfahrung} onChange={this.handleChange} /></div>
               </div>
            <div className="Anmelden"><Button type="submit" variant="contained" color="primary" size="large"> Anmelden</Button></div>
           </form>
       </div>
   
      );
  }
}

export default UserProfil;
