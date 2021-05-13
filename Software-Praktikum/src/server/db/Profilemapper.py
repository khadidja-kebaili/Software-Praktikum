from server.db.Mapper import Mapper
from server.bo.Test_Profil import Studentprofile


class StudentprofileMapper (Mapper):

    def __init__(self):
        super().__init__()

    def insert(self, studentprofile):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profile ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                studentprofile.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                studentprofile.set_id(1)

        command = "INSERT INTO profile (id, firstname, lastname, age, semester, major, hobbys, interests, personality, learnstyle, studytime, studyplace, studyfrequence, workexperience) VALUES (%s, %s,%s,%s, %s,%s,%s, %s,%s,%s, %s,%s,%s, %s)"
        data = (
            studentprofile.get_id(), studentprofile.get_last_name(),
            studentprofile.get_first_name(), studentprofile.get_age(),
            studentprofile.get_semester(), studentprofile.get_major(),
            studentprofile.get_hobbys(), studentprofile.get_interests(),
            studentprofile.get_personality(), studentprofile.get_learnstyle(),
            studentprofile.get_studytime(), studentprofile.get_studyplace(),
            studentprofile.get_studyfrequence(), studentprofile.get_workexperience())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return studentprofile

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute(
            "SELECT id, firstname, lastname, age, semester, major, hobbys, interests, personality, learnstyle, studytime, studyplace, studyfrequence, workexperience from profile")
        tuples = cursor.fetchall()

        for (id, first_name, last_name, age, semester, major, hobbys, interests, personality, learnstyle, studytime, studyplace, studyfrequence, workexperience) in tuples:
            profile = Studentprofile()
            profile.set_id(id)
            profile.set_first_name(first_name)
            profile.set_last_name(last_name)
            profile.set_age(age)
            profile.set_semester(semester)
            profile.set_major(major)
            profile.set_hobbys(hobbys)
            profile.set_interests(interests)
            profile.set_personality(personality)
            profile.set_learnstyle(learnstyle)
            profile.set_studytime(studytime)
            profile.set_studyplace(studyplace),
            profile.set_studyfrequence(studyfrequence)
            profile.set_workexperience(workexperience)
            result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, firstname, lastname, age, semester, major, hobbys, interests, personality, learnstyle, studytime, studyplace, studyfrequence, workexperience FROM profile WHERE id={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, first_name, last_name, age, semester, major, hobbys, interests, personality,
             learnstyle, studytime, studyplace, studyfrequence, workexperience) = tuples[0]
            profile = Studentprofile()
            profile.set_id(id)
            profile.set_first_name(first_name)
            profile.set_last_name(last_name)
            profile.set_age(age)
            profile.set_semester(semester)
            profile.set_major(major)
            profile.set_hobbys(hobbys)
            profile.set_interests(interests)
            profile.set_personality(personality)
            profile.set_learnstyle(learnstyle)
            profile.set_studytime(studytime)
            profile.set_studyplace(studyplace),
            profile.set_studyfrequence(studyfrequence)
            profile.set_workexperience(workexperience)
            result = profile
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, studentprofile):

        cursor = self._cnx.cursor()

        command = "UPDATE profile " + "SET firstname=%s, lastname=%s, age=%s, semester=%s, major=%s, hobbys=%s, interests=%s, personality=%s, learnstyle=%s, studytime=%s, studyplace=%s, studyfrequence=%s, workexperience=%s  WHERE id=%s"
        data = (
            studentprofile.get_last_name(),
            studentprofile.get_first_name(), studentprofile.get_age(),
            studentprofile.get_semester(), studentprofile.get_major(),
            studentprofile.get_hobbys(), studentprofile.get_interests(),
            studentprofile.get_personality(), studentprofile.get_learnstyle(),
            studentprofile.get_studytime(), studentprofile.get_studyplace(),
            studentprofile.get_studyfrequence(), studentprofile.get_workexperience(), studentprofile.get_id(),)
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return studentprofile

    def delete(self, studentprofile):
        cursor = self._cnx.cursor()

        command = "DELETE FROM profile WHERE id={}".format(
            studentprofile.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()