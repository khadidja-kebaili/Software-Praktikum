from re import S
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

        command = "INSERT INTO profil (id, name, vorname, age, semester, studiengang, hobbies, interessen, vorlieben, persönlichkeit, lerntyp, lernzeitraum, lernort, lernfrequenz, vorkenntnisse, berufserfahrung) VALUES (%s,%s,%s, %s,%s,%s, %s,%s,%s, %s,%s,%s, %s,%s,%s, %s)"
        data = (
            studentprofil.get_id(), studentprofil.get_name(),
            studentprofil.get_vorname(), studentprofil.get_alter(),
            studentprofil.get_semester(), studentprofil.get_studiengang(),
            studentprofil.get_hobbies(), studentprofil.get_interessen(),
            studentprofil.get_vorlieben(), studentprofil.get_persönlichkeit(),
            studentprofil.get_lerntyp(), studentprofil.get_lernzeitraum(),
            studentprofil.get_lernort(), studentprofil.get_lernfrequenz(),
            studentprofil.get_vorkenntnisse(), studentprofil.get_berufserfahrung())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return studentprofil
