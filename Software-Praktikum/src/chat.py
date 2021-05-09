from flask import Flask, render_template;
from flask_restx import Resource, Api, fields;
from flask_cors import CORS;

from server.Businesslogik import Businesslogik;

app = Flask(__name__);
CORS(app, resources=r'/*');
api = Api(app);

bo = api.model('BusinessObject', {
    'id':fields.Integer(attribute='id', description='Unique Identifier eines Business Objects'),
})

#Einzelne Nachrichten als BO
chat = api.inherit('Chat', bo, {
    'senderID': fields.Integer(attribute='senderID',description='ID des Senders'),
    'roomID': fields.Integer(attribute='room', description="ID des Chatraums"),
    'text': fields.String(attribute='text', description='Text'),
    'roomCounter': fields.Integer(attribute='roomCounter', description="Zähler für die Stelle im Chat")
})

#Seite für alle Chats
@api.route('/chat')
class CreateMessages(Resource):
    @api.marshal_with(profil)
    @api.expect(profil)
    def index():
        adm = Businesslogik();
        proposal = _.from_dict(api.payload);

        if proposal is not None:
            p = adm.create_chatlist(
                proposal.get_senderID(),
                proposal.get_roomID(),
                proposal.get_text(),
                
            )
            return p;

    @api.marshal_list_with(chat)
    def get(self):
        adm = Businesslogik();
        profil = adm.get_all();
        return profil;
        
#Seite für einen Chat
@api.route('/chat/<int:id>')
@api.param('id','ID des Chatraums')
    return 'Chatraum'

if __name__ == '__main__':
    app.run(debug = True)