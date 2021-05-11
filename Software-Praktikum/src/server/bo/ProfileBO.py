from .Businessobject import BusinessObject


class Studentprofile (BusinessObject):
    def __init__(self):
        super().__init__()
        self.last_name = "",
        self.first_name = "",
        self.age = "",
        self.semester = "",
        self.major = "",
        self.hobbys = "",
        self.interests = "",
        self.personality = "",
        self.learnstyle = "",
        self.studytime = "",
        self.studyplace = "",
        self.studyfrequence = "",
        self.workexperience = ""

    def set_last_name(self, value):
        self.last_name = value

    def get_last_name(self):
        return self.last_name

    def set_first_name(self, value):
        self.first_name = value

    def get_first_name(self):
        return self.first_name

    def set_age(self, value):
        self.age = value

    def get_age(self):
        return self.age

    def get_semester(self):
        """Auslesen des Benutzernamens."""
        return self.semester

    def set_semester(self, value):
        """Setzen des Benutzernamens."""
        self.semester = value

    def get_major(self):
        """Auslesen des Benutzernamens."""
        return self.major

    def set_major(self, value):
        """Setzen des Benutzernamens."""
        self.major = value

    def set_hobbys(self, value):
        self.hobbys = value

    def get_hobbys(self):
        return self.hobbys

    def set_interests(self, value):
        self.interests = value

    def get_interests(self):
        return self.interests

    def set_personality(self, value):
        self.personality = value

    def get_personality(self):
        return self.personality

    def set_learnstyle(self, value):
        self.learnstyle = value

    def get_learnstyle(self):
        return self.learnstyle

    def set_studytime(self, value):
        self.studytime = value

    def get_studytime(self):
        return self.studytime

    def set_studyplace(self, value):
        self.studyplace = value

    def get_studyplace(self):
        return self.studyplace

    def set_studyfrequence(self, value):
        self.studyfrequence = value

    def get_studyfrequence(self):
        return self.studyfrequence

    def set_workexperience(self, value):
        self.workexperience = value

    def get_workexperience(self):
        return self.workexperience

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Profile: {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}".format(self.get_last_name(), self.get_first_name(), self.get_age(), self.get_semester(), self.get_major(), self.get_hobbys(), self.get_interests(), self.get_personality(), self.get_studyplace(), self.get_studytime(), self.get_studyfrequence(), self.get_learnstyle(), self.get_workexperience())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = Studentprofile()
        obj.set_id(dictionary["id"])
        obj.set_last_name(dictionary["last_name"])
        obj.set_first_name(dictionary["first_name"])
        obj.set_age(dictionary["age"])
        obj.set_semester(dictionary["semester"])
        obj.set_major(dictionary["major"])
        obj.set_hobbys(dictionary["hobbys"])
        obj.set_interests(dictionary["interests"])
        obj.set_personality(dictionary["personality"])
        obj.set_learnstyle(dictionary["learnstyle"])
        obj.set_studytime(dictionary["studytime"])
        obj.set_studyplace(dictionary["studyplace"])
        obj.set_studyfrequence(dictionary["studyfrequence"])
        obj.set_workexperience(dictionary["workexperience"])
        return obj

# from matchmaker_Prototype.server.BO.Businessobjects import BusinessObject
# from .Businessobject import BusinessObject


# class Studentprofil (BusinessObject):

#     def __init__(self):
#         super().__init__()
#         self.name = "",
#         self.vorname = "",
#         self.alter = "",
#         self.semester = "",
#         self.studiengang = "",
#         self.hobbies = "",
#         self.interessen = "",
#         self.persönlichkeit = "",
#         self.lerntyp = "",
#         self.lernzeitraum = "",
#         self.lernort = "",
#         self.lernfrequenz = "",
#         self.berufserfahrung = "",
#         self.email = "",
#         self.passwort = ""

#     def set_name(self, value):
#         self.name = value

#     def get_name(self):
#         return self.name

