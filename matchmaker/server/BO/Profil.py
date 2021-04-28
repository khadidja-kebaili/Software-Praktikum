from matchmaking_V.server.BO.Businessobjects import BusinessObject

class Studentprofil (BusinessObject):
    def __init__(self):
        super().__init__()
        self.name = "",
        self.vorname = "",
        self.alter = "",
        self.semester = "",
        self.studiengang = "",
        self.hobbies = "",
        self.interessen = "",
        self.persönlichkeit = "",
        self.lerntyp = "",
        self.lernzeitraum = "",
        self.lernort = "",
        self.lernfrequenz = "",
        self.berufserfahrung = "",
        self.email = "",
        self.password = ""

    def set_name(self, value):
        self.name = value

    def get_name(self):
        return self.name

    def set_vorname(self, value):
        self.vorname = value

    def get_vorname(self):
        return self.vorname

    def set_alter(self, value):
        self.alter = value

    def get_alter(self):
        return self.alter

    def get_semester(self):
        """Auslesen des Benutzernamens."""
        return self.semester

    def set_semester(self, value):
        """Setzen des Benutzernamens."""
        self.semester = value

    def get_studiengang(self):
        """Auslesen des Benutzernamens."""
        return self.studiengang

    def set_studiengang(self, value):
        """Setzen des Benutzernamens."""
        self.studiengang = value

    def set_hobbies(self, value):
        self.hobbies = value

    def get_hobbies(self):
        return self.hobbies

    def set_interessen(self, value):
        self.interessen = value

    def get_interessen(self):
        return self.interessen

    def set_persönlichkeit(self, value):
        self.persönlichkeit = value

    def get_persönlichkeit(self):
        return self.persönlichkeit

    def set_lerntyp(self, value):
        self.lerntyp = value

    def get_lerntyp(self):
        return self.lerntyp

    def set_lernzeitraum(self, value):
        self.lernzeitraum = value

    def get_lernzeitraum(self):
        return self.lernzeitraum

    def set_lernort(self, value):
        self.lernort = value

    def get_lernort(self):
        return self.lernort

    def set_lernfrequenz(self, value):
        self.lernfrequenz = value

    def get_lernfrequenz(self):
        return self.lernfrequenz

    def set_berufserfahrung(self, value):
        self.berufserfahrung = value

    def get_berufserfahrung(self):
        return self.berufserfahrung

    def get_email(self):
        """Auslesen der E-Mail-Adresse."""
        return self.email

    def set_email(self, value):
        """Setzen der E-Mail-Adresse."""
        self.email = value

    def set_password(self,value):
        self.password = value

    def get_password(self):
        return self.password



    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "User: {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}".format(self.get_id(), self.email, self.password, self.get_name(), self.get_vorname(), self.get_alter(), self.get_semester(), self.get_studiengang(), self.get_hobbies(), self.get_interessen(), self.get_persönlichkeit(), self.get_lernort(), self.get_lernzeitraum(), self.get_lernfrequenz(), self.get_lerntyp(), self.get_berufserfahrung())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = Studentprofil()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_vorname(dictionary["vorname"])
        obj.set_alter(dictionary["alter"])
        obj.set_semester(dictionary["semester"])
        obj.set_studiengang(dictionary["studiengang"])
        obj.set_hobbies(dictionary["hobbies"])
        obj.set_interessen(dictionary["interessen"])
        obj.set_persönlichkeit(dictionary["persönlichkeit"])
        obj.set_lerntyp(dictionary["lerntyp"])
        obj.set_lernzeitraum(dictionary["lernzeitraum"])
        obj.set_lernort(dictionary["lernort"])
        obj.set_lernfrequenz(dictionary["lernfrequenz"])
        obj.set_berufserfahrung(dictionary["berufserfahrung"])
        obj.set_password(dictionary["password"])
        obj.set_email(dictionary["email"])
        return obj