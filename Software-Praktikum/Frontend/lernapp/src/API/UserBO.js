import BusinessObject from "./BusinessObject.js"

export default class UserBO extends BusinessObject{

    constructor(name, email, user_id) {
        super();
        this.name = name
        this.email = email
        this.user_id = user_id

    }

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
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = user;
            Object.setPrototypeOf(c, UserBO.prototype);
            result.push(c);
        }

        return result;
    }
}
