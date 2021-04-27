from matchmaking_V.server.BO.Profil import Studentprofil
from matchmaking_V.server.BO.User import User

from matchmaking_V.server.db.UserMapper import UserMapper
from matchmaking_V.server.db.ProfileMapper import StudentprofilMapper


class BankAdministration (object):

    def __init__(self):
        pass

    """
    User-spezifische Methoden
    """
    def create_user(self, id, password, email):
        """Einen Benutzer anlegen"""
        user = User()
        user.set_password(password)
        user.set_email(email)
        user.set_id(id)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_name(self, name):
        """Alle Benutzer mit Namen name auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_name(name)

    def get_user_by_id(self, number):
        """Den Benutzer mit der gegebenen ID auslesen."""
        with UserMapper() as mapper:
            return mapper.find_by_key(number)


    def get_all_users(self):
        """Alle Benutzer auslesen."""
        with UserMapper() as mapper:
            return mapper.find_all()

    def save_user(self, user):
        """Den gegebenen Benutzer speichern."""
        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):
        """Den gegebenen Benutzer aus unserem System löschen."""
        with UserMapper() as mapper:
            mapper.delete(user)


    """
    Customer-spezifische Methoden
    """
    def create_profile(self, id, lernfrequenz, fakultaet, lernort, lerntyp, semester):
        """Einen Kunden anlegen."""
        customer = Studentprofil()
        customer.set_id(id)
        customer.set_lernfrequenz(lernfrequenz)
        customer.set_fakultaet(fakultaet)
        customer.set_lernort(lernort)
        customer.set_lerntyp(lerntyp)
        customer.set_semester(semester)

        with StudentprofilMapper() as mapper:
            return mapper.insert(customer)

