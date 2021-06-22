import BusinessObject from "./Businessobject.js";


export default class RequestBO extends BusinessObject {

    constructor(arequested, arequested_by, arequest_date ) {
        super();
        this.requested = arequested;
        this.requested_by = arequested_by;
        this.request_date =  arequest_date;
    }


    setRequested(arequested) {
        this.requested = arequested;
    }


    getFirstname() {
        return this.requested;
    }

    setRequestedBy(requester){
        this.requested_by = requester;
    }

    getRequestedBY(){
        return this.requested_by
    }

    setRequestDate(requestDate){
        this.request_date = requestDate;
    }

    getRequestDate(){
        return this.request_date
    }


    static fromJSON(profile) {
        let result = [];

        if (Array.isArray(profile)) {
            profile.forEach((c) => {
                Object.setPrototypeOf(c, RequestBO.prototype);
                result.push(c);
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = profile;
            Object.setPrototypeOf(c, RequestBO.prototype);
            result.push(c);
        }

        return result;
    }
}
