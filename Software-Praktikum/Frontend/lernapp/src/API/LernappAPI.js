<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import MessageBO from './MessageBO';
import ChatroomBO from './ChatroomBO';
import ChataccessBO from './ChataccessBO'

export default class LernappAPI{
    
    //Singelton instance
    static #api = null;

    static getAPI(){
        if (this.#api == null){
            this.#api = new LernappAPI();
        }
        return this.#api;
    }
    
    #lernappServerBaseURL = 'http://127.0.0.1:3306/';

    //Chatroom
    #add_ChatroomURL = () => '${this.#lernappServerBaseURL}/chatroom';
    #get_ChatroomURL = (id) => '${this.#lernappServerBaserURL}/chatroom/${id}';
    #delete_ChatroomURL = (id) => '${this.#lernappServerBaserURL}/chatroom/${id}';

    #get_MessagesForChatroomURL = (id) => '${this.#lernappServerBaseURL}/chatroom/${id}';

    //Chataccess
    #add_ChataccessURL = () => '${this.#lernappServerBaseURL}/chataccess';
    #get_ChataccessURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';
    #delete_ChataccessURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';

    #get_ChataccesForUserURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';

    //Message
    #add_MessageURL = () => '${this.#lernappServerBaseURL}/messages';
    #get_MessageURL = (id) => '${this.#lernappServerBaseURL}/messages/${id}';
    #delete_MessageURL = (id) => '${this.#lernappServerBaseURL}/messages/${id}';

    #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
        if(!res.ok){
            throw Error('${res.status} ${res.statusText}');
        }
        return res.json();
    });

    //Chatroom Methoden
    add_Chatroom(chatroom){
        return this.#fetchAdvanced(this.#add_ChatroomURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chatroom)
        }).them((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChatroom);
            })
        })
    }

    get_Chatroom(chatroom){
        return this.#fetchAdvanced(this.#get_ChatroomURL(chatroom)).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve) {
                resolve(responseChatroom);
            })
        })
    }

    delete_Chatroom(chatroom){
        return this.#fetchAdvanced(this.#delete_ChatroomURL(chatroom), {
            method: 'DELETE'
        }).them((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChatroom);
            })
        })
    }

    get_MessagesForChatroom(chatroom){
        return this.#fetchAdvanced(this.#get_MessagesForChatroomURL(chatroom)).then((responseJSON) => {
            let messageBOs = MessageBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(messageBOs);
>>>>>>> origin/Zusammenbringen
            })
        })
    }

<<<<<<< HEAD

    addGroup(groupBO) {
        return this.#fetchAdvanced(this.#addGroupURL(), {
=======
    //Chataccess Methoden

    //User erhält Zugriff auf einen Chat
    add_Chataccess(chataccess){
        return this.#fetchAdvanced(this.#add_ChataccessURL(), {
>>>>>>> origin/Zusammenbringen
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
<<<<<<< HEAD
            body: JSON.stringify(groupBO)
        }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseGroupBO);
=======
            body: JSON.stringify(chataccess)
        }).them((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChataccess);
            })
        })
    }

    //einen Chataccess zurückgeben nach Id
    get_Chataccess(id){
        return this.#fetchAdvanced(this.#get_ChataccessURL(id)).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve) {
                resolve(responseChataccess);
            })
        })
    }

    //Zugriff wegnehmen von einem User
    delete_Chataccess(chataccess){
        return this.#fetchAdvanced(this.#delete_ChataccessURL(chataccess), {
            method: 'DELETE'
        }).them((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChataccess);
            })
        })
    }

    //alle Chataccess für einen Nutzer
    get_ChataccessForUser(profil){
        return this.#fetchAdvanced(this.#get_ChataccesForUserURL(profil)).then((responseJSON) => {
            let chataccesBOs = ChataccessBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(chataccesBOs);
>>>>>>> origin/Zusammenbringen
            })
        })
    }

<<<<<<< HEAD
    /*updateGroup(groupBO) {
        return this.#fetchAdvanced(this.#updateGroupURL(groupBO.getID()), {
            method: 'PUT',
=======
    //Messages Methoden

    //Message hinzufügen
    add_Message(message){
        return this.#fetchAdvanced(this.#add_MessageURL(), {
            method: 'POST',
>>>>>>> origin/Zusammenbringen
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
<<<<<<< HEAD
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
=======
            body: JSON.stringify(message)
        }).them((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseMessage);
            })
        })
    }

    //
    get_Message(message){
        return this.#fetchAdvanced(this.#get_MessageURL(message)).then((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve) {
                resolve(responseMessage);
            })
        })
    }

    delete_Message(message){
        return this.#fetchAdvanced(this.#delete_MessageURL(message), {
            method: 'DELETE'
        }).them((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseMessage);
            })
        })
    }


  
}
>>>>>>> origin/Zusammenbringen
=======
import ProfileBO from "./ProfileBO";
import MemberBO from "./MemberBO";

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
>>>>>>> origin/Mihri
