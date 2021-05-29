from server.db.Mapper import Mapper;
from server.bo.ChatAccessBO import ChatAccessBO;

class ChatAccessMapper(Mapper):
    def __init__(self):
        super().__init__();

    def insert(self, access):
        cursor = self._cnx.cursor();
        cursor.execute("SELECT MAX(id) AS maxid FROM chataccess");
        tuples = cursor.fetchall();

        for (maxid) in tuples:
            if maxid[0] is not None:
                access.set_id(maxid[0]+1)
            else:
                access.set_id(1);

        command = "INSERT INTO chataccess (id, profilID, room) VALUES (%s, %s, %s)"
        data = (
            access.get_id(),
            access.get_profilID(),
            access.get_room(),
        )

        cursor.execute(command, data);
        self._cnx.commit();
        cursor.close();
        return access;

    def find_all(self):
        res = [];
        cursor = self._cnx.cursor();
        cursor.execute("SELECT id, profilID, room FROM chataccess")
        tuples = cursor.fetchall();

        for(id, profilID, room) in tuples:
            access = ChatAccessBO();
            access.set_id(id);
            access.set_profilID(profilID);
            access.set_room(room);
            res.append(access);
        
        self._cnx.commit();
        cursor.close();
        return res;

    def find_by_key(self, id):
        res = None;
        cursor = self._cnx.cursor();
        command = "SELECT id, profilID, room FROM chataccess WHERE id={}".format(id);
        cursor.execute(command);
        tuples = cursor.fetchall();
    
        try:
            (id, profilID, room) = tuples[0]
            access = ChatAccessBO();
            access.set_id(id);
            access.set_profilID(profilID);
            access.set_room(room);
            res = access;
        except IndexError:
            res = None;
        
        self._cnx.commit();
        cursor.close();
        return res;
    
    #gibt die Chaträume des gegebenen Profils zurück
    def find_by_profil(self, profilID):
        res = [];
        cursor = self._cnx.cursor();
        command = "SELECT id, profilID, room FROM chataccess WHERE profilID={}".format(profilID);
        cursor.execute(command);
        tuples = cursor.fetchall();

        for (id, profilID, room) in tuples:
            access = ChatAccessBO();
            access.set_id(id);
            access.set_profilID(profilID);
            access.set_room(room);
            res.append(access);

        self._cnx.commit();
        cursor.close();
        return res;

    def delete(self, access):
        cursor = self._cnx.cursor();
        command = "DELETE FROM chataccess WHERE id={}".format(access.get_id());
        cursor.execute(command);
        self._cnx.commit();
        cursor.close();

    def update(self, access):
        cursor = self._cnx.cursor();
        command = "UPDATE chataccess " + "SET profilID=%s, room=%s WHERE id=%s"
        data = (access.get_profilID(),
                access.get_room(),
                access.get_id())
        cursor.execute(command, data);
        self._cnx.commit();
        cursor.close();