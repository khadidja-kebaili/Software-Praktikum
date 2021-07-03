from server.bo.UserBO import User
from server.db.Mapper import Mapper


class UserMapper (Mapper):
    """Mapper-Klasse, die User-Objekte auf eine relationale
    Datenbank abbildet."""

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Benutzer unseres Systems."""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, email, google_user_id from user")
        tuples = cursor.fetchall()

        for (id, name, email, user_id) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_user_id(user_id)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Auslesen aller Benutzer anhand des Benutzernamens."""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, google_user_id FROM user WHERE name LIKE '{}' ORDER BY name".format(
            name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, email, user_id) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_user_id(user_id)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """Suchen eines Benutzers mit vorgegebener User ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben. """

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, google_user_id FROM user WHERE id={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, user_id) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_user_id(user_id)
            result = user
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_email(self, mail_address):
        """Auslesen aller Benutzer anhand der zugeordneten E-Mail-Adresse."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, google_user_id FROM user WHERE email={}".format(
            mail_address)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, user_id) = tuples[0]
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_email(email)
            user.set_user_id(user_id)
            result = user
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_google_user_id(self, google_user_id):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben."""
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, google_user_id FROM user WHERE google_user_id='{}'".format(
            google_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_user_id) = tuples[0]
            u = User()
            u.set_id(id)
            u.set_name(name)
            u.set_email(email)
            u.set_user_id(google_user_id)
            result = u
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, user):
        """Einfügen eines User-Objekts in die Datenbank."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM user ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                user.set_id(maxid[0] + 1)
            else:
                user.set_id(1)

        command = "INSERT INTO user (id, name, email, google_user_id) VALUES (%s,%s,%s,%s)"
        data = (user.get_id(), user.get_name(),
                user.get_email(), user.get_user_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return user

    def update(self, user):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""
        cursor = self._cnx.cursor()

        command = "UPDATE user " + "SET name=%s, email=%s WHERE google_user_id=%s"
        data = (user.get_name(), user.get_email(), user.get_user_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, user):
        """Löschen der Daten eines User-Objekts aus der Datenbank."""
        cursor = self._cnx.cursor()

        command = "DELETE FROM user WHERE id={}".format(user.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
