import BusinessObject from "./BusinessObject.js";

/**
 * @author [Mihriban Dogan](https://github.com/mihriban-dogan)
 */


//Repräsentiert ein Profil

export default class ProfileBO extends BusinessObject {

  
  /**
   * @param {*} aFirstname- Vorname des Profils
   * @param {*} aLastname - Nachname des Profils
   * @param {*} aAge - Alter des Profils
   * @param {*} aSemester- Das Semester, in dem sich der Student momentan befindet
   * @param {*} aMajor - Der Studiengang, den der Student belegt
   * @param {*} aHobbys- Die Hobbies des Studierenden
   * @param {*} aInterests - Die Interessen des Studierenden
   * @param {*} aPersonality - Wie extrovertiert/introvertiert der Studierende ist von 1-5
   * @param {*} aLearnstyle- Der Lerntyp des Studenten z.B. visuell etc.
   * @param {*} aStudytime - Die Bevorzugte Lernzeit des Studenten (morgens, mittags, abends)
   * @param {*} aStudyplace - Der Bevorzugte Lernort des Studenten (Uni, Online)
   * @param {*} aStudyfrequence- Wie oft der Student in der Woche lernen/sich treffen will (1-7)
   * @param {*} aWorkexperience  - Ob der Student bereits Berufserfahrung besitzt
   * 
   */

  constructor(aFirstname, aLastname, aAge, aSemester, aMajor, aHobbys, aInterests, aPersonality, aLearnstyle, aStudytime, aStudyplace, aStudyfrequence, aWorkexperience ) {
    super();
    this.last_name = aLastname;
    this.first_name = aFirstname;
    this.age =  aAge;
    this.semester = aSemester;
    this.major = aMajor;
    this.hobbys = aHobbys;
    this.interests = aInterests;
    this.personality = aPersonality;
    this.learn_style = aLearnstyle;
    this.study_time = aStudytime;
    this.study_place = aStudyplace;
    this.study_frequence = aStudyfrequence;
    this.work_experience = aWorkexperience
  }

  //Hier folgen die Setters und Getters für die einzelnen Parameter

 
  setFirstname(aFirstname) {
    this.first_name = aFirstname;
  }


  getFirstname() {
    return this.first_name;
  }

  setLastname(aLastname) {
    this.last_name = aLastname;
  }

 
  getLastname() {
    return this.last_name;
  }

  setAge(aAge) {
    this.age = aAge;
  }

  getAge() {
    return this.age;
  }

  setSemester(aSemester) {
    this.semester = aSemester;
  }

 
  getSemester() {
    return this.semester;
  }

  setMajor(aMajor) {
    this.major = aMajor;
  }

 
  getMajor() {
    return this.major;
  }

  setHobbys(aHobbys) {
    this.hobbys = aHobbys;
  }

 
  getHobbys() {
    return this.hobbys;
  }

  setInterests(aInterests) {
    this.interests = aInterests;
  }

 
  getInterests() {
    return this.interests;
  }

  setPersonality(aPersonality) {
    this.personality = aPersonality;
  }

 
  getPersonality() {
    return this.personality;
  }

  setLearnstyle(aLearnstyle) {
    this.learn_style = aLearnstyle;
  }

 
  getLearnstyle() {
    return this.learn_style;
  }

  setStudytime(aStudytime) {
    this.study_time = aStudytime;
  }

 
  getStudytime() {
    return this.study_time;
  }

  setStudyfrequence (aStudyfrequence) {
    this.study_frequence = aStudyfrequence;
  }

 
  getStudyfrequence() {
    return this.study_frequence;
  }

  setStudyplace(aStudyplace) {
    this.study_place = aStudyplace;
  }

 
  getStudyplace() {
    return this.study_place;
  }

  setWorkexperience(aWorkexperience) {
    this.work_experience = aWorkexperience;
  }

 
  getWorkexperience() {
    return this.work_experience;
  }




  static fromJSON(profile) {
    let result = [];

    if (Array.isArray(profile)) {
      profile.forEach((c) => {
        Object.setPrototypeOf(c, ProfileBO.prototype);
        result.push(c);
      })
    } else {
      let c = profile;
      Object.setPrototypeOf(c, ProfileBO.prototype);
      result.push(c);
    }

    return result;
  }
}
