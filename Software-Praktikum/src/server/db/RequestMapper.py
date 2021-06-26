from server.db.Mapper import Mapper
from server.bo.RequestBO import Request

class RequestMapper(Mapper):

    def __init__(self):
        super().__init__()

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

        command = "INSERT INTO request (id, requested_by, requested, requesttype) VALUES (%s, %s, %s, %s)"
        data = (
            request.get_id(),
            request.get_requested_by(),
            request.get_requested(),
            request.get_requesttype())

        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return request

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, requested_by, requested, request_date, requesttype FROM request")
        tuples = cursor.fetchall()

        for (id, requested_by, requested, request_date, requesttype) in tuples:
            request = Request()
            request.set_id(id)
            request.set_requested_by(requested_by)
            request.set_requested(requested)
            request.set_request_date(request_date)
            request.set_requesttype(requesttype)
            result.append(request)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, requested_by, requested, request_date, requesttype FROM request WHERE id={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, requested_by, requested, request_date, requesttype) = tuples[0]
            request = Request()
            request.set_id(id)
            request.set_requested_by(requested_by)
            request.set_request_date(request_date)
            request.set_requested(requested)
            request.set_requesttype(requesttype)
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
    #     command = "SELECT * FROM request WHERE requesttype = {}".format(key)
    #     cursor.execute(command)
    #     tuples = cursor.fetchall()
    #
    #     try:
    #         (id, requested_by, requested, request_date, requesttype) = tuples[0]
    #         request = Request()
    #         request.set_id(id)
    #         request.set_requested_by(requested_by)
    #         request.set_requested(requested)
    #         request.set_request_date(request_date)
    #         request.set_requesttype(requesttype)
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

    def update(self, request):
        pass


    def delete(self, request):
        cursor = self._cnx.cursor()

        command = "DELETE FROM request WHERE id={}".format(
            request.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


