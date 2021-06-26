<<<<<<< HEAD
import BusinessObject from "./Businessobject.js";


export default class ProfileBO extends BusinessObject {

  constructor(aFirstname, aLastname, aAge, aSemester, aMajor, aHobbys, aInterests, aPersonality, aLearnstyle, aStudytime, aStudyplace, aStudyfrequence, aWorkexperience ) {
    super();
=======
import BusinessObject from "./BusinessObject";


export default class ProfilBO extends BusinessObject {

  constructor(aFirstname, aLastname, aAge, aSemester, aMajor, aHobbys, aInterests, aPersonality, aLearnstyle, aStudytime, aStudyplace, aStudyfrequence, aWorkexperience ) {
    super();
    
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
    this.last_name = aLastname;
    this.first_name = aFirstname;
    this.age =  aAge;
    this.semester = aSemester;
    this.major = aMajor;
    this.hobbys = aHobbys;
    this.interests = aInterests;
    this.personality = aPersonality;
    this.learnstyle = aLearnstyle;
    this.studytime = aStudytime;
    this.studyplace = aStudyplace;
    this.studyfrequence = aStudyfrequence;
    this.workexperience = aWorkexperience
  }

 
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
    this.learnstyle = aLearnstyle;
  }

 
  getLearnstyle() {
    return this.learnstyle;
  }

  setStudytime(aStudytime) {
    this.studytime = aStudytime;
  }

 
  getStudytime() {
    return this.studytime;
  }

  setStudyfrequence (aStudyfrequence) {
    this.studyfrequence = aStudyfrequence;
  }

 
  getStudyfrequence() {
    return this.studyfrequence;
  }

  setStudyplace(aStudyplace) {
    this.studyplace = aStudyplace;
  }

 
  getStudyplace() {
    return this.studyplace;
  }

  setWorkexperience(aWorkexperience) {
    this.workexperience = aWorkexperience;
  }

 
  getWorkexperience() {
    return this.workexperience;
  }

<<<<<<< HEAD
=======
  

>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d



  static fromJSON(profile) {
    let result = [];

    if (Array.isArray(profile)) {
      profile.forEach((c) => {
<<<<<<< HEAD
        Object.setPrototypeOf(c, ProfileBO.prototype);
=======
        Object.setPrototypeOf(c, ProfilBO.prototype);
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
        result.push(c);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = profile;
<<<<<<< HEAD
      Object.setPrototypeOf(c, ProfileBO.prototype);
=======
      Object.setPrototypeOf(c, ProfilBO.prototype);
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
      result.push(c);
    }

    return result;
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 3b296e431a153e361b22e53bcd96d3d56f26993d
