from .bo.MessageBO import Message;
from .db.MessageMapper import MessageMapper;

class Businesslogik(object):
    def __init__(self):
        pass;

    def create_message(self, senderID, raum, text):
        message = Message(senderID, raum, text);

        with MessageMapper() as mapper:
            return mapper.insert(message);

    def get_message_by_id(self, number):
        with MessageMapper() as mapper:
            return mapper.find_by_key(number);
    
    def save_message(self, message):
        with MessageMapper() as mapper:
            mapper.update(message);

    def delete_profil(self, message):
        with MessageMapper() as mapper:
            mapper.delete(message);