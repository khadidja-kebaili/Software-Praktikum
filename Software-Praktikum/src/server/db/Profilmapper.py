from .mapper import Mapper
from ..bo import Studentprofil


class StudentprofilMapper (Mapper):

    def __init__(self):
        super().__init__()

    def insert(self, studentprofil):

        cursor = self._cnx.cursor()

        command = "INSERT INTO profil (id, semester, studiengang) VALUES (%s,%s,%s)"
        data = (studentprofil.get_id(), studentprofil.get_semester(),
                studentprofil.get_studiengang())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return studentprofil
