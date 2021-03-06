import GroupBO from "./GroupBO";
import ProfileBO from "./ProfileBO";
import MessageBO from './MessageBO';
import ChatroomBO from './ChatroomBO';
import ChataccessBO from './ChataccessBO';
import RequestBO from "./RequestBO";
import UserBO from "./UserBO";


export default class LernappAPI {

    static #api = null;


    #lernappServerBaseURL = '/api';

    //Group

    #addGroupURL = () => `${this.#lernappServerBaseURL}/group`;
    #getGroupURL = (id) => `${this.#lernappServerBaseURL}/group/${id}`;
    // #deleteGroupURL = (id) =>`${this.#lernappServerBaseURL}/group/${id}`;
    #getAllGroupsURL = () => `${this.#lernappServerBaseURL}/group`;
    #get_Groups_of_ProfileURL = (id) => `${this.#lernappServerBaseURL}/groups_of_profile/${id}`;
    #addMemberURL = () => `${this.#lernappServerBaseURL}/chataccess_new_member`;
    #leaveGroupURL = (id) => `${this.#lernappServerBaseURL}/chataccess/${id}`;
    #getMembersForGroupURL = (id) => `${this.#lernappServerBaseURL}/chataccess_member/${id}`;
    #updateGroupURL = (id) => `${this.#lernappServerBaseURL}/group/${id}`;


    //Chatroom

    #addChatroomURL = () => `${this.#lernappServerBaseURL}/chatroom`;
    #getAllChatroomURL = () => `${this.#lernappServerBaseURL}/chatroom`;
    #getChatroomURL = (id) => `${this.#lernappServerBaseURL}/chatroom/${id}`;
    #deleteChatroomURL = (id) => `${this.#lernappServerBaseURL}/chatroom/${id}`;
    #updateChatroomURL = (id) => `${this.#lernappServerBaseURL}/chatroom/${id}`;
    #getLatestChatroomURL = () => `${this.#lernappServerBaseURL}/singlechatroom`;
   

    //Request

    #getRequestForProfileURL = (id) => `${this.#lernappServerBaseURL}/request_for_profile/${id}`;
    #getRequestForGroupURL = (id) => `${this.#lernappServerBaseURL}/request_for_groups/${id}`;
    // #deleteRequestURL = (id1,id2) => `${this.#lernappServerBaseURL}/delete_request/${id1}/requested_by/${id2}`;
    #addRequestURL = () => `${this.#lernappServerBaseURL}/requests`;
    #getAllRequestURL = () => `${this.#lernappServerBaseURL}/requests`;
    #deleteRequestURL = (id1) => `${this.#lernappServerBaseURL}/request/${id1}`;
    #getProfileOfReqeustURL = (id) => `${this.#lernappServerBaseURL}/profile_of_request/${id}`;


    //Chataccess

    #addChataccessURL = () => `${this.#lernappServerBaseURL}/chataccess`;
    #getAllChataccessURL = () => `${this.#lernappServerBaseURL}/chataccess`;
    #getChataccessURL = (id) => `${this.#lernappServerBaseURL}/chataccess/${id}`;
    #deleteChataccessURL = (id) => `${this.#lernappServerBaseURL}/chataccess/${id}`;
    #updateChataccessURL = (id) => `${this.#lernappServerBaseURL}/chataccess/${id}`;

    #getChataccessByRoomURL = (room) => `${this.#lernappServerBaseURL}/chataccess_member/${room}`;
    #getChataccessByProfileURL = (id) => `${this.#lernappServerBaseURL}/chataccess_chats/${id}`;

    #getGroupchatsByProfilURL = (id) => `${this.#lernappServerBaseURL}/chataccess_groupchat/${id}`;
    #getSinglechatsByProfilURL = (id) => `${this.#lernappServerBaseURL}/chataccess_singlechat/${id}`;

    #getChatpartnerURL = (room, id) => `${this.#lernappServerBaseURL}/chataccess_partner/${room}/profile/${id}`;

    #deleteTargetedChataccessURL = (id, room) => `${this.#lernappServerBaseURL}/chataccess_delete/${id}/room/${room}`;

    //Message

    #addMessageURL = () => `${this.#lernappServerBaseURL}/message`;
    #getAllMessageURL = () => `${this.#lernappServerBaseURL}/message`;
    #getMessageURL = (id) => `${this.#lernappServerBaseURL}/message/${id}`;
    #deleteMessageURL = (id) => `${this.#lernappServerBaseURL}/message/${id}`;
    #updateMessageURL = (id) => `${this.#lernappServerBaseURL}/message/${id}`;
    #getMessageByRoomURL = (room) => `${this.#lernappServerBaseURL}/chatroom_message/${room}`;

    //Profile

    #addProfileURL = () => `${this.#lernappServerBaseURL}/profile`;
    #getProfileURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;
    #deleteProfileURL = (id) =>`${this.#lernappServerBaseURL}/profile/${id}`;
    #updateProfileURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;
    #searchMemberURL = (memberName) => `${this.#lernappServerBaseURL}/profiles-by-name/${memberName}`;

    //Matches
    #getMatchesURL = (id) => `${this.#lernappServerBaseURL}/matches/${id}`;

    //User
    #getUserURL = (id) => `${this.#lernappServerBaseURL}/user/${id}`;


    static getAPI() {
        if (this.#api == null){
            this.#api = new LernappAPI();}
        return this.#api;
    }



    #fetchAdvanced = (url, init) => fetch(url,init)
        .then(res => {
                if (!res.ok) {
                    throw Error(`${res.status} ${res.statusText}`);
                }
                return res.json();
            }
        )


    getUserByGoogleUserId (id){
        return this.#fetchAdvanced(this.#getUserURL(id))
            .then((responseJSON) => {
                let UserBOs = UserBO.fromJSON(responseJSON);
                return new Promise (function(resolve){
                console.log(UserBOs)
                resolve(UserBOs);
                })
                })
                }


    getAllGroups() {
        return this.#fetchAdvanced(this.#getAllGroupsURL())
            .then((responseJSON) => {
                let GroupBOs = GroupBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(GroupBOs);
                })
            })
    }

    getGroupsForProfile(id){
        return this.#fetchAdvanced(this.#get_Groups_of_ProfileURL(id))
            .then((responseJSON)=>{
                let GroupBOs = GroupBO.fromJSON(responseJSON);
                return new Promise(function (resolve){
                    resolve(GroupBOs)
                })
            })
    }


    //Chatroom Methoden

    addChatroom(chatroom){
        return this.#fetchAdvanced(this.#addChatroomURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chatroom)
        }).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChatroom);
            })
        })
    }

    getAllChatroom(){
        return this.#fetchAdvanced(this.#getAllChatroomURL()).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChatroom)
            })
        })
    }

    getChatroom(chatroom){
        return this.#fetchAdvanced(this.#getChatroomURL(chatroom)).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve) {
                resolve(responseChatroom);
            })
        })
    }

    deleteChatroom(chatroom){
        return this.#fetchAdvanced(this.#deleteChatroomURL(chatroom), {
            method: 'DELETE'
        }).them((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChatroom);
            })
        })
    }

    updateChatroom(chatroom){
        return this.#fetchAdvanced(this.#updateChatroomURL(chatroom), {
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

    getLatestChatroom(){
        return this.#fetchAdvanced(this.#getLatestChatroomURL()).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChatroom)
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
    
    //Gruppenmitglied hinzuf??gen
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
    //Gruppe verlassen
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
    //Mitglieder f??r Gruppe finden
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

    //Mitglied nach Nachnamen suchen
    searchMember(memberName) {
        return this.#fetchAdvanced(this.#searchMemberURL(memberName)).then((responseJSON) => {
          let memberBOs = ProfileBO.fromJSON(responseJSON);
          // console.info(memberBOs);
          return new Promise(function (resolve) {
            resolve(memberBOs);
          })
        })
      }
      

    updateGroup(groupBO){
        return this.#fetchAdvanced(this.#updateGroupURL(groupBO.getID()), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(groupBO)
      
          }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON
            let responsegroupBO = GroupBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
              resolve(responsegroupBO);
            })
        })
    }
      
    //Chataccess

    //User erh??lt Zugriff auf einen Chat
    addChataccess(chataccess){
        return this.#fetchAdvanced(this.#addChataccessURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chataccess)
        }).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChataccess);
            })
        })
    }

    getAllChataccess(){
        return this.#fetchAdvanced(this.#getAllChataccessURL()).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChataccess)
            })
        })
    }

    //einen Chataccess zur??ckgeben nach Id
    getChataccess(id){
        return this.#fetchAdvanced(this.#getChataccessURL(id)).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve) {
                resolve(responseChataccess);
            })
        })
    }

    //Zugriff wegnehmen von einem User
    deleteChataccess(chataccess){
        return this.#fetchAdvanced(this.#deleteChataccessURL(chataccess), {
            method: 'DELETE'
        }).them((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseChataccess);
            })
        })
    }

    updateChataccess(chataccess){
        return this.#fetchAdvanced(this.#updateChataccessURL(chataccess), {
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

    getChataccessByRoom(room){
        return this.#fetchAdvanced(this.#getChataccessByRoomURL(room)).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChataccess);
            })
        })
    }

    getGroupchatsByProfil(id){
        return this.#fetchAdvanced(this.#getGroupchatsByProfilURL(id)).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChatroom);
            })
        })
    }

    getSinglechatsByProfil(id){
        return this.#fetchAdvanced(this.#getSinglechatsByProfilURL(id)).then((responseJSON) => {
            let responseChatroom = ChatroomBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChatroom);
            })
        })
    }

    getChatpartner(room, id){
        return this.#fetchAdvanced(this.#getChatpartnerURL(room, id)).then((responseJSON) => {
            let responseChataccess = ProfileBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChataccess);
            })
        })
    }

    getChataccessByProfile(id){
    return this.#fetchAdvanced(this.#getChataccessByProfileURL(id)).then((responseJSON) => {
        let responseChatroom = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
            resolve(responseChatroom);
        })
    })}

    deleteTargetedChataccess(id, room){
        return this.#fetchAdvanced(this.#deleteTargetedChataccessURL(id, room), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChataccess);
            })
        })
    }


    //alle Chataccess f??r einen Nutzer
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

    addMessage(messageBO){
        return this.#fetchAdvanced(this.#addMessageURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(messageBO)
        }).then((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseMessage);
            })
        })
    }

    getAllMessage(){
        return this.#fetchAdvanced(this.#getAllMessageURL()).then((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseMessage);
            })
        })
    }

    getMessage(message){
        return this.#fetchAdvanced(this.#getMessageURL(message)).then((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve) {
                resolve(responseMessage);
            })
        })
    }

    deleteMessage(message){
        return this.#fetchAdvanced(this.#deleteMessageURL(message), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responseMessage);
            })
        })
    }

    updateMessage(message){
        return this.#fetchAdvanced(this.#updateMessageURL(message), {
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

    getMessageByRoom(room){
        return this.#fetchAdvanced(this.#getMessageByRoomURL(room)).then((responseJSON) => {
            let responseMessage = MessageBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseMessage);
            })
        })
    }

    //Profile

    //Erstellen von Profil
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

  //Updaten von Profil
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
  
  //Profil des Users holen
  getProfile(profileID) {
    return this.#fetchAdvanced(this.#getProfileURL(profileID)).then((responseJSON) => {
      let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
      // console.info(responseProfileBO);
      return new Promise(function (resolve) {
        resolve(responseProfileBO);
      })
    })
  }
  //Profil l??schen
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
            let requestBOs = RequestBO.fromJSON(responseJSON);
            // console.info(profileBO);
            return new Promise(function (resolve) {
                resolve(requestBOs);
            })
        })
    }

    getRequestForGroups(profileID) {
        return this.#fetchAdvanced(this.#getRequestForGroupURL(profileID)).then((responseJSON) => {
            let requestBO = RequestBO.fromJSON(responseJSON);
            console.info(requestBO);
            return new Promise(function (resolve) {
                resolve(requestBO);
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


    deleteRequest(ID1) {
        return this.#fetchAdvanced(this.#deleteRequestURL(ID1), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseRequestBO = RequestBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseRequestBO);
            })
        })
    }



    addRequest(requestBO){
        return this.#fetchAdvanced(this.#addRequestURL(requestBO), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(requestBO)
        }).then((responseJSON) => {
            let responseRequestBO = RequestBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(responseRequestBO);
            })
        })
    }

    // deleteRequest(requestID) {
    //     return this.#fetchAdvanced(this.#deleteRequestURL(requestID), {
    //         method: 'DELETE'
    //     }).then((responseJSON) => {
    //         let responseRequestBO = RequestBO.fromJSON(responseJSON)[0];
    //         return new Promise(function (resolve) {
    //             resolve(responseRequestBO);
    //         })
    //     })
    // }

    getProfileOfRequest(currentUser) {
        return this.#fetchAdvanced(this.#getProfileOfReqeustURL(currentUser)).then((responseJSON) => {
            let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
            // console.info(responseProfileBO);
            return new Promise(function (resolve) {
                resolve(responseProfileBO);
            })
        })
    }


}