import GroupBO from "./GroupBO";
import ProfileBO from "./ProfileBO";

export default class LernappAPI {

    static #api = null;

    static getAPI() {
        if (this.#api == null){
            this.#api = new LernappAPI();}
        return this.#api;
    }


    #lernappServerBaseURL = 'http://127.0.0.1:5000';

    // // Local http-fake-backend
    // #lernappServerBaseURL = 'fake_backend/Lernappconfig.js'


    #addGroupURL = () => `${this.#lernappServerBaseURL}/groups`;
    #getGroupURL = (id) => `${this.#lernappServerBaseURL}/group/${id}`;
    // #deleteGroupURL = (id) =>`${this.#lernappServerBaseURL}/group/${id}`;
    #getAllGroupsURL = () => `${this.#lernappServerBaseURL}/groups`;
    // #updateGroupURL = (id) => `${this.#lernappServerBaseURL}/group/${id}`;
    #getProfileURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;

    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
                if (!res.ok) {
                    throw Error(`${res.status} ${res.statusText}`);
                }
                return res.json();
            }
        )

    //Alle Profile sollen geholt werden
    getAllGroups() {
        return this.#fetchAdvanced(this.#getAllGroupsURL())
            .then((responseJSON) => {
                let GroupBOs = GroupBO.fromJSON(responseJSON);
                console.log(GroupBOs)
                return new Promise(function (resolve) {
                    resolve(GroupBOs);
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


    addGroup(groupBO) {
        return this.#fetchAdvanced(this.#addGroupURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(groupBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseGroupBO);
            })
        })
    }

    /*updateGroup(groupBO) {
        return this.#fetchAdvanced(this.#updateGroupURL(groupBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(groupBO)

        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseGroupBO);
            })
        })
    }
*/
    getGroup(groupID) {
        return this.#fetchAdvanced(this.#getGroupURL(groupID)).then((responseJSON) => {
            let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
            // console.info(responseGroupBO);
            return new Promise(function (resolve) {
                resolve(responseGroupBO);
            })
        })
    }
}
