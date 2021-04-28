from matchmaking_V.server.BO.Profil import Studentprofil

from matchmaking_V.server.db.ProfileMapper import StudentprofilMapper


class Businesslogik (object):

    def __init__(self):
        pass

    def create_profil(self, name, vorname, alter, semester, studiengang, hobbies, interessen,
                      persönlichkeit, lerntyp, lernzeitraum, lernort, lernfrequenz, berufserfahrung):
        studentprofil = Studentprofil()
        studentprofil.set_name(name)
        studentprofil.set_vorname(vorname)
        studentprofil.set_alter(alter)
        studentprofil.set_semester(semester)
        studentprofil.set_studiengang(studiengang)
        studentprofil.set_hobbies(hobbies)
        studentprofil.set_interessen(interessen)
        studentprofil.set_persönlichkeit(persönlichkeit)
        studentprofil.set_lerntyp(lerntyp)
        studentprofil.set_lernzeitraum(lernzeitraum)
        studentprofil.set_lernort(lernort),
        studentprofil.set_lernfrequenz(lernfrequenz)
        studentprofil.set_berufserfahrung(berufserfahrung)

        with StudentprofilMapper() as mapper:
            return mapper.insert(studentprofil)

    def get_profil_by_id(self, number):

        with StudentprofilMapper() as mapper:
            return mapper.find_by_key(number)

    def save_profil(self, studentprofil):
        with StudentprofilMapper() as mapper:
            mapper.update(studentprofil)

    def delete_profil(self, studentprofil):
        with StudentprofilMapper() as mapper:
            mapper.delete(studentprofil)