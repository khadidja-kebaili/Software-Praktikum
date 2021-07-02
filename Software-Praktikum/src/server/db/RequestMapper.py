from server.db.Mapper import Mapper
from server.bo.RequestBO import Request
'Autor: @Khadidja.Kebaili'


'''Die Klasse RequestMapper ist für die Datenbankverbindung-/ und das Management zuständig.
   Es wird eine Datenbankverbindung geöffnet, ein Query ausgeführt, die Daten werden in ein Pythonobjekt überführt
   und zurückgegeben. '''

class RequestMapper(Mapper):

    def __init__(self):
        super().__init__()

    '''Methode um neue Requests in Datenbank einzulesen.'''

    def insert(self, request):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM request")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                request.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale id feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der id 1 beginnen können."""
                request.set_id(1)

        command = "INSERT INTO request (id, requested_by, requested, request_type, group_id) VALUES (%s, %s, %s, %s, %s)"
        data = (
            request.get_id(),
            request.get_requested_by(),
            request.get_requested(),
            request.get_request_type(),
            request.get_group_id())

        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return request


    '''Methode um alle Requests aus der Datenbank zu importieren.'''
    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, requested_by, requested, request_date, request_type, group_id FROM request")
        tuples = cursor.fetchall()

        for (id, requested_by, requested, request_date, request_type, group_id) in tuples:
            request = Request()
            request.set_id(id)
            request.set_requested_by(requested_by)
            request.set_requested(requested)
            request.set_request_date(request_date)
            request.set_request_type(request_type)
            request.set_group_id(group_id)
            result.append(request)

        self._cnx.commit()
        cursor.close()

        return result

    '''Methode um einen Request aus der Datenbank zu importieren, der dem Schlüsselwert in der angegeben Spalte 
       entspricht.'''

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, requested_by, requested, request_date, request_type, group_id FROM request WHERE id={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, requested_by, requested, request_date, request_type, group_id) = tuples[0]
            request = Request()
            request.set_id(id)
            request.set_requested_by(requested_by)
            request.set_request_date(request_date)
            request.set_requested(requested)
            request.set_request_type(request_type)
            request.set_group_id(group_id)
            result = request
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    # def find_by_type(self, key):
    #     result = None
    #     cursor = self._cnx.cursor()
    #     command = "SELECT * FROM request WHERE request_type = {}".format(key)
    #     cursor.execute(command)
    #     tuples = cursor.fetchall()
    #
    #     try:
    #         (id, requested_by, requested, request_date, request_type) = tuples[0]
    #         request = Request()
    #         request.set_id(id)
    #         request.set_requested_by(requested_by)
    #         request.set_requested(requested)
    #         request.set_request_date(request_date)
    #         request.set_request_type(request_type)
    #         result = request
    #     except IndexError:
    #         """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
    #         keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
    #         result = None
    #
    #     self._cnx.commit()
    #     cursor.close()
    #
    #     return result

    '''Ein Request soll nicht geupdatet werden können, daher wird diese Methode übergangen.'''

    def update(self, request):
        pass

    '''Methode um ein Requestobjekt in der Datenbank zu löschen.'''

    def delete(self, request):
        cursor = self._cnx.cursor()

        command = "DELETE FROM request WHERE id={}".format(
            request.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


