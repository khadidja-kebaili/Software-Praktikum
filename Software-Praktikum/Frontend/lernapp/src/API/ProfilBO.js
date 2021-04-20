import BusinessObject from "./Businessobject.js";


export default class ProfilBO extends BusinessObject {

  constructor(avorname, aname, aalter, asemester, astudiengang, ahobbies, ainteressen, avorlieben, apersönlichkeit, alerntyp, alernzeitraum, alernort, alernfrequenz, avorkenntnisse, aberufserfahrung ) {
    super();
    this.name = aname;
    this.vorname = avorname;
    this.alter =  aalter;
    this.semester = asemester;
    this.studiengang = astudiengang;
    this.hobbies = ahobbies;
    this.interessen = ainteressen;
    this.vorlieben = avorlieben;
    this.persönlichkeit = apersönlichkeit;
    this.lerntyp = alerntyp;
    this.lernzeitraum = alernzeitraum;
    this.lernort = alernort;
    this.lernfrequenz = alernfrequenz;
    this.vorkenntnisse = avorkenntnisse;
    this.berufserfahrung = aberufserfahrung
  }

 
  setVorname(avorname) {
    this.vorname = avorname;
  }


  getVorname() {
    return this.vorname;
  }

  setNachname(aname) {
    this.name = aname;
  }

 
  getNachname() {
    return this.name;
  }

  setAlter(aalter) {
    this.alter = aalter;
  }

  getAlter() {
    return this.alter;
  }

  setSemester(asemester) {
    this.semester = asemester;
  }

 
  getSemester() {
    return this.semester;
  }

  setStudiengang(astudiengang) {
    this.studiengang = astudiengang;
  }

 
  getStudiengang() {
    return this.studiengang;
  }

  setHobbies(ahobbies) {
    this.hobbies = ahobbies;
  }

 
  getHobbies() {
    return this.hobbies;
  }

  setInteressen(ainteressen) {
    this.interessen = ainteressen;
  }

 
  getInteressen() {
    return this.interessen;
  }

  setVorlieben(avorlieben) {
    this.vorlieben = avorlieben;
  }

 
  getVorlieben() {
    return this.vorlieben;
  }

  setPersönlichkeit(apersönlichkeit) {
    this.persönlichkeit = apersönlichkeit;
  }

 
  getPersönlichkeit() {
    return this.persönlichkeit;
  }

  setLerntyp(alerntyp) {
    this.lerntyp = alerntyp;
  }

 
  getLerntyp() {
    return this.lerntyp;
  }

  setLernzeitraum(anachname) {
    this.nachname = anachname;
  }

 
  getLernzeitraum() {
    return this.lernzeitraum;
  }

  setLernfrequenz (alernfrequenz) {
    this.lernfrequenz = alernfrequenz;
  }

 
  getLernfrequenz() {
    return this.lernfrequenz;
  }

  setLernort(alernort) {
    this.lernort = alernort;
  }

 
  getLernort() {
    return this.lernort;
  }

  setVorkenntnisse(avorkenntnisse) {
    this.vorkenntisse = avorkenntnisse;
  }

 
  getVorkenntnisse() {
    return this.vorkenntisse;
  }

  setBerufserfahrung(aberufserfahrung) {
    this.berufserfahrung = aberufserfahrung;
  }

 
  getBerufserfahrung() {
    return this.berufserfahrung;
  }




  static fromJSON(profil) {
    let result = [];

    if (Array.isArray(profil)) {
      profil.forEach((c) => {
        Object.setPrototypeOf(c, ProfilBO.prototype);
        result.push(c);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = profil;
      Object.setPrototypeOf(c, ProfilBO.prototype);
      result.push(c);
    }

    return result;
  }
}
