from .bo.MessageBO import Message;
from .db.MessageMapper import MessageMapper;

class Businesslogik(object):
    def __init__(self):
        pass;

    
    #Methoden für den Chat
    def create_message(self, profilID, room, text, time):
        message = MessageBO();
        message.set_profilID(profilID);
        message.set_room(room);
        message.set_text(text);
        message.set_time(time);
        #Überprüfen
        message.set_id(1);

        with MessageMapper() as mapper:
            return mapper.insert(message);

    def get_message_by_roomID(self, id):
        with MessageMapper() as mapper:
            return mapper.find_by_room(id);
    
    def save_message(self, message):
        with MessageMapper() as mapper:
            mapper.update(message);