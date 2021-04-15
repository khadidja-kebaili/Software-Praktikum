import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import "./style.userprofile.css"
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

class UserProfil extends Component {
  constructor(props){
  super(props)
  this.state = { 
    name: "",
    vorname:"",
    alter: "",
    semester:"",
    studiengang:"",
    hobbies:"",
    interessen:"",
    vorlieben:"",
    persönlichkeit:"",
    lerntyp:"",
    lernzeitraum:"",
    lernort:"",
    lernfrequenz:"",
    vorkentnisse:"",
    berufserfahrung:""
   }
  }
  handleChange = () =>{
    
  }
  render() { 
    return ( 
      <div>
      <Container className="Überschrift">
        <h1>Erstelle dein Profil und finde deine Lerngruppe!</h1>
      </Container>
          <form>
            <div className="PersProfil"> 
            <h2> Persönliches Profil</h2>
              <div className="Name"><TextField id="Name" label="Name" variant="outlined" value={this.state.name} onChange={this.handleChange}/></div>
              <div className="Vorname"><TextField id="Vorname" label="Vorname" variant="outlined"/> </div>
              <div className="Alter"> <TextField id="Alter" label="Alter" variant="outlined"/> </div>
              <div className="Semester"><TextField id="Semester" label="Semester" variant="outlined" /></div>
              <div className="Studiengang"><TextField fullwidth id="Studiengang" label="Studiengang" variant="outlined" /></div>
              <div className="Hobbies"><TextField id="Hobbies" label="Hobbies" variant="outlined"/></div>
              <div className="Interessen"><TextField id="Interessen" label="Interessen" variant="outlined"/></div>
              <div className="Vorlieben"><TextField id="Vorlieben" label="Vorlieben" variant="outlined"/></div>
               <div className="extro">
                  <FormControl component="fieldset">
                  <FormLabel component="legend">Persönlichkeit (introvertiert 1 - extrovertiert 5)</FormLabel>
                  <RadioGroup aria-label="persönlichkeit" name="persönlichkeit" row>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4"/>
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                  </RadioGroup>
                </FormControl>
        </div>
           </div>
           <div className="Lernprofil">
            <h2>Lernprofil</h2>
            <div className="Lerntyp">
                <FormControl className="probe">
                  <InputLabel id="demo-controlled-open-select-label"> &nbsp; Lerntyp</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select" variant="outlined">
                      {/* VALUE MUSS NOCH ANGEPASST WERDEN!!!! */}
                    <MenuItem value={1}>auditiv</MenuItem> 
                    <MenuItem value={2}>kommunikativ</MenuItem>
                    <MenuItem value={3}>motorisch</MenuItem>
                    <MenuItem value={4}>visuell</MenuItem>
                  </Select>
                </FormControl>
                </div>
            <div className="Lernzeitraum">
                <FormControl className="probe">
                  <InputLabel id="demo-controlled-open-select-label"> &nbsp; Bevorzugter Lernzeitpunkt</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select" variant="outlined">
                      {/* VALUE MUSS NOCH ANGEPASST WERDEN!!!! */}
                    <MenuItem value={1}>Morgens</MenuItem> 
                    <MenuItem value={2}>Mittags</MenuItem>
                    <MenuItem value={3}>Abends</MenuItem>
                    <MenuItem value={4}>Flexibel</MenuItem>
                  </Select>
                </FormControl>
                </div>
            <div className="Lernort">
                <FormControl className="probe">
                  <InputLabel id="demo-controlled-open-select-label"> &nbsp; Bevorzugter Lernort</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select" variant="outlined">
                      {/* VALUE MUSS NOCH ANGEPASST WERDEN!!!! */}
                    <MenuItem value={1}>Universität</MenuItem> 
                    <MenuItem value={2}>Online Meetings</MenuItem>
                  </Select>
                </FormControl>
                </div>
            <div className="Lernfrequenz">
                <FormControl className="probe">
                  <InputLabel id="demo-controlled-open-select-label"> &nbsp; Bevorzugte Lernfrequenz</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select" variant="outlined">
                      {/* VALUE MUSS NOCH ANGEPASST WERDEN!!!! */}
                    <MenuItem value={1}>1x pro Woche</MenuItem> 
                    <MenuItem value={2}>2x pro Woche</MenuItem>
                    <MenuItem value={3}>3x pro Woche</MenuItem>
                    <MenuItem value={4}>4x pro Woche</MenuItem>
                    <MenuItem value={5}>5x pro Woche</MenuItem>
                    <MenuItem value={6}>6x pro Woche</MenuItem>
                    <MenuItem value={7}>7x pro Woche</MenuItem>
                  </Select>
                </FormControl>
                </div>
            <div className="Vorkenntnisse"><TextField id="standard-basic" label="Vorkenntnisse" variant="outlined"/></div>
            <div className="Berufserfahrung"><TextField id="standard-basic" label="Berufserfahrung" variant="outlined" /></div>
          </div>
          </form>
         <div className="Anmelden"><Button variant="contained" color="primary" size="large"> Anmelden</Button></div>
       </div>
   
      );
  }
}

export default UserProfil;