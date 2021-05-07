import ProfilBO from "./ProfilBO";

export default class LernappAPI {

  static #api = null;

  static getAPI() {
    if (this.#api == null) {
      this.#api = new LernappAPI();
    }
    return this.#api;
  }
  // #lernappServerBaseURL = 'http://127.0.0.1:5000/';
  #lernappServerBaseURL = './Frontend/lernapp/src/http-fake-backend/server/api/PythonLernappBeispiel-config'
  

  #addProfilURL = () => `${this.#lernappServerBaseURL}/profil`;
  #getProfilURL = (id) => `${this.#lernappServerBaseURL}/profil/${id}`;
  #deleteProfilURL = (id) =>`${this.#lernappServerBaseURL}/profil/${id}`;

  #fetchAdvanced = (url, init) => fetch(url, init)
  .then(res => {
    if (!res.ok) {
      throw Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  }
  )

  addProfil(profilBO) {
    return this.#fetchAdvanced(this.#addProfilURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',

      },
      body: JSON.stringify(profilBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON, but only need one object
      let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseProfilBO);
      })
    })
  }


  getProfil(profilID) {
    return this.#fetchAdvanced(this.#getProfilURL(profilID)).then((responseJSON) => {
      let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
      // console.info(responseProfilBO);
      return new Promise(function (resolve) {
        resolve(responseProfilBO);
      })
    })
  }

  deleteProfil(profilID) {
    return this.#fetchAdvanced(this.#deleteProfilURL(profilID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responseProfilBO);
      })
    })
  }

  getMatches(profilID) {
    
  }


  // addProfil(profilBO) {
  //     fetch('http://127.0.0.1:5000/hello/profil',{
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json, text/plain',
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify(profilBO)
  //     }).then((responseJSON) => responseJSON.text())
  //     .then(result => console.log(result))
  //     .catch(error => console.log("error", error));
  // }}
}