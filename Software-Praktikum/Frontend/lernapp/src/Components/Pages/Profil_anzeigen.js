import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import "./Profil_anzeigen.css"

class Profilanzeigen extends Component {
  constructor(props){
  super(props);
  
  this.state = { 
    profil: null,
   };
  }
  componentDidMount() {
    this.getProfil();
  }

  getProfil = () => {
    let data = 2;
    LernappAPI.getAPI().getProfil(data).then(profil =>
      this.setState({
        profil: profil,
      }))
  }



  render() { 
    const { profil } = this.state;
    return ( 
      <div>
      <div className="Profil">
      <div className="Überschrift">
        <h1>Profil</h1>
       
      </div> 
      {
         profil ?
            <div>
              <div className="PersProfil">
                <h2>Persönliches Profil</h2>
                <h3 className="header">Name: {profil.getNachname()}</h3> 
                <h3>Vorname: {profil.getVorname()}</h3>
                <h3>Alter: {profil.getAlter()}</h3>
                <h3>Semester: {profil.getSemester()}</h3>
                <h3>Studiengang: {profil.getStudiengang()}</h3>
                <h3>Hobbies: {profil.getHobbies()}</h3>
                <h3>Interessen: {profil.getInteressen()}</h3>
                <h3>Persönlichkeit: {profil.getPersönlichkeit()} </h3>
               </div>
              <div className="Lernprofil">
                <h2>Lernprofil</h2> 
                <h3>Lerntyp: {profil.getLerntyp()}</h3> 
                <h3>Lernfrequenz: {profil.getLernfrequenz()}</h3>
                <h3>Lernzeitraum: {profil.getLernzeitraum()}</h3>
                <h3>Lernort:  {profil.getLernort()}</h3>
                <h3>Berufserfahrung: {profil.getBerufserfahrung()}</h3>
               </div>
            </div>
            : null
        }
       </div>
       <div className="Buttons">
       <div className="Bearbeiten"><Button variant="contained" color="primary" size="large"> Bearbeiten</Button></div>
       <div className="KontoLöschen"><Button variant="contained" color="primary" size="large"> Profil Löschen</Button></div>
      </div> 
      </div>
   
      );
  }
}

export default Profilanzeigen;
