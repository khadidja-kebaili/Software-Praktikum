from re import S
from server.db.Mapper import Mapper
from server.bo.ProfilBO import Studentprofil


class StudentprofilMapper (Mapper):

    def __init__(self):
        super().__init__()

    def insert(self, studentprofil):

        cursor = self._cnx.cursor()

        command = "INSERT INTO profil (id, name, vorname, alter, semester, studiengang, hobbies, interessen, vorlieben, persönlichkeit, lerntyp, lernzeitraum, lernort, lernfrequenz, vorkenntnisse, berufserfahrung) VALUES (%s,%s,%s, %s,%s,%s, %s,%s,%s, %s,%s,%s, %s,%s,%s, %s)"
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
