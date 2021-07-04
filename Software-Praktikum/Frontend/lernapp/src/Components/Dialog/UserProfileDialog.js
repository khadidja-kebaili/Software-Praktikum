import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/styles';


/**
 * @author [Mihriban Dogan](https://github.com/mihriban-dogan)
 */

class UserProfileDialog extends Component {
    constructor(props){
    super(props);
    }


    //Aufruf bei Abbruch
  handleClose = () => {
    this.props.onClose(null);
  }
  render() { 
      const { classes, show} = this.props 
    
    return ( 
        show ?
        //Dialog mit Selects, Radio und Textfeldern
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogContent>
            <DialogTitle>
             <h2>Überarbeite dein Profil</h2>
            </DialogTitle>
            <form className={classes.root} noValidate autoComplete='off'>
            <div className="PersoProfil" className={classes.PersoProfil}> 
            <div className="Textfield" className={classes.Textfield}><TextField name="last_name"  label="Name" variant="outlined" value ={this.props.last_name} onChange={this.props.handleChange}/></div>
              <div className="Textfield" className={classes.Textfield}><TextField name="first_name" label="Vorname" variant="outlined" value ={this.props.first_name} onChange={this.props.handleChange}/> </div>
              <div className="Textfield" className={classes.Textfield}> <TextField name="age" type="number" label="Alter" variant="outlined" value ={this.props.age} onChange={this.props.handleChange}/> </div>
              <FormControl className="Semester" className="Select" className={classes.Select}>
              <InputLabel id="label"> &nbsp; Semester</InputLabel>
              <Select
                    labelId="label" id="select"
                    name="semester" variant="outlined" value={this.props.semester} 
                    onChange={this.props.handleChange}>
                    <MenuItem value={1}>1.</MenuItem> 
                    <MenuItem value={2}>2.</MenuItem>
                    <MenuItem value={3}>3.</MenuItem>
                    <MenuItem value={4}>4.</MenuItem>
                    <MenuItem value={5}>5.</MenuItem>
                    <MenuItem value={6}>6.</MenuItem>
                    <MenuItem value={7}>7.</MenuItem>
              </Select>
              </FormControl>
              <FormControl className="Select" className={classes.Select}>
              <InputLabel id="label"> &nbsp; Studiengang</InputLabel>
              <Select
                    labelId="label" id="select"
                    name="major" variant="outlined" value={this.props.major} 
                    onChange={this.props.handleChange}>
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
              <div className="Textfield" className={classes.Textfield}><TextField name="hobbies" label="Hobbies" variant="outlined"value ={this.props.hobbies} onChange={this.props.handleChange}/></div>
              <div className="Textfield" className={classes.Textfield}><TextField name="interests" label="Interessen" variant="outlined" value ={this.props.interests} onChange={this.props.handleChange}/></div>
              <div className="radio">
              <FormLabel component="legend">Personality (introvertiert 1 - extrovertiert 5)</FormLabel>
                    <RadioGroup aria-label="Persönlichkeit" name="personality"  row  value={this.props.personality} onChange={this.props.handleChange} >
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4"/>
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                    </RadioGroup>
              </div>
              </div>
              <div className="Lernoprofil" className={classes.LernoProfil}>
              <h2>Lernprofil</h2>
              <FormControl className="Select" className={classes.Select}>
              <InputLabel> &nbsp; Lerntyp</InputLabel>
              <Select
                    name="learn_style" variant="outlined" value={this.props.learn_style} 
                    onChange={this.props.handleChange}>
                    <MenuItem value={"auditiv"}>auditiv</MenuItem> 
                    <MenuItem value={"kommunikativ"}>kommunikativ</MenuItem>
                    <MenuItem value={"motorisch"}>motorisch</MenuItem>
                    <MenuItem value={"visuell"}>visuell</MenuItem>
              </Select>
              </FormControl>
              <FormControl className="Select" className={classes.Select}>
              <InputLabel> &nbsp; Lernzeitraum</InputLabel>
              <Select
                    name="study_time" variant="outlined"
                    value={this.props.study_time} 
                    onChange={this.props.handleChange}>
                    <MenuItem value={"Morgens"}>Morgens</MenuItem> 
                    <MenuItem value={"Mittags"}>Mittags</MenuItem>
                    <MenuItem value={"Abends"}>Abends</MenuItem>
                    <MenuItem value={"Flexibel"}>Flexibel</MenuItem>
              </Select>
              </FormControl>
              <FormControl className="Select" className={classes.Select}>
              <InputLabel> &nbsp; Lernort</InputLabel>
                <Select
                    name="study_place" variant="outlined"
                    value={this.props.study_place} 
                    onChange={this.props.handleChange}>
                    <MenuItem value={"Universität"}>Universität</MenuItem> 
                    <MenuItem value={"Online Meetings"}>Online Meetings</MenuItem>
                </Select>
                </FormControl>
                <FormControl className="Select" className={classes.Select}>
                <InputLabel> &nbsp; Lernfrequenz</InputLabel>
                <Select
                    name="study_frequence" variant="outlined"
                    value={this.props.study_frequence} 
                    onChange={this.props.handleChange}>
                    <MenuItem value={1}>1x pro Woche</MenuItem> 
                    <MenuItem value={2}>2x pro Woche</MenuItem>
                    <MenuItem value={3}>3x pro Woche</MenuItem>
                    <MenuItem value={4}>4x pro Woche</MenuItem>
                    <MenuItem value={5}>5x pro Woche</MenuItem>
                    <MenuItem value={6}>6x pro Woche</MenuItem>
                    <MenuItem value={7}>7x pro Woche</MenuItem>
                </Select>
                </FormControl>
                <div className="Textfield" className={classes.Textfield}><TextField name="work_experience" label="Berufserfahrung" variant="outlined" value ={this.props.work_experience} onChange={this.props.handleChange} /></div>
               </div>
              </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Abbrechen
            </Button>
            <Button type="submit" variant="contained" color="primary" size="large" onClick={this.props.updateProfile} color='primary'>
              Bearbeiten
            </Button>
          </DialogActions>
        </Dialog>
        : null
      );
  }
 
}
   /** Komponente CSS*/
 const styles = theme => ({
        root: {
        width: '100%',
        },
        PersoProfil: {
            borderRadius: "25px",
            border: "2px solid black",
            padding: "5%",
            marginBottom: "1ch"
        },
        LernoProfil: {
            borderRadius: "25px",
            border: "2px solid black",
            padding: "5%"
        },
        Textfield:{
            marginBottom: "1ch",
            marginTop: "1ch"
        },
        Select: {
            marginTop: "1ch",
            marginBottom: "1ch",
            width: "100%"
        }
     
    });
export default withStyles(styles)(UserProfileDialog);


