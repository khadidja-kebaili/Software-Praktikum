import BusinessObject from "./BusinessObject.js"

/**
 *  @author [Khadidja Kebaili](https://github.com/Khadidja-Kebaili)
 *  @coauthor: [Lena Tolamtschow] (https://github.com/LenaTolmatschow)
 */

export default class GroupBO extends BusinessObject{

    /**
     *
     * @param {string} groupname - Id einer ProfileBO
     * @param {int} admin - Id des Admins
     * @param {string} description - Gruppenbeschreibung
     * @param {int} chatid - ID des zugegörigen Chatrooms.
     */

    constructor(groupname, admin, description, chatid) {
        super();
        this.groupname = groupname
        this.admin = admin
        this.description = description
        this.chatid = chatid

    }

    /**
     * Setzt Gruppenname
     */

    setGroupname(groupname) {
        this.groupname = groupname;
    }

    /**
     * Gibt Gruppennamen zurück
     */

    getGroupname() {
        return this.groupname;
    }

    /**
     * Setzt Gruppenadmin
     * @param admin
     */
    setAdmin (admin) {
        this.admin = admin;
    }

    /**
     * Gibt Gruppenadmin zurück
     * @returns {Number}
     */
    getAdmin() {
        return this.admin;
    }

    /**
     * Setzt Gruppenbeschreibung
     * @param description
     */
    setDescription (description) {
        this.description = description;
    }

    /**
     * gibt Gruppenbeschreibung zurück
     * @returns {string}
     */
    getDescription() {
        return this.description;
    }

    /**
     * Setzt die zugehörige Chatid
     * @param chatid
     */
    setChatid (chatid) {
        this.chatid = chatid;
    }

    /**
     * Gibt zugehörige Chatid zurück
     * @returns {Number}
     */
    getChatid() {
        return this.chatid;
    }

    /**
     * Nimmt JSON-Objekte und wandelt sie in einen Array um mit GroupBOs.
     * @param group
     * @returns {[GroupBO]}
     */
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