#     def set_vorname(self, value):
#         self.vorname = value

#     def get_vorname(self):
#         return self.vorname

#     def set_alter(self, value):
#         self.alter = value

#     def get_alter(self):
#         return self.alter

#     def get_semester(self):
#         """Auslesen des Benutzernamens."""
#         return self.semester

#     def set_semester(self, value):
#         """Setzen des Benutzernamens."""
#         self.semester = value

#     def get_studiengang(self):
#         """Auslesen des Benutzernamens."""
#         return self.studiengang

#     def set_studiengang(self, value):
#         """Setzen des Benutzernamens."""
#         self.studiengang = value

#     def set_hobbies(self, value):
#         self.hobbies = value

#     def get_hobbies(self):
#         return self.hobbies

#     def set_interessen(self, value):
#         self.interessen = value

#     def get_interessen(self):
#         return self.interessen

#     def set_persönlichkeit(self, value):
#         self.persönlichkeit = value

#     def get_persönlichkeit(self):
#         return self.persönlichkeit

#     def set_lerntyp(self, value):
#         self.lerntyp = value

#     def get_lerntyp(self):
#         return self.lerntyp

#     def set_lernzeitraum(self, value):
#         self.lernzeitraum = value

#     def get_lernzeitraum(self):
#         return self.lernzeitraum

#     def set_lernort(self, value):
#         self.lernort = value

#     def get_lernort(self):
#         return self.lernort

#     def set_lernfrequenz(self, value):
#         self.lernfrequenz = value

#     def get_lernfrequenz(self):
#         return self.lernfrequenz

#     def set_berufserfahrung(self, value):
#         self.berufserfahrung = value

#     def get_berufserfahrung(self):
#         return self.berufserfahrung

#     def get_email(self):
#         """Auslesen der E-Mail-Adresse."""
#         return self.email

#     def set_email(self, value):
#         """Setzen der E-Mail-Adresse."""
#         self.email = value

#     def set_passwort(self,value):
#         self.passwort = value

#     def get_passwort(self):
#         return self.passwort

#     def __str__(self):
#         """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
#         return "User: {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}".format(self.get_id(),
#                                                                                              self.email, self.passwort,
#                                                                                              self.get_name(),
#                                                                                              self.get_vorname(),
#                                                                                              self.get_alter(),
#                                                                                              self.get_semester(),
#                                                                                              self.get_studiengang(),
#                                                                                              self.get_hobbies(),
#                                                                                              self.get_interessen(),
#                                                                                              self.get_persönlichkeit(),
#                                                                                              self.get_lernort(),
#                                                                                              self.get_lernzeitraum(),
#                                                                                              self.get_lernfrequenz(),
#                                                                                              self.get_lerntyp(),
#                                                                                              self.get_berufserfahrung())

#     @staticmethod
#     def from_dict(dictionary=dict()):
#         """Umwandeln eines Python dict() in einen User()."""
#         obj = Studentprofil()
#         obj.set_id(dictionary["id"])
#         obj.set_name(dictionary["name"])
#         obj.set_vorname(dictionary["vorname"])
#         obj.set_alter(dictionary["alter"])
#         obj.set_semester(dictionary["semester"])
#         obj.set_studiengang(dictionary["studiengang"])
#         obj.set_hobbies(dictionary["hobbies"])
#         obj.set_interessen(dictionary["interessen"])
#         obj.set_persönlichkeit(dictionary["persönlichkeit"])
#         obj.set_lerntyp(dictionary["lerntyp"])
#         obj.set_lernzeitraum(dictionary["lernzeitraum"])
#         obj.set_lernort(dictionary["lernort"])
#         obj.set_lernfrequenz(dictionary["lernfrequenz"])
#         obj.set_berufserfahrung(dictionary["berufserfahrung"])
#         obj.set_passwort(dictionary["passwort"])
#         obj.set_email(dictionary["email"])
#         return obj