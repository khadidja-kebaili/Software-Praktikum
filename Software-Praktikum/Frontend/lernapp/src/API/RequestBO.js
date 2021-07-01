import BusinessObject from "./BusinessObject.js"

export default class RequestBO extends BusinessObject {
    constructor(Arequested_by, Arequested,Arequest_type, Agroup_id) {
      super();
      
      
      this.requested_by = Arequested_by;
      this.requested = Arequested;
      this.request_type = Arequest_type;
      this.group_id = Agroup_id
    }

    setRequestedBy(Arequested_by){
      this.requested_by = Arequested_by;
    }

    getRequestedBy(){
    return this.requested_by;
    }

    setGroupId(Agroup_id){
        this.group_id = Agroup_id;
    }

    getGroupId(){
        return this.group_id;
    }

    setRequested(Arequested){
        this.requested = Arequested;
    }

    getRequested(){
        return this.requested
    }

    setRequestType(Arequest_type){
        this.request_type = Arequest_type
    }

    getRequestType(){
        return this.request_type
    }

    static fromJSON(request) {
        let result = [];

        if (Array.isArray(request)) {
          request.forEach((c) => {
            Object.setPrototypeOf(c, RequestBO.prototype);
            result.push(c);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let c = request;
          Object.setPrototypeOf(c, RequestBO.prototype);
          result.push(c);
        }

        return result;
      }
    }