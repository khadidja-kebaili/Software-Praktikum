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

chatroom = api.inherit('Chatroom', bo, {
    'name': fields.String(attribute='name', description = 'Name des Chatraums'),
    'chattype':fields.String(attribute='chattype', description = 'Art des Chatraums (e-Einzel, g-Gruppe)')
})

chataccess = api.inherit('Chataccess', bo, {
    'profilID': fields.Integer(attribute='profilID', description='ID des Profils'),
    'room': fields.Integer(attribute='profilID', description='ID des Raums'),
    'chattype':fields.String(attribute='chattype', description='Art des Chatraums (e-Einzel, g-Gruppe)')
})

#Message

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

@api.route('/message/<int:id>')
@api.param('id','Die ID der Nachricht')
class Message_withID_Operations(Resource):
    @api.marshal_with(message)
    def get(self,id):
        adm = Businesslogic();
        message = adm.get_message_by_id(id);
        return message;

    @api.marshal_with(message)
    def delete(self, id):
        adm = Businesslogic();
        messages = adm.get_message_by_id(id);
        adm.delete_message(messages);
        return ''

    @api.marshal_with(message)
    @api.expect(message, validate=True)
    def put(self, id):
        adm = Businesslogic();
        p = MessageBO.from_dict(api.payload);

        if p is not None:
            p.set_id(id);
            adm.update_message(p);
            return p, 200
        else:
            return '', 500

@api.route('/chatroom_message/<int:room>')
@api.param('room', 'Die Id des Chatraums')
class find_MessagesByRoom(Resource):
    @api.marshal_with(chatroom)
    def get(self, id):
        adm = Businesslogic();
        messages = adm.get_messages_by_roomID(id)
        return messages

#Chatroom

@api.route('/chatroom')
class ChatroomOperations (Resource):
    @api.marshal_with(chatroom)
    @api.expect(chatroom)
    def post(self):
        adm = Businesslogic();
        proposal = ChatroomBO.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_chatroom(
                proposal.get_name(),
                proposal.get_chattype()
            )
            return p

    @api.marshal_list_with(chatroom)
    def get(self):
        adm = Businesslogic()
        message = adm.get_allRooms()
        return message

@api.route('/chatroom/<int:id>')
@api.param('id', 'Die ID des Chatraums')
class Chatroom_withID_Operations (Resource):
    @api.marshal_with(chatroom)
    def get(self, id):
        adm = Businesslogic();
        room = adm.get_room_by_id(id);
        return room;

    @api.marshal_with(chatroom)
    def delete(self, id):
        adm = Businesslogic();
        room = adm.get_room_by_id(id);
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

#Chataccess

@api.route('/chataccess')
class ChataccessOperations(Resource):
    @api.marshal_with(chataccess)
    @api.expect(chataccess)
    def post(self):
        adm = Businesslogic();
        proposal = ChatAccessBO.from_dict(api.payload)
        if proposal is not None:
            p = adm.create_chataccess(
                proposal.get_profilid(),
                proposal.get_room(),
                proposal.get_chattype()
            )
            return p
    
    @api.marshal_list_with(chataccess)
    def get(self):
        adm = Businesslogic()
        access = adm.get_allChataccess()
        return access

@api.route('/chataccess/<int:id>')
@api.param('id', 'Die ID des Chataccess')
class Chataccess_withID_Operations (Resource):
    @api.marshal_with(chataccess)
    def get(self, id):
        adm = Businesslogic()
        access = adm.get_Chataccess_by_id(id)
        return access

    @api.marshal_with(chataccess)
    def delete(self, id):
        adm = Businesslogic()
        access = adm.get_Chataccess_by_id(id)
        adm.delete_chataccess(access)
        return ''

    @api.marshal_with(chataccess)
    @api.expect(chatroom, validate = True)
    def put(self, id):
        adm = Businesslogic()
        p = ChatAccessBO.from_dict(api.payload);

        if p is not None:
            p.set_id(id);
            adm.update_chataccess(p)
            return p, 200
        else:
            return '', 500

@api.route('/chataccess_member/<int:room>')
@api.param('room', 'Id des Chatraums')
class find_members(Resource):
    @api.marshal_with(chataccess)
    def get(self, room):
        adm = Businesslogic()
        profiles = adm.get_profils_by_room(room)
        return profiles

@api.route('/chataccess_groupchat/<int:profilid>')
@api.param('profilid', 'Id des Profils')
class find_groupchats(Resource):
    @api.marshal_with(chataccess)
    def get(self, profilid):
        adm = Businesslogic()
        rooms = adm.get_groupchataccess_by_profil(profilid)
        return rooms

@api.route('/chataccess_singlechat/<int:profilid>')
@api.param('profilid', 'Id des Profils')
class find_singlechats(Resource):
    @api.marshal_with(chataccess)
    def get(self, profilid):
        adm = Businesslogic()
        rooms = adm.get_singlechataccess_by_profil(profilid)
        return rooms

if __name__ == '__main__':
    app.run(debug = True)