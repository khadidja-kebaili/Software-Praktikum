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
    'raum': fields.Integer(attribute='raum', description="ID des Chatraums"),
    'text': fields.String(attribute='text', description='Text'),
})

#Seite für alle Chats
@api.route('/chat')
def index():
    return 'Hello World'

#Seite für einen Chat
@api.route('/chat/<int:id>')
@api.param('id','ID des Chatraums')
    return 'Chatraum'


if __name__ == '__main__':
    app.run(debug = True)