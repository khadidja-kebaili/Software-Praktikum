from matchmaking_V.server.BO.Businessobjects import BusinessObject


class Studentprofil(BusinessObject):
    def __init__(self):
        super().__init__()
        self.name = "",
        self.semester = "",
        self.fakultaet = "",
        self.lerntyp = "",
        self.lernort = "",
        self.lernfrequenz = "",
        self.id = ""

    def set_id(self, value):
        self.id = value

    def get_id(self):
        return self.id

    def set_name(self):
        return self.name

    def get_name(self):
        return self.name

    def get_semester(self):
        """Auslesen des Benutzernamens."""
        return self.semester

    def set_semester(self, value):
        """Setzen des Benutzernamens."""
        self.semester = value

    def get_fakultaet(self):
        """Auslesen des Benutzernamens."""
        return self.studiengang

    def set_fakultaet(self, value):
        """Setzen des Benutzernamens."""
        self.studiengang = value

    def set_lerntyp(self, value):
        self.lerntyp = value

    def get_lerntyp(self):
        return self.lerntyp

    def set_lernort(self, value):
        self.lernort = value

    def get_lernort(self):
        return self.lernort

    def set_lernfrequenz(self, value):
        self.lernfrequenz = value

    def get_lernfrequenz(self):
        return self.lernfrequenz

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "User: {}, {}, {}, {}, {}, {}, {}".format(
                                                                                     self.get_semester(),
                                                                                     self.get_fakultaet(),
                                                                                     self.get_lernort(),
                                                                                     self.get_lernfrequenz(),
                                                                                     self.get_lerntyp(),
                                                                                     self.get_id(),
                                                                                     self.get_name())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = Studentprofil()
        obj.set_id(dictionary["id"])
        obj.set_semester(dictionary["semester_id"])
        obj.set_fakultaet(dictionary["fakultaet"])
        obj.set_lerntyp(dictionary["learntype_ids"])
        obj.set_lernort(dictionary["learnplace_id"])
        obj.set_lernfrequenz(dictionary["lernfrequenz"])
        obj.set_name(dictionary["name"])
        return obj

