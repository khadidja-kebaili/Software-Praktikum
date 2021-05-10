// import ProfilBO from "./ProfilBO";


// export default class LernappAPI {

//   static #api = null;

//   static getAPI() {
//     if (this.#api == null) {
//       this.#api = new LernappAPI();
//     }
//     return this.#api;
//   }
//   #lernappServerBaseURL = 'http://127.0.0.1:5000/';
//   // #lernappServerBaseURL = '../../public/matches.json'


//   #addProfilURL = () => `${this.#lernappServerBaseURL}/profil`;
//   #getProfilURL = (id) => `${this.#lernappServerBaseURL}/profil/${id}`;
//   #deleteProfilURL = (id) =>`${this.#lernappServerBaseURL}/profil/${id}`;
  
  
//   #fetchAdvanced = (url, init) => fetch(url, init)
//   .then(res => {
//     if (!res.ok) {
//       throw Error(`${res.status} ${res.statusText}`);
//     }
//     return res.json();
//   }
//   )

//   addProfil(profilBO) {
//     return this.#fetchAdvanced(this.#addProfilURL(), {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json, text/plain',
//         'Content-type': 'application/json',

//       },
//       body: JSON.stringify(profilBO)
//     }).then((responseJSON) => {
//       // We always get an array of ProfileBOs.fromJSON, but only need one object
//       let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
//       // console.info(accountBOs);
//       return new Promise(function (resolve) {
//         resolve(responseProfilBO);
//       })
//     })
//   }


//   getProfil(profilID) {
//     return this.#fetchAdvanced(this.#getProfilURL(profilID)).then((responseJSON) => {
//       let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
//       // console.info(responseProfilBO);
//       return new Promise(function (resolve) {
//         resolve(responseProfilBO);
//       })
//     })
//   }

//   deleteProfil(profilID) {
//     return this.#fetchAdvanced(this.#deleteProfilURL(profilID), {
//       method: 'DELETE'
//     }).then((responseJSON) => {
//       let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
//       // console.info(accountBOs);
//       return new Promise(function (resolve) {
//         resolve(responseProfilBO);
//       })
//     })
//   }

//   getMatches(profilID) {
//     fetch("matches.json", {
//       method: 'GET', 
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
//   }

//   // getMatches(profilID) {
//   //   return this.#fetchAdvanced(this.#getProfilURL(profilID)).then((responseJSON) => {
//   //     let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
//   //     // console.info(responseProfilBO);
//   //     return new Promise(function (resolve) {
//   //       resolve(responseProfilBO);
//   //     })
//   //   })
//   // }
//   }


//   // addProfil(profilBO) {
//   //     fetch('http://127.0.0.1:5000/hello/profil',{
//   //       method: 'POST',
//   //       headers: {
//   //         'Accept': 'application/json, text/plain',
//   //         'Content-type': 'application/json',
//   //       },
//   //       body: JSON.stringify(profilBO)
//   //     }).then((responseJSON) => responseJSON.text())
//   //     .then(result => console.log(result))
//   //     .catch(error => console.log("error", error));
//   // }}
import ProfileBO from "./ProfileBO";

export default class LernappAPI {

  static #api = null;

  static getAPI() {
    if (this.#api == null) {
      this.#api = new LernappAPI();
    }
    return this.#api;
  }

  // #lernappServerBaseURL = 'http://127.0.0.1:5000';
  #lernappServerBaseURL = '../../../public/matches';
  

  #addProfileURL = () => `${this.#lernappServerBaseURL}/profile`;
  #getProfileURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;
  #deleteProfileURL = (id) =>`${this.#lernappServerBaseURL}/profile/${id}`;
  #updateProfileURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;
  #getAllProfilesURL = () => `${this.#lernappServerBaseURL}/profile`;


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
      // We always get an array of ProfileBOs.fromJSON, but only need one object
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
      // We always get an array of ProfileBOs.fromJSON
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

  //Alle Profile sollen geholt werden
  getAllProfiles() {
    return this.#fetchAdvanced(this.#getAllProfilesURL())
      .then((responseJSON) => {
        let ProfileBOs = ProfileBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(ProfileBOs);
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
