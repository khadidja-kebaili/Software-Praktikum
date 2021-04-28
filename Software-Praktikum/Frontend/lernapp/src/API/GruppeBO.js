import BusinessObject from "./src/BusinessObject"

export default class GruppeBO extends BusinessObject{

	constructor(gname, id, Mitglieder,Admin, Beschreibung, img) {
		super();
		this.Gruppename = gname;
		this.GruppenID = id;
		this.Mitglieder = Mitglieder;
		this.Admin = Admin;
		this.Beschreibung = Beschreibung;
		this.Image = img;
		
	  }
 
	  setGruppename(gname) {
		this.Gruppename = gname;
	  }
	
	
	  getGruppename() {
		return this.Gruppename;
	  }


	  setGruppename(id) {
		this.GruppenID = id;
	  }

	  getGruppenID() {
		return this.GruppenID;
	  }

	  setMitglieder (Mitglieder) {
		this.Mitglieder = Mitglieder;
	  }
	
	
	  getMitglieder() {
		return this.Mitglieder;
	  }

	  setAdmin (Admin) {
		this.Admin = Admin;
	  }
	
	
	  getAdmin() {
		return this.Admin;
	  }

	  setBeschreibung (Beschreibung) {
		this.Beschreibung = Beschreibung;
	  }
	
	
	  getBeschreibung() {
		return this.Beschreibung;
	  }

	  setImage (img) {
		this.Image = img;
	  }
	
	  getImage() {
		return this.Image;
	  }

    static fromJSON(Gruppe) {
		let results = null;
		if (Array.isArray(Gruppe)) {
			results = [];
			Gruppe.forEach((c) => {
				Object.setPrototypeOf(c, GruppeBO.prototype);
				results.push(c);
			})
		} else {
			
			let c = Gruppe;
			Object.setPrototypeOf(c, Gruppe.prototype);
			results = c;
		}
		return results;
	}
}