from server.bo.Businessobject import Businessobject

'''Autor: @Khadidja.Kebaili'''

'''Die Klasse Request kapselt Attribute und Methoden, die die späteren Klasseninstanzen Requests besitzen sollen.
   Die Klassenattribute sind: Der Anfragende (requested_by), der Angefragte (requested), das Anfragedatum (request_date),
   die Art der Anfrage (request_type) und die Gruppen-ID (group_id).
   Abgesehen von den Methoden, um die Attribute zu setzen oder zurückzugeben (sog. setter und getter- Methoden),
    gibt es noch die __str__-Methode, um die einzelnen Instanzeigenschaften leserlich darzustellen und die from-dict-
    Methode, um die von der Datenbank importiertden Datensätze, den richtigen Instanzattributen zuzuweisen.'''

'''Die Instanzen der Klasse Request gehören zu den Businessobjekten dieser Applikation. Daher erbt die Klasse
Request von der abstrakten Klasse Businessobject.'''


class Request(Businessobject):

    def __init__(self):
        super().__init__()
        self.requested_by = "",
        self.requested = "",
        self.request_date = "",
        self.request_type = "",
        self.group_id = "",

    def set_group_id(self, id):
        self.group_id = id

    def get_group_id(self):
        return self.group_id

    def set_request_type(self, value):
        self.request_type = value

    def get_request_type(self):
        return self.request_type

    def set_request_date(self, value):
        self.request_date = value

    def get_request_date(self):
        return self.request_date

    def set_requested(self, value):
        self.requested = value

    def get_requested(self):
        return self.requested

    def set_requested_by(self, value):
        self.requested_by = value

    def get_requested_by(self):
        return self.requested_by

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Request: ID: {}, Requested_by: {}, Requested: {}, Date of request: {}, Requesttype : {}, GroupID: {}."\
            .format(self.get_id(), self.get_requested_by(), self.get_requested(),
                    self.get_request_date(), self.get_request_type(), self.get_group_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen Request."""
        obj = Request()
        obj.set_id(dictionary['id'])
        obj.set_requested_by(dictionary['requested_by'])
        obj.set_requested(dictionary['requested'])
        obj.set_request_type(dictionary['request_type'])
        obj.set_group_id(dictionary['group_id'])
        return obj
