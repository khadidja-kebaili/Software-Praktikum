from src.server.db.Mapper import Mapper;
from src.server.bo.MessageBO import MessageBO;

class MessageMapper(Mapper):
    def __init__(self):
        super().__init__()

    def insert(self, message):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM messages")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                message.set_id(maxid[0]+1)
            else:
                message.set_id(1)

        command = "INSERT INTO messages (id, profilID, room, text) VALUES (%s, %s, %s, %s)"
        data = (
            message.get_id(),
            message.get_profilID(),
            message.get_room(),
            message.get_text(),
        )

        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()
        return message

    def find_all(self):
        res = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, profilID, room, text FROM messages")
        tuples = cursor.fetchall()

        for(id, profilID, room, text) in tuples:
            message = MessageBO()
            message.set_id(id)
            message.set_profilID(profilID)
            message.set_room(room)
            message.set_text(text)
            res.append(message)
        
        self._cnx.commit()
        cursor.close()
        return res

    def find_by_key(self, id):
        res = None
        cursor = self._cnx.cursor()
        command = "SELECT id, profilID, room, text FROM messages WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
    
        try:
            (id, profilID, room, text) = tuples[0]
            message = MessageBO()
            message.set_id(id)
            message.set_profilID(profilID)
            message.set_room(room)
            message.set_text(text)
            res = message
        except IndexError:
            res = None
        
        self._cnx.commit()
        cursor.close()
        return res
    
    #alle Messages welche zu einem Raum gehören werden zurück gegeben
    def find_by_room(self, roomID):
        res = []
        cursor = self._cnx.cursor()
        command = "SELECT id, profilID, room, text FROM messages WHERE room={} ORDER BY id".format(roomID)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, profilID, room, text) in tuples:
            message = MessageBO()
            message.set_id(id)
            message.set_profilID(profilID)
            message.set_room(room)
            message.set_text(text)
            res.append(message)

        self._cnx.commit()
        cursor.close()
        return res

    #Was wenn die Person gelöscht wird aus der Gruppe?
    #def find_associatedRooms(self, profilID):
    #    res = [];
    #    cursor = self._cnx.cursor();
    #    command = "SELECT DISTINCT room FROM messages WHERE profilID={}".format(profilID);
    #    cursor.execute(command);
    #    tuples = cursor.fetchall();

        #Nur die RaumID soll in dem Array gespeichert werden
    #    for(room) in tuples:
    #        res.append(room);
        
    #    self._cnx.commit();
    #    cursor.close();
    #    return res;

    def delete(self, message):
        cursor = self._cnx.cursor()
        command = "DELETE FROM messages WHERE id={}".format(message.get_id())
        cursor.execute(command)
        self._cnx.commit()
        cursor.close()

    def update(self, message):
        cursor = self._cnx.cursor()
        command = "UPDATE messages " + "SET text=%s WHERE id=%s"
        data = (message.get_text(),
                message.get_id())
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()