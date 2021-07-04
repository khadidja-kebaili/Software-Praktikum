from server.db.Mapper import Mapper
from server.bo.ProfileBO import Studentprofile


class StudentprofileMapper (Mapper):
    """Mapper-Klasse, die Profil-Objekte auf eine relationale
    Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def insert(self, studentprofile):
        """Einfügen eines neuen Profil-Objekts in die Datenbank"""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profile ")
        tuples = cursor.fetchall()

        # for (maxid) in tuples:
        #     if maxid[0] is not None:
        #         studentprofile.set_id(maxid[0] + 1)
        #     else:
        #         studentprofile.set_id(1)

        command = "INSERT INTO profile (id, first_name, last_name, age, semester, " \
                  "major, hobbies, interests, personality, learn_style, study_time, " \
                  "study_place, study_frequence, work_experience)" \
                  " VALUES (%s, %s,%s,%s, %s,%s,%s, %s,%s,%s, %s, %s,%s, %s)"
        data = (
            studentprofile.get_id(), 
            studentprofile.get_last_name(),
            studentprofile.get_first_name(),
            studentprofile.get_age(),
            studentprofile.get_semester(), 
            studentprofile.get_major(),
            studentprofile.get_hobbies(), 
            studentprofile.get_interests(),
            studentprofile.get_personality(), 
            studentprofile.get_learn_style(),
            studentprofile.get_study_time(), 
            studentprofile.get_study_place(),
            studentprofile.get_study_frequence(), 
            studentprofile.get_work_experience()
        )
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return studentprofile

    def find_all(self):
        """Auslesen aller Profile"""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute(
            "SELECT id, first_name, last_name, age, semester, major, hobbies, interests, personality, "
            "learn_style, study_time, study_place, study_frequence, work_experience FROM profile")
        tuples = cursor.fetchall()

        for (id, first_name, last_name, age, semester, major, hobbies, interests, personality, learn_style,
             study_time, study_place, study_frequence, work_experience) in tuples:
            profile = Studentprofile()
            profile.set_id(id)
            profile.set_first_name(first_name)
            profile.set_last_name(last_name)
            profile.set_age(age)
            profile.set_semester(semester)
            profile.set_major(major)
            profile.set_hobbies(hobbies)
            profile.set_interests(interests)
            profile.set_personality(personality)
            profile.set_learn_style(learn_style)
            profile.set_study_time(study_time)
            profile.set_study_place(study_place)
            profile.set_study_frequence(study_frequence)
            profile.set_work_experience(work_experience)
            result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Auslesen eines bestimmten Profils, anhand der gegebenen ID"""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, first_name, last_name, age, semester, major, hobbies, interests, " \
                  "personality, learn_style, study_time, study_place, study_frequence, work_experience " \
                  "FROM profile WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, first_name, last_name, age, semester, major, hobbies, interests, personality,
             learn_style, study_time, study_place, study_frequence, work_experience) = tuples[0]
            profile = Studentprofile()
            profile.set_id(id)
            profile.set_first_name(first_name)
            profile.set_last_name(last_name)
            profile.set_age(age)
            profile.set_semester(semester)
            profile.set_major(major)
            profile.set_hobbies(hobbies)
            profile.set_interests(interests)
            profile.set_personality(personality)
            profile.set_learn_style(learn_style)
            profile.set_study_time(study_time)
            profile.set_study_place(study_place),
            profile.set_study_frequence(study_frequence)
            profile.set_work_experience(work_experience)
            result = profile
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def update(self, studentprofile):
        """Wiederholtes Schreiben eines Objekts in die Datenbank"""

        cursor = self._cnx.cursor()

        command = "UPDATE profile " + "SET first_name=%s, last_name=%s, age=%s, semester=%s," \
                                      " major=%s, hobbies=%s, interests=%s, personality=%s, learn_style=%s, " \
                                      "study_time=%s, study_place=%s, study_frequence=%s, work_experience=%s  " \
                                      "WHERE id=%s"
        data = (
            studentprofile.get_last_name(),
            studentprofile.get_first_name(), 
            studentprofile.get_age(),
            studentprofile.get_semester(), 
            studentprofile.get_major(),
            studentprofile.get_hobbies(), 
            studentprofile.get_interests(),
            studentprofile.get_personality(), 
            studentprofile.get_learn_style(),
            studentprofile.get_study_time(), 
            studentprofile.get_study_place(),
            studentprofile.get_study_frequence(), 
            studentprofile.get_work_experience(), 
            studentprofile.get_id(),)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return studentprofile

    def delete(self, studentprofile):
        """Löschen der Daten eines Profil Objekts aus der Datenbank"""
        cursor = self._cnx.cursor()

        command = "DELETE FROM profile WHERE id={}".format(
            studentprofile.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def find_by_last_name(self, name):
        """Auslesen aller Kunden anhand des Nachnamen"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, first_name, last_name FROM profile WHERE last_name LIKE '{}' ORDER BY last_name".format(
            name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, first_name, last_name) in tuples:
            profile = Studentprofile()
            profile.set_id(id)
            profile.set_first_name(first_name)
            profile.set_last_name(last_name)
            result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

