import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import LernappAPI from "../../API/LernappAPI";
import Typography from '@material-ui/core/Typography';
import "./Profil_anzeigen.css"
import ProfilLöschen from '../Dialog/Profil_löschen';

class Profilanzeigen extends Component {
  constructor(props){
  super(props);
  
  this.state = { 
    profil: null,
    showProfilLöschen: false,
   };
  }
  componentDidMount() {
    this.getProfil();
  }

  getProfil = () => {
    let data = 1;
    LernappAPI.getAPI().getProfil(data).then(profil =>
      this.setState({
        profil: profil,
      }))
  }

  deleteButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProfilLöschen: true
    });
  }

  closeDeleteDialog = () => {
      this.setState({
      showProfilLöschen: false
    });
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
                <h3>Lernfrequenz: {profil.getLernfrequenz()} x in der Woche</h3>
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
            <div className="KontoLöschen"><Button variant="contained" color="primary" size="large" onClick={this.deleteButtonClicked}> Profil Löschen</Button></div>
      </div>
      <ProfilLöschen show={this.state.showProfilLöschen} profil={profil} onClose={this.closeDeleteDialog}/>
      </div>
   
      );
  }
}

export default Profilanzeigen;
