from server.db.Mapper import Mapper;
from server.bo.ChatroomBO import ChatroomBO;

class MessageMapper(Mapper):
    def __init__(self):
        super().__init__();

    def insert(self, chatroom):
        cursor = self._cnx.cursor();
        cursor.execute("SELECT MAX(id) AS maxid FROM chatroom");
        tuples = cursor.fetchall();

        for (maxid) in tuples:
            if maxid[0] is not None:
                chatroom.set_id(maxid[0]+1)
            else:
                chatroom.set_id(1);

        command = "INSERT INTO chatrooms (id) VALUES (%s)"
        data = (
            chatroom.get_id(),
        )

        cursor.execute(command, data);
        cursor.close();
        return chatroom;