from server.db.Mapper import Mapper;
from server.bo.MessageBO import Message;

class MessageMapper(Mapper):
    def __init__(self):
        super().__init__();

    def insert(self, message):
        cursor = self._cnx.cursor();
        cursor.execute("SELECT MAX(id) AS maxid FROM chat");
        tuples = cursor.fetchall();

        for (maxid) in tuples:
            if maxid[0] is not None:
                chatraum.set_id(maxid[0]+1)
            else:
                chatraum.set_id(1);

        command = "INSERT INTO chatrooms (id, history) VALUES (%s, %s)"
        date = (
            chatroom.get_id(),
            chatroom.get_history()
        )

        cursor.execute(command, data);
        cursor.close();
        return message;