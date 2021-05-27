from flask import Flask;
from flask_restx import Resource, Api, fields;
from flask_cors import CORS;

from server.Businesslogic import Businesslogic;
from server.bo.MessageBO import MessageBO;

app = Flask(__name__);
CORS(app, resources=r'/*');
api = Api(app);

bo = api.model('BusinessObject', {
    'id':fields.Integer(attribute='id', description='Unique Identifier eines Business Objects'),
})

#Einzelne Nachrichten als BO
message = api.inherit('Chat', bo, {
    'profilID': fields.Integer(attribute='senderID',description='ID des Senders'),
    'roomID': fields.Integer(attribute='room', description="ID des Chatraums"),
    'text': fields.String(attribute='text', description='Text')
})

#Seite für alle Chats
@api.route('/message')
class CreateMessages(Resource):
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
            );
            return p;
    
    @api.marshal_list_with(message)
    def get(self):
        adm = Businesslogic();
        profile = adm.get_allMessages();
        return message;
        
if __name__ == '__main__':
    app.run(debug = True)