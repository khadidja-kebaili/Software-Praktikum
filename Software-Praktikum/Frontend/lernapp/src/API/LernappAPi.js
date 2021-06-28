import GroupBO from "./GroupBO";
import ProfileBO from "./ProfileBO";
import MessageBO from './MessageBO';
import ChatroomBO from './ChatroomBO';
import ChataccessBO from './ChataccessBO';
import RequestBO from "./RequestBO";
// import MemberBO from "./MemberBO";

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

    //Group

    #addGroupURL = () => `${this.#lernappServerBaseURL}/group`;
    #getGroupURL = (id) => `${this.#lernappServerBaseURL}/group/${id}`;
    // #deleteGroupURL = (id) =>`${this.#lernappServerBaseURL}/group/${id}`;
    #getAllGroupsURL = () => `${this.#lernappServerBaseURL}/group`;
    #get_Groups_of_ProfileURL = (id) => `${this.#lernappServerBaseURL}/groups_of_profile/${id}`;
    #addMemberURL = () => `${this.#lernappServerBaseURL}/chataccess_new_member`;
    #leaveGroupURL = (id) => `${this.#lernappServerBaseURL}/chataccess/${id}`;
    #getMembersForGroupURL = (id) => `${this.#lernappServerBaseURL}/chataccess_member/${id}`;


    //Chatroom

    #add_ChatroomURL = () => `${this.#lernappServerBaseURL}/chatroom`;
    #get_allChatroomURL = () => `${this.#lernappServerBaseURL}/chatroom`;
    #get_ChatroomURL = (id) => `${this.#lernappServerBaseURL}/chatroom/${id}`;
    #delete_ChatroomURL = (id) => `${this.#lernappServerBaseURL}/chatroom/${id}`;
    #update_ChatroomURL = (id) => `${this.#lernappServerBaseURL}/chatroom/${id}`;
   

    //Request

    #getRequestForProfileURL = (id) => `${this.#lernappServerBaseURL}/request_for_profile/${id}`;
    #getRequestForGroupURL = (id) => `${this.#lernappServerBaseURL}/request_for_groups/${id}`;
    // #deleteRequestURL = (id1,id2) => `${this.#lernappServerBaseURL}/delete_request/${id1}/requested_by/${id2}`;
    #addRequestURL = () => `${this.#lernappServerBaseURL}/requests`;
    #getAllRequestURL = () => `${this.#lernappServerBaseURL}/requests`;
    #deleteRequestURL = (id) => `${this.#lernappServerBaseURL}/request/${id}`;

    //Chataccess

    #add_ChataccessURL = () => `${this.#lernappServerBaseURL}/chataccess`;
    #get_allChataccessURL = () => `${this.#lernappServerBaseURL}/chataccess`;
    #get_ChataccessURL = (id) => `${this.#lernappServerBaseURL}/chataccess/${id}`;
    #delete_ChataccessURL = (id) => `${this.#lernappServerBaseURL}/chataccess/${id}`;
    #update_ChataccessURL = (id) => `${this.#lernappServerBaseURL}/chataccess/${id}`;

    #get_ChataccessByRoomURL = (room) => `${this.#lernappServerBaseURL}/chataccess_member/${room}`;
    #get_GroupchatsByProfilURL = (id) => `${this.#lernappServerBaseURL}/chataccess_groupchat/${id}`;
    #get_SinglechatsByProfilURL = (id) => `${this.#lernappServerBaseURL}/chataccess_singlechat/${id}`;

    #delete_targetedChataccessURL = (id, room) => `${this.#lernappServerBaseURL}/chataccess/${id}/${room}`;

    //Message

    #add_MessageURL = () => `${this.#lernappServerBaseURL}/messages`;
    #get_allMessageURL = () => `${this.#lernappServerBaseURL}/messages`;
    #get_MessageURL = (id) => `${this.#lernappServerBaseURL}/messages/${id}`;
    #delete_MessageURL = (id) => `${this.#lernappServerBaseURL}/messages/${id}`;
    #update_MessageURL = (id) => `${this.#lernappServerBaseURL}/messages/${id}`;
    #get_MessageByRoomURL = (room) => `${this.#lernappServerBaseURL}/chatroom_message/${room}`;

    //Profile

    #addProfileURL = () => `${this.#lernappServerBaseURL}/profile`;
    #getProfileURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;
    #deleteProfileURL = (id) =>`${this.#lernappServerBaseURL}/profile/${id}`;
    #updateProfileURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;

    #getMatchesURL = (id) => `${this.#lernappServerBaseURL}/matches/${id}`;
    #searchMemberURL = (memberName) => `${this.#lernappServerBaseURL}/profiles-by-name/${memberName}`;


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

    getProfile(profileID) {
        return this.#fetchAdvanced(this.#getProfileURL(profileID)).then((responseJSON) => {
            let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
            // console.info(responseProfileBO);
            return new Promise(function (resolve) {
                resolve(responseProfileBO);
            })
        })
    }

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

    get_allChatroom(){
        return this.#fetchAdvanced(this.#get_allChatroomURL()).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChatroom)
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

    update_Chatroom(chatroom){
        return this.#fetchAdvanced(this.#update_ChatroomURL(chatroom), {
            methode: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json', 
            },
            body: JSON.stringify(chatroom)
        }).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatroom);
            })
        })

    }

    //Group

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


    searchMember(memberName) {
        return this.#fetchAdvanced(this.#searchMemberURL(memberName)).then((responseJSON) => {
          let memberBOs = ProfileBO.fromJSON(responseJSON);
          // console.info(memberBOs);
          return new Promise(function (resolve) {
            resolve(memberBOs);
          })
        })
      }
    
    //Chataccess

    //User erhält Zugriff auf einen Chat
    //User erhält Zugriff auf einen Chat
    add_Chataccess(chataccess){
        return this.#fetchAdvanced(this.#add_ChataccessURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chataccess)
        }).them((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChataccess);
            })
        })
    }

    get_allChataccess(){
        return this.#fetchAdvanced(this.#get_allChataccessURL()).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChataccess)
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

    update_Chataccess(chataccess){
        return this.#fetchAdvanced(this.#update_ChataccessURL(chataccess), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(chataccess)
           
          }).then((responseJSON) => { 
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseChataccess);
            })
          })
    }

    get_ChataccessByRoom(room){
        return this.#fetchAdvanced(this.#get_ChataccessByRoomURL(room)).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChataccess);
            })
        })
    }

    get_GroupchatsByProfil(id){
        return this.#fetchAdvanced(this.#get_GroupchatsByProfilURL(id)).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChatroom);
            })
        })
    }

    get_SinglechatsByProfil(id){
        return this.#fetchAdvanced(this.#get_SinglechatsByProfilURL(id)).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChatroom);
            })
        })
    }

    delete_targetedChataccess(id, room){
        return this.#fetchAdvanced(this.#delete_targetedChataccessURL(id, room), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChataccess);
            })
        })
    }


    //alle Chataccess für einen Nutzer
    // get_ChataccessForUser(profil){
    //     return this.#fetchAdvanced(this.#get_ChataccesForUserURL(profil)).then((responseJSON) => {
    //         let chataccesBOs = ChataccessBO.fromJSON(responseJSON);
    //         return new Promise(function (resolve) {
    //             resolve(chataccesBOs);
    //         })
    //     })
    // }


    getGroup(groupID) {
        return this.#fetchAdvanced(this.#getGroupURL(groupID)).then((responseJSON) => {
            let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
            // console.info(responseGroupBO);
            return new Promise(function (resolve) {
                resolve(responseGroupBO);
            })
        })
    }

    //Message

    add_Message(message){
        return this.#fetchAdvanced(this.#add_MessageURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(message)
        }).them((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseMessage);
            })
        })
    }

    get_allMessage(){
        return this.#fetchAdvanced(this.#get_allMessageURL()).then((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseMessage);
            })
        })
    }

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
        }).then((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseMessage);
            })
        })
    }

    update_Message(message){
        return this.#fetchAdvanced(this.#update_MessageURL(message), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(message)
           
          }).then((responseJSON) => { 
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseMessage);
            })
          })        
    }

    get_MessageByRoom(room){
        return this.#fetchAdvanced(this.#get_MessageByRoomURL(room)).then((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseMessage);
            })
        })
    }

    //Profile

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

  getMatches(profileID) {
    return this.#fetchAdvanced(this.#getMatchesURL(profileID)).then((responseJSON) => {
      let profileBOs = ProfileBO.fromJSON(responseJSON);
      // console.info(profileBOs);
      return new Promise(function (resolve) {
        resolve(profileBOs);
      })
    })
  }

    getRequestForProfile(profileID) {
        return this.#fetchAdvanced(this.#getRequestForProfileURL(profileID)).then((responseJSON) => {
            let profileBO = ProfileBO.fromJSON(responseJSON);
            console.info(profileBO);
            return new Promise(function (resolve) {
                resolve(profileBO);
            })
        })
    }

    getRequestForGroups(profileID) {
        return this.#fetchAdvanced(this.#getRequestForGroupURL(profileID)).then((responseJSON) => {
            let profileBO = ProfileBO.fromJSON(responseJSON);
            console.info(profileBO);
            return new Promise(function (resolve) {
                resolve(profileBO);
            })
        })
    }

    getAllRequests = () => {
        return this.#fetchAdvanced(this.#getAllRequestURL())
            .then((responseJSON) => {
                let RequestBOs = RequestBO.fromJSON(responseJSON);
                console.log(RequestBOs)
                return new Promise(function (resolve) {
                    resolve(RequestBOs);
                })
            })
    }


    // deleteRequest(ID1, ID2) {
    //     return this.#fetchAdvanced(this.#deleteRequestURL(ID1, ID2), {
    //         method: 'DELETE'
    //     }).then((responseJSON) => {
    //         let responseRequestBO = RequestBO.fromJSON(responseJSON)[0];
    //         return new Promise(function (resolve) {
    //             resolve(responseRequestBO);
    //         })
    //     })
    // }



    addRequest(profileBO){
        return this.#fetchAdvanced(this.#addRequestURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(profileBO)
        }).then((responseJSON) => {
            let responseProfileBO = ProfileBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(responseProfileBO);
            })
        })
    }

    deleteRequest(requestID) {
        return this.#fetchAdvanced(this.#deleteRequestURL(requestID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseRequestBO = RequestBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseRequestBO);
            })
        })
    }


}