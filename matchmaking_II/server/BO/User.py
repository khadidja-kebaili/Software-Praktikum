from matchmaking_II.server.BO.Businessobjects import BusinessObject as Bo


class User (Bo):
    """Realisierung einer exemplarischen Benutzerklasse.

    Aus Gründen der Vereinfachung besitzt der Kunden in diesem Demonstrator
    lediglich einen einfachen Namen, eine E_Mail-Adresse sowie eine außerhalb
    unseres Systems verwaltete User ID (z.B. die Google ID).
    """
    def __init__(self):
        super().__init__()
        self.__email = ""  # Die E-Mail-Adresse des Benutzers.
        self.__password= ""  # Die extern verwaltete User ID.


    def get_email(self):
        """Auslesen der E-Mail-Adresse."""
        return self.__email

    def set_email(self, value):
        """Setzen der E-Mail-Adresse."""
        self.__email = value

    def get_password(self):
        """Auslesen der externen User ID (z.B. Google ID)."""
        return self.__user_id

    def set_password(self, value):
        """Setzen der externen User ID (z.B. Google ID)."""
        self.__user_id = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "User: {}, {}".format( self.__email, self.__password)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = User()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_user_id(dictionary["user_id"])
        return obj
