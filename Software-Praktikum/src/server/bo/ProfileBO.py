from .Businessobject import Businessobject


class Studentprofile (Businessobject):
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
