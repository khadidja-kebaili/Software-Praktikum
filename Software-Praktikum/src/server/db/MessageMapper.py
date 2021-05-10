from server.db.Mapper import Mapper;
from server.bo.MessageBO import Message;

class MessageMapper(Mapper):
    def __init__(self):
        super().__init__();

    def insert(self, message):
        cursor = self._cnx.cursor();
        cursor.execute("SELECT MAX(id) AS maxid FROM messages");
        tuples = cursor.fetchall();

        for (maxid) in tuples:
            if maxid[0] is not None:
                message.set_id(maxid[0]+1)
            else:
                message.set_id(1);

        command = "INSERT INTO messages (id, profilID, room, text, time) VALUES (%s, %s, %s, %s)"
        data = (
            message.get_id(),
            message.get_profilID(),
            message.get_room(),
            message.get_text(),
            message.get_time(),
        )

        cursor.execute(command, data);
        self._cnx.commit();
        cursor.close();
        return message;

    def find_by_room(self, roomID):
        res = [];
        cursor = self._cnx.cursor();
        command = "SELECT id, profilID, room, text, time FROM messages WHERE room={} ORDER BY time".format(roomID);
        cursor.execute(command);
        tuples = cursor.fetchall();

        for (id, profilID, room, text, time) in tuples:
            message = MessageBO();
            message.set_id(id);
            message.set_profilID(profilID);
            message.set_room(room);
            message.set_time(time);
            res.append(message);

        self._cnx.commit();
        cursor.close();
        return res;

    