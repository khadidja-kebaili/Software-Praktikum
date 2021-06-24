import BusinessObject from "./Businessobject.js"

export default class GroupBO extends BusinessObject{

    constructor(groupname, admin, description, chatid) {
        super();
        this.groupname = groupname;
        this.admin = admin;
        this.description = description;
        this.chatid = chatid;

    }

    setGroupname(groupname) {
        this.groupname = groupname;
    }

    getGroupname() {
        return this.groupname;
    }

    setAdmin (admin) {
        this.admin = admin;
    }

    getAdmin() {
        return this.admin;
    }

    setDescription (description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setChatID(chatroomid){
        this.chatroomid = chatroomid;
    }

    getChatID(){
        return this.chatid;
    }


    static fromJSON(group) {
        let result = [];

        if (Array.isArray(group)) {
            group.forEach((c) => {
                Object.setPrototypeOf(c, GroupBO.prototype);
                result.push(c);
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = group;
            Object.setPrototypeOf(c, GroupBO.prototype);
            result.push(c);
        }

        return result;
    }
}
