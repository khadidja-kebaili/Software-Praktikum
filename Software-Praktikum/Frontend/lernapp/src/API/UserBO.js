import BusinessObject from "./BusinessObject.js"

/**
 * @author [Mihriban Dogan](https://github.com/mihriban-dogan)
 */

export default class UserBO extends BusinessObject{
    /**
   * @param {*} name- Name des Users
   * @param {*} email - Google-Email des Users
   * @param {*} user_id- die User ID
   */

    constructor(name, email, user_id) {
        super();
        this.name = name
        this.email = email
        this.user_id = user_id

    }
    //Hier folgen die Setter und Getter der einzelnen Parameter

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setEmail (email) {
        this.email = email;
    }

    getEmail() {
        return this.email;
    }

    setUser_id (user_id) {
        this.user_id = user_id;
    }

    getUser_id() {
        return this.user_id;
    }


    static fromJSON(user) {
        let result = [];

        if (Array.isArray(user)) {
            user.forEach((c) => {
                Object.setPrototypeOf(c, UserBO.prototype);
                result.push(c);
            })
        } else {
            let c = user;
            Object.setPrototypeOf(c, UserBO.prototype);
            result.push(c);
        }

        return result;
    }
}
