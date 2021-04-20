from flask import Flask
from flask_restx import Resource, Api, fields
from server.Businesslogik import Businesslogik
from server.bo.ProfilBO import Studentprofil
from flask_cors import CORS
import json

app = Flask(__name__)

CORS(app, support_credentials=True, resources={r'/hello/*': {"origins": "*"}})

api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='id', description='Der Unique Identifier eines Business Object'),
})

profil = api.model('Resource', {
    'id': fields.String(attribute='id', description='id'),
    'name': fields.String(attribute='name', description='id'),
    'vorname': fields.String(attribute='vorname', description='Semester'),
    'alter': fields.String(attribute='alter', description='sttudiengang'),
    'semester': fields.String(attribute='semester', description='Semester'),
    'studiengang': fields.String(attribute='studiengang', description='sttudiengang'),
    'hobbies': fields.String(attribute='id', description='id'),
    'interessen': fields.String(attribute='semester', description='Semester'),
    'vorlieben': fields.String(attribute='studiengang', description='sttudiengang'),
    'persönlichkeit': fields.String(attribute='id', description='id'),
    'lerntyp': fields.String(attribute='semester', description='Semester'),
    'lernzeitraum': fields.String(attribute='studiengang', description='sttudiengang'),
    'lernort': fields.String(attribute='id', description='id'),
    'lernfrequenz': fields.String(attribute='semester', description='Semester'),
    'vorkenntnisse': fields.String(attribute='studiengang', description='sttudiengang'),
    'berufserfahrung': fields.String(attribute='id', description='id'),
})


@api.route('/profil')
class Profilerstellen(Resource):
    @api.marshal_with(profil)
    @api.expect(profil)
    def post(self):
        adm = Businesslogik()
        proposal = Studentprofil.from_dict(api.payload)

        if proposal is not None:

            c = adm.create_studentprofil(
                proposal.get_id(), proposal.get_name(),
                proposal.get_vorname(), proposal.get_alter(),
                proposal.get_semester(), proposal.get_studiengang(),
                proposal.get_hobbies(), proposal.get_vorlieben(),
                proposal.get_interessen(), proposal.get_persönlichkeit(),
                proposal.get_lerntyp(), proposal.get_lernzeitraum(),
                proposal.get_lernort(), proposal.get_lernfrequenz(),
                proposal.get_vorkenntnisse(), proposal.get_berufserfahrung()
            )
            return c, 200
        else:
            return '', 500


if __name__ == '__main__':
    app.run(debug=True)
