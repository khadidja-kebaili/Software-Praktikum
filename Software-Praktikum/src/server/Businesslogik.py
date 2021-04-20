from .bo.ProfilBO import Studentprofil
from .db.Profilmapper import StudentprofilMapper


class Businesslogik (object):

    def __init__(self):
        pass

    def create_studentprofil(self, name, vorname, alter, semester, studiengang, hobbies, interessen,
                             vorlieben, persönlichkeit, lerntyp, lernzeitraum, lernort, lernfrequenz,
                             vorkenntnisse, berufserfahrung):
        studentprofil = Studentprofil()
        studentprofil.set_name(name)
        studentprofil.set_vorname(vorname)
        studentprofil.set_alter(alter)
        studentprofil.set_semester(semester)
        studentprofil.set_studiengang(studiengang)
        studentprofil.set_hobbies(hobbies)
        studentprofil.set_interessen(interessen)
        studentprofil.set_vorlieben(vorlieben)
        studentprofil.set_persönlichkeit(persönlichkeit)
        studentprofil.set_lerntyp(lerntyp)
        studentprofil.set_lernzeitraum(lernzeitraum)
        studentprofil.set_lernort(lernort),
        studentprofil.set_lernfrequenz(lernfrequenz)
        studentprofil.set_vorkenntnisse(vorkenntnisse)
        studentprofil.set_berufserfahrung(berufserfahrung)

        with StudentprofilMapper() as mapper:
            return mapper.insert(studentprofil)
