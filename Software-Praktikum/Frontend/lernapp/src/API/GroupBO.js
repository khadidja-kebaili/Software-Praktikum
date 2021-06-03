import BusinessObject from "./BusinessObject.js"

export default class GroupBO extends BusinessObject{

	constructor(groupname, id, member, admin, description,) {
		super();
		this.groupname = groupname;
		this.groupID = id;
		this.member= member;
		this.admin = admin;
		this.description = description;
	
		
	  }
 
	  setGroupname(groupname) {
		this.groupname = groupname;
	  }
	
	
	  getGroupname() {
		return this.groupname;
	  }


	  setGroupID(id) {
		this.groupID = id;
	  }

	  getGroupID() {
		return this.groupID;
	  }

	  setMember (member) {
		this.member = member;
	  }
	
	
	  getMember() {
		return this.member;
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
    