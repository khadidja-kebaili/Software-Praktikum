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
    #get_allChatroomURL = () => '${this.#lernappServerBaseURL}/chatroom';
    #get_ChatroomURL = (id) => '${this.#lernappServerBaserURL}/chatroom/${id}';
    #delete_ChatroomURL = (id) => '${this.#lernappServerBaserURL}/chatroom/${id}';
    #update_ChatroomURL = (id) => '${this.#lernappServerBaserURL}/chatroom/${id}';

    //Chataccess
    #add_ChataccessURL = () => '${this.#lernappServerBaseURL}/chataccess';
    #get_allChataccessURL = () => '${this.#lernappServerBaseURL}/chataccess';
    #get_ChataccessURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';
    #delete_ChataccessURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';
    #update_ChataccessURL = (id) => '${this.#lernappServerBaseURL}/chataccess/${id}';

    #get_ChataccessByRoomURL = (room) => '${this.#lernappServerBaseURL}/chataccess_member/${room}';
    #get_GroupchatsByProfilURL = (id) => '${this.#lernappServerBaseURL}/chataccess_groupchat/${id}';
    #get_SinglechatsByProfilURL = (id) => '${this.#lernappServerBaseURL}/chataccess_singlechat/${id}';

    #delete_targetedChataccessURL = (id, room) => '${this.#lernappServerBaseURL}/chataccess/${id}/${room}';

    //Message
    #add_MessageURL = () => '${this.#lernappServerBaseURL}/messages';
    #get_allMessageURL = () => '${this.#lernappServerBaseURL}/messages'
    #get_MessageURL = (id) => '${this.#lernappServerBaseURL}/messages/${id}';
    #delete_MessageURL = (id) => '${this.#lernappServerBaseURL}/messages/${id}';
    #update_MessageURL = (id) => '${this.#lernappServerBaseURL}/messages/${id}';
    #get_MessageByRoomURL = (room) => '${this.#lernappServerBaseURL}/chatroom_message/${room]';

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

    //Chataccess Methoden

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
            body: JSON.stringify(profileBO)
           
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
            let responseChataccess = ChataccessBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChataccess);
            })
        })
    }

    get_SinglechatsByProfil(id){
        return this.#fetchAdvanced(this.#get_SinglechatsByProfilURL(id)).then((responseJSON) => {
            let responseChataccess = ChataccessBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(responseChataccess);
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

    //Messages Methoden

    //Message hinzufügen
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


  
}