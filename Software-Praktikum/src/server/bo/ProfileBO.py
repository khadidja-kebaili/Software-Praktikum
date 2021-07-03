from .Businessobject import Businessobject


class Studentprofile (Businessobject):
    """Realisierung einer exemplarischen Profilklasse."""

    def __init__(self):
        super().__init__()
        self.last_name = "",  # Der Nachname der Person mit dem Profil
        self.first_name = "",  # Der Vorname der Person mit dem Profil
        self.age = "",  # Das Alter der Person mit dem Profil
        self.semester = "",  # Das momentane Semester der Person mit dem Profil
        self.major = "",  # Der Studiengang der Person mit dem Profil
        self.hobbys = "",  # Die Hobbies der Person mit dem Profil
        self.interests = "",  # Die Interessen der Person mit dem Profil
        self.personality = "",  # Wie extrovertiert/introvertiert die Person mit dem Profil ist
        self.learnstyle = "",  # Der Lerntyp der Person mit dem Profil
        self.studytime = "",  # Die bevorzugte Lernzeit der Person mit dem Profil
        self.studyplace = "",  # Der bevorzugte Lernort der Person mit dem Profil
        self.studyfrequence = "",  # Die bevorzugte Lernfrequenz der Person mit dem Profil
        self.workexperience = ""  # Die vorhandene Berufserfahrung der Person mit dem Profil

    def set_last_name(self, value):
        """Setzen des Nachnamens"""
        self.last_name = value

    def get_last_name(self):
        """Auslesen des Nachnamens"""
        return self.last_name

    def set_first_name(self, value):
        """Setzen des Vornamens"""
        self.first_name = value

    def get_first_name(self):
        """Auslesen des Vornamens"""
        return self.first_name

    def set_age(self, value):
        """Setzen des Alters"""
        self.age = value

    def get_age(self):
        """Auslesen des Alters"""
        return self.age

    def get_semester(self):
        """Auslesen des Semesters."""
        return self.semester

    def set_semester(self, value):
        """Setzen des Semesters."""
        self.semester = value

    def get_major(self):
        """Auslesen des Studiengang."""
        return self.major

    def set_major(self, value):
        """Setzen des Studiengang."""
        self.major = value

    def set_hobbys(self, value):
        """Setzen der Hobbies"""
        self.hobbys = value

    def get_hobbys(self):
        """Auslesen der Hobbies"""
        return self.hobbys

    def set_interests(self, value):
        """Setzen der Interessen"""
        self.interests = value

    def get_interests(self):
        """Auslesen der Interessen"""
        return self.interests

    def set_personality(self, value):
        """Setzen der Persönlichkeit"""
        self.personality = value

    def get_personality(self):
        """Auslesen der Persönlichkeit"""
        return self.personality

    def set_learnstyle(self, value):
        """Setzen des Lerntyps"""
        self.learnstyle = value

    def get_learnstyle(self):
        """Auslesen des Lerntyps"""
        return self.learnstyle

    def set_studytime(self, value):
        """Setzen der bevorzugten Lernzeit"""
        self.studytime = value

    def get_studytime(self):
        """Auslesen der bevorzugten Lernzeit"""
        return self.studytime

    def set_studyplace(self, value):
        """Setzen des bevorzugten Lernorts"""
        self.studyplace = value

    def get_studyplace(self):
        """Auslesen des bevorzugten Lernorts"""
        return self.studyplace

    def set_studyfrequence(self, value):
        """Setzen der Lernfrequenz"""
        self.studyfrequence = value

    def get_studyfrequence(self):
        """Auslesen der Lernfrequenz"""
        return self.studyfrequence

    def set_workexperience(self, value):
        """Setzen der Berufserfahrung"""
        self.workexperience = value

    def get_workexperience(self):
        """Auslesen der Berufserfahrung"""
        return self.workexperience

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Profile: {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}".format(self.get_last_name(), self.get_first_name(), self.get_age(), self.get_semester(), self.get_major(), self.get_hobbys(), self.get_interests(), self.get_personality(), self.get_studyplace(), self.get_studytime(), self.get_studyfrequence(), self.get_learnstyle(), self.get_workexperience())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Profil()."""
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
