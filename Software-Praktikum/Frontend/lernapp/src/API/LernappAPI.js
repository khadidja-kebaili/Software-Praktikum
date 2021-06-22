import ProfileBO from "./ProfileBO";
import ChataccessBO from "./ChatAccessBO";
import GroupBO from "./GroupBO";


export default class LernappAPI {

  static #api = null;

  static getAPI() {
    if (this.#api == null) {
      this.#api = new LernappAPI();
    }
    return this.#api;
  }

  #lernappServerBaseURL = 'http://127.0.0.1:5000';
  

  #addProfileURL = () => `${this.#lernappServerBaseURL}/profile`;
  #getProfileURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;
  #deleteProfileURL = (id) =>`${this.#lernappServerBaseURL}/profile/${id}`;
  #updateProfileURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;
  #getMatchesURL = () => `${this.#lernappServerBaseURL}/matches`;
  #searchMemberURL = (memberName) => `${this.#lernappServerBaseURL}/profiles-by-name/${memberName}`;
  #addMemberURL = () => `${this.#lernappServerBaseURL}/chataccess_new_member`;
  #get_Groups_of_ProfileURL = (id) => `${this.#lernappServerBaseURL}/groups_of_profile/${id}`;
  #leaveGroupURL = (id) => `${this.#lernappServerBaseURL}/chataccess/${id}`;
  #getMembersForGroupURL = (id) => `${this.#lernappServerBaseURL}/chataccess_member/${id}`;

  #fetchAdvanced = (url, init) => fetch(url, init)
  .then(res => {
    if (!res.ok) {
      throw Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  }
  )

  addProfile(profileBO) {
    return this.#fetchAdvanced(this.#addProfileURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(profileBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON, but only need one object
      let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseProfileBO);
      })
    })
  }

  updateProfile(profileBO) {
    return this.#fetchAdvanced(this.#updateProfileURL(profileBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(profileBO)
     
    }).then((responseJSON) => { 
      // We always get an array of CustomerBOs.fromJSON
      let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseProfileBO);
      })
    })
  }

  getProfile(profileID) {
    return this.#fetchAdvanced(this.#getProfileURL(profileID)).then((responseJSON) => {
      let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
      // console.info(responseProfileBO);
      return new Promise(function (resolve) {
        resolve(responseProfileBO);
      })
    })
  }

  deleteProfile(profileID) {
    return this.#fetchAdvanced(this.#deleteProfileURL(profileID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseProfileBO);
      })
    })
  }

  getMatches() {
    return this.#fetchAdvanced(this.#getMatchesURL()).then((responseJSON) => {
      let profileBOs = ProfileBO.fromJSON(responseJSON);
      // console.info(profileBOs);
      return new Promise(function (resolve) {
        resolve(profileBOs);
      })
    })
  }

  searchMember(memberName) {
    return this.#fetchAdvanced(this.#searchMemberURL(memberName)).then((responseJSON) => {
      let memberBOs = ProfileBO.fromJSON(responseJSON);
      // console.info(memberBOs);
      return new Promise(function (resolve) {
        resolve(memberBOs);
      })
    })
  }

  addMember(chataccessMemberBO){
    return this.#fetchAdvanced(this.#addMemberURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(chataccessMemberBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON, but only need one object
      let responsechataccessBO = ChataccessBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responsechataccessBO);
      })
    })
  }

  getGroupsForProfile(id){
    return this.#fetchAdvanced(this.#get_Groups_of_ProfileURL(id))
        .then((responseJSON)=>{
            let GroupBOs = GroupBO.fromJSON(responseJSON);
            console.log(GroupBOs)
            return new Promise(function (resolve){
                resolve(GroupBOs)
            })
        })
}

leaveGroup(profileID) {
  return this.#fetchAdvanced(this.#leaveGroupURL(profileID), {
    method: 'DELETE'
  }).then((responseJSON) => {
    let responseChataccessBO = ChataccessBO.fromJSON(responseJSON)[0];
    // console.info(accountBOs);
    return new Promise(function (resolve) {
      resolve(responseChataccessBO);
    })
  })
}

getMembersForGroup(roomID) {
  return this.#fetchAdvanced(this.#getMembersForGroupURL(roomID))
    .then((responseJSON) => {
      let profileBOs = ProfileBO.fromJSON(responseJSON);
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(profileBOs);
      })
    })
}
  // addProfile(profileBO) {
  //     fetch('http://127.0.0.1:5000/hello/profile',{
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json, text/plain',
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify(profileBO)
  //     }).then((responseJSON) => responseJSON.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log("error", error));
  // }}
}
