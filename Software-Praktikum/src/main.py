from flask import Flask;
from flask_restx import Resource, Api, fields;
from flask_cors import CORS;

from server.Businesslogic import Businesslogic;
from server.bo.MessageBO import MessageBO;
from server.bo.ChatroomBO import ChatroomBO;
from server.bo.ChatAccessBO import ChatAccessBO;

app = Flask(__name__);
CORS(app, resources=r'/*');
api = Api(app);

bo = api.model('BusinessObject', {
    'id':fields.Integer(attribute='id', description='Unique Identifier eines Business Objects'),
})

message = api.inherit('Message', bo, {
    'profilID': fields.Integer(attribute='profilID',description='ID des Senders'),
    'room': fields.Integer(attribute='room', description="ID des Chatraums"),
    'text': fields.String(attribute='text', description='Text')
})

chatroom = api.inherit('Chatroom', bo)

chataccess = api.inherit('Chataccess', bo, {
    'profilID': fields.Integer(attribute='profilID', description='ID des Profils'),
    'room': fields.Integer(attribute='profilID', description='ID des Raums')
})

@api.route('/message')
class MessageOperations(Resource):
    @api.marshal_with(message)
    @api.expect(message)
    def post(self):
        adm = Businesslogic();
        proposal = MessageBO.from_dict(api.payload);
        if proposal is not None:
            p = adm.create_message(
                proposal.get_profilID(),
                proposal.get_room(),
                proposal.get_text()
            )
            return p;
    
    @api.marshal_list_with(message)
    def get(self):
        adm = Businesslogic();
        message = adm.get_allMessages();
        return message;

    @api.marshal_with(message)
    def delete(self, id):
        adm = Businesslogic();
        messages = adm.get_message_by_id(id);
        adm.delete_message(messages);
        return ''

@api.route('/chatroom/<int:id>')
@api.param('id', 'Die ID des Chatraums')
class Chatroom (Resource):
    @api.marshal_with(chatroom)
    def get(self, id):
        adm = Businesslogic();
        room = adm.get_chatroom_by_id(id);
        return room;

    @api.marshal_with(chatroom)
    def delete(self, id):
        adm = Businesslogic();
        room = adm.get_chatroom_by_id(id);
        adm.delete_chatroom(room);
        return '';

    @api.marshal_with(chatroom)
    @api.expect(chatroom, validate=True)
    def put(self, id):
        adm = Businesslogic();
        p = ChatroomBO.from_dict(api.payload);

        if p is not None:
            p.set_id(id);
            adm.update_message(p);
            return p, 200
        else:
            return '', 500

    

if __name__ == '__main__':
    app.run(debug = True)