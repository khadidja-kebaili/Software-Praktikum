from flask import Flask
from flask_restx import Resource, Api

app = Flask(__name__)
api = Api(app)

userprofil = api.inherit('Userprofil', bo, {
    'semester': fields.String(attribute='_semester', description='Semester'),
    'id': fields.String(attribute='_id', description='id')
})


@api.route('/profil')
class Profilerstellen(Resource):
    @api.marshal_with(customer)
    @api.expect(customer)
    def post(self):
        adm = Businesslogik()
        proposal = userprofil.from_dict(api.payload)
        c = adm.create_userprofil(
            proposal.get_first_name(), proposal.get_last_name())
        return c


if __name__ == '__main__':
    app.run(debug=True)
