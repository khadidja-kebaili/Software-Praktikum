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
        self.hobbies = "",  # Die Hobbies der Person mit dem Profil
        self.interests = "",  # Die Interessen der Person mit dem Profil
        self.personality = "",  # Wie extrovertiert/introvertiert die Person mit dem Profil ist
        self.learn_style = "",  # Der Lerntyp der Person mit dem Profil
        self.study_time = "",  # Die bevorzugte Lernzeit der Person mit dem Profil
        self.study_place = "",  # Der bevorzugte Lernort der Person mit dem Profil
        self.study_frequence = "",  # Die bevorzugte Lernfrequenz der Person mit dem Profil
        self.work_experience = ""  # Die vorhandene Berufserfahrung der Person mit dem Profil
        self.name = "",  # Der Name des Benutzers.
        self.email = "",  # Die E-Mail-Adresse des Benutzers.
        self.user_id = "",  # Die extern verwaltete User ID.

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

    def set_hobbies(self, value):
        """Setzen der Hobbies"""
        self.hobbies = value

    def get_hobbies(self):
        """Auslesen der Hobbies"""
        return self.hobbies

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

    def set_learn_style(self, value):
        """Setzen des Lerntyps"""
        self.learn_style = value

    def get_learn_style(self):
        """Auslesen des Lerntyps"""
        return self.learn_style

    def set_study_time(self, value):
        """Setzen der bevorzugten Lernzeit"""
        self.study_time = value

    def get_study_time(self):
        """Auslesen der bevorzugten Lernzeit"""
        return self.study_time

    def set_study_place(self, value):
        """Setzen des bevorzugten Lernorts"""
        self.study_place = value

    def get_study_place(self):
        """Auslesen des bevorzugten Lernorts"""
        return self.study_place

    def set_study_frequence(self, value):
        """Setzen der Lernfrequenz"""
        self.study_frequence = value

    def get_study_frequence(self):
        """Auslesen der Lernfrequenz"""
        return self.study_frequence

    def set_work_experience(self, value):
        """Setzen der Berufserfahrung"""
        self.work_experience = value

    def get_work_experience(self):
        """Auslesen der Berufserfahrung"""
        return self.work_experience


    def get_name(self):
        """Auslesen des Benutzernamens."""
        return self.name

    def set_name(self, value):
        """Setzen des Benutzernamens."""
        self.name = value

    def get_email(self):
        """Auslesen der E-Mail-Adresse."""
        return self.email

    def set_email(self, value):
        """Setzen der E-Mail-Adresse."""
        self.email = value

    def get_user_id(self):
        """Auslesen der externen User ID (z.B. Google ID)."""
        return self.user_id

    def set_user_id(self, value):
        """Setzen der externen User ID (z.B. Google ID)."""
        self.user_id = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Profile: {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {} ".format(
            self.get_last_name(), self.get_first_name(), self.get_age(), self.get_semester(),
            self.get_major(), self.get_hobbies(), self.get_interests(), self.get_personality(),
            self.get_study_place(), self.get_study_time(), self.get_study_frequence(),
            self.get_learn_style(), self.get_work_experience(), self.get_name(), self.get_email(),
            self.get_user_id())

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
        obj.set_hobbies(dictionary["hobbies"])
        obj.set_interests(dictionary["interests"])
        obj.set_personality(dictionary["personality"])
        obj.set_learn_style(dictionary["learn_style"])
        obj.set_study_time(dictionary["study_time"])
        obj.set_study_place(dictionary["study_place"])
        obj.set_study_frequence(dictionary["study_frequence"])
        obj.set_work_experience(dictionary["work_experience"])
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_user_id(dictionary["user_id"])
        return obj
