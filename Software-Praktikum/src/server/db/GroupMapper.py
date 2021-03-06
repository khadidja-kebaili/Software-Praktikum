from server.db.Mapper import Mapper
from server.bo.GroupBO import Group


class GroupMapper(Mapper):
    def __init__(self):
        super().__init__()

    def insert(self, group):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM lernapp.group ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                group.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                group.set_id(1)

        command = "INSERT INTO lernapp.group (id, groupname, admin, description, chatid) VALUES (%s, %s,%s,%s, %s)"
        data = (
            group.get_id(),
            group.get_groupname(),
            group.get_admin(),
            group.get_description(),
            group.get_chatid())

        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return group

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, groupname, admin, description, chatid FROM lernapp.group"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, groupname, admin, description, chatid) in tuples:
            group = Group()
            group.set_id(id)
            group.set_groupname(groupname)
            group.set_admin(admin)
            group.set_description(description)
            group.set_chatid(chatid)
            result.append(group)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, groupname, admin, description, chatid FROM lernapp.group WHERE id={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, groupname, admin, description, chatid) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_groupname(groupname)
            group.set_admin(admin)
            group.set_description(description)
            group.set_chatid(chatid)
            result = group
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_admin(self, key):
        result = []

        cursor = self._cnx.cursor()
        command = "SELECT id, groupname, admin, description, chatid FROM lernapp.group WHERE admin={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, groupname, admin, description, chatid) in tuples:
            group = Group()
            group.set_id(id)
            group.set_groupname(groupname)
            group.set_admin(admin)
            group.set_description(description)
            group.set_chatid(chatid)
            result.append(group)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_chatid(self, key):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, groupname, admin, description, chatid FROM lernapp.group WHERE chatid={}".format(
            key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, groupname, admin, description, chatid) = tuples[0]
            group = Group()
            group.set_id(id)
            group.set_groupname(groupname)
            group.set_admin(admin)
            group.set_description(description)
            group.set_chatid(chatid)
            result = group
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, group):
        cursor = self._cnx.cursor()

        command = "UPDATE lernapp.group " + \
            "SET description=%s, admin=%s, groupname=%s WHERE id=%s"
        data = (group.get_description(), group.get_admin(),
                group.get_groupname(), group.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return group

    def delete(self, group):
        cursor = self._cnx.cursor()

        command = "DELETE FROM lernapp.group WHERE id={}".format(
            group.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
