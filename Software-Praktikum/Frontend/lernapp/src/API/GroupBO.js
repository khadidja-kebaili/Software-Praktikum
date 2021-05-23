import BusinessObject from "./BusinessObject"
export default class GroupBO extends BusinessObject{

	constructor(groupname, id, member,admin, description,) {
		super();
		this.Groupname = groupname;
		this.GroupID = id;
		this.Member= member;
		this.Admin = admin;
		this.description = description;
	
		
	  }
 
	  setGroupname(groupname) {
		this.Groupname = groupname;
	  }
	
	
	  getGroupname() {
		return this.Groupname;
	  }


	  setGroupID(id) {
		this.GroupID = id;
	  }

	  getGroupID() {
		return this.GroupID;
	  }

	  setMember (member) {
		this.Member = member;
	  }
	
	
	  getMember() {
		return this.Member;
	  }

	  setAdmin (admin) {
		this.Admin = admin;
	  }
	
	
	  getAdmin() {
		return this.Admin;
	  }

	  setDescription (description) {
		this.Description = description;
	  }
	
	
	  getDescription() {
		return this.Description;
	  }


    static fromJSON(Group) {
		let results = null;
		if (Array.isArray(Group)) {
			results = [];
			Group.forEach((c) => {
				Object.setPrototypeOf(c, GroupBO.prototype);
				results.push(c);
			})
		} else {
			
			let c = Group;
			Object.setPrototypeOf(c, Group.prototype);
			results = c;
		}
		return results;
	}
}