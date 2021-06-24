from .Businessobject import Businessobject


class User (Businessobject):

    def __init__(self):
        super().__init__()
        self.name = ""  # Der Name des Benutzers.
        self.email = ""  # Die E-Mail-Adresse des Benutzers.
        self.user_id = ""  # Die extern verwaltete User ID.

    def get_name(self):
        """Auslesen des Benutzernamens."""
        return self.name

    def set_name(self, value):
        """Setzen des Benutzernamens."""
        self.name = value

    def get_email(self):
        """Auslesen der E-Mail-Adresse."""
        return self.email

    def set_email(self, value):
        """Setzen der E-Mail-Adresse."""
        self.email = value

    def get_user_id(self):
        """Auslesen der externen User ID (z.B. Google ID)."""
        return self.user_id

    def set_user_id(self, value):
        """Setzen der externen User ID (z.B. Google ID)."""
        self.user_id = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "User: {}, {}, {}, {}".format(self.get_id(), self.name, self.email, self.user_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = User()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_user_id(dictionary["user_id"])
        return obj
