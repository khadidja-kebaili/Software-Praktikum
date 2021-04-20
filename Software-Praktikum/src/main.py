from flask import Flask
from flask_restx import Resource, Api, fields
from server.Businesslogik import Businesslogik
from server.bo.ProfilBO import Studentprofil
from flask_cors import CORS


app = Flask(__name__)

CORS(app, resources=r'/*')

api = Api(app)

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='id', description='Der Unique Identifier eines Business Object'),
})

profil = api.inherit('Profil', bo, {
    'name': fields.String(attribute='name', description='name'),
    'vorname': fields.String(attribute='vorname', description='vorname'),
    'alter': fields.Integer(attribute='alter', description='alter'),
    'semester': fields.Integer(attribute='semester', description='semester'),
    'studiengang': fields.String(attribute='studiengang', description='studiengang'),
    'hobbies': fields.String(attribute='hobbies', description='hobbies'),
    'interessen': fields.String(attribute='interessen', description='interessen'),
    'persönlichkeit': fields.Integer(attribute='persönlichkeit', description='persönlichkeit'),
    'lerntyp': fields.String(attribute='lerntyp', description='lerntyp'),
    'lernzeitraum': fields.String(attribute='lernzeitraum', description='lernzeitraum'),
    'lernort': fields.String(attribute='lernort', description='lernort'),
    'lernfrequenz': fields.Integer(attribute='lernfrequenz', description='lernfrequenz'),
    'berufserfahrung': fields.String(attribute='berufserfahrung', description='berufserfahrung'),
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
                proposal.get_name(),
                proposal.get_vorname(), proposal.get_alter(),
                proposal.get_semester(), proposal.get_studiengang(),
                proposal.get_hobbies(), proposal.get_interessen(),
                proposal.get_persönlichkeit(), proposal.get_lerntyp(),
                proposal.get_lernzeitraum(), proposal.get_lernort(),
                proposal.get_lernfrequenz(),
                proposal.get_berufserfahrung()
            )
            return c


if __name__ == '__main__':
    app.run(debug=True)
