from matchmaking_V.server.db.Mapper import Mapper


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

        command = "INSERT INTO profil (id, name, semester, fakultaet, lerntyp, lernzeitraum, lernort, lernfrequenz) VALUES (%s, %s,%s,%s, %s,%s,%s, %s,%s,%s)"
        data = (
            studentprofil.get_id(),
            studentprofil.get_name(),
            studentprofil.get_semester(),
            studentprofil.get_fakultaet(),
            studentprofil.get_lerntyp(),
            studentprofil.get_lernort(),
            studentprofil.get_lernfrequenz())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return studentprofil