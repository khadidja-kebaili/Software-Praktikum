
from server.db.Mapper import Mapper
from server.bo.ProfilBO import Studentprofil


class StudentprofilMapper (Mapper):

    def __init__(self):
        super().__init__()

    def insert(self, studentprofil):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profil ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                studentprofil.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                studentprofil.set_id(1)

        command = "INSERT INTO profil (id, name, vorname, age, semester, studiengang, hobbies, interessen, persönlichkeit, lerntyp, lernzeitraum, lernort, lernfrequenz, berufserfahrung) VALUES (%s, %s,%s,%s, %s,%s,%s, %s,%s,%s, %s,%s,%s, %s)"
        data = (
            studentprofil.get_id(), studentprofil.get_name(),
            studentprofil.get_vorname(), studentprofil.get_alter(),
            studentprofil.get_semester(), studentprofil.get_studiengang(),
            studentprofil.get_hobbies(), studentprofil.get_interessen(),
            studentprofil.get_persönlichkeit(), studentprofil.get_lerntyp(),
            studentprofil.get_lernzeitraum(), studentprofil.get_lernort(),
            studentprofil.get_lernfrequenz(), studentprofil.get_berufserfahrung())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return studentprofil

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, vorname, age, semester, studiengang, hobbies, interessen, persönlichkeit, lerntyp, lernzeitraum, lernort, lernfrequenz, berufserfahrung FROM profil WHERE id={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, vorname, alter, semester, studiengang, hobbies, interessen, persönlichkeit,
             lerntyp, lernzeitraum, lernort, lernfrequenz, berufserfahrung) = tuples[0]
            profil = Studentprofil()
            profil.set_id(id)
            profil.set_name(name)
            profil.set_vorname(vorname)
            profil.set_alter(alter)
            profil.set_semester(semester)
            profil.set_studiengang(studiengang)
            profil.set_hobbies(hobbies)
            profil.set_interessen(interessen)
            profil.set_persönlichkeit(persönlichkeit)
            profil.set_lerntyp(lerntyp)
            profil.set_lernzeitraum(lernzeitraum)
            profil.set_lernort(lernort),
            profil.set_lernfrequenz(lernfrequenz)
            profil.set_berufserfahrung(berufserfahrung)
            result = profil
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
