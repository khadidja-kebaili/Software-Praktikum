from .bo.ProfileBO import Studentprofile
from .bo.UserBO import User
from .db.Profilemapper import StudentprofileMapper
from .db.UserMapper import UserMapper


class Businesslogic (object):

    def __init__(self):
        pass

    def create_user(self, name, user_id, email):
        user = User()
        user.set_name(name)
        user.set_user_id(user_id)
        user.set_email(email)
        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_user_by_google_user_id(self, id):
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def create_profile(self, first_name, last_name, age, semester, major, hobbys, interests,
                       personality, learnstyle, studytime, studyplace, studyfrequence, workexperience):
        studentprofile = Studentprofile()
        studentprofile.set_first_name(first_name)
        studentprofile.set_last_name(last_name)
        studentprofile.set_age(age)
        studentprofile.set_semester(semester)
        studentprofile.set_major(major)
        studentprofile.set_hobbys(hobbys)
        studentprofile.set_interests(interests)
        studentprofile.set_personality(personality)
        studentprofile.set_learnstyle(learnstyle)
        studentprofile.set_studytime(studytime)
        studentprofile.set_studyplace(studyplace),
        studentprofile.set_studyfrequence(studyfrequence)
        studentprofile.set_workexperience(workexperience)

        with StudentprofileMapper() as mapper:
            return mapper.insert(studentprofile)

    def get_profile_by_id(self, number):

        with StudentprofileMapper() as mapper:
            return mapper.find_by_key(number)

    def get_all_profiles(self):
        with StudentprofileMapper() as mapper:
            return mapper.find_all()

    def save_profile(self, studentprofile):
        with StudentprofileMapper() as mapper:
            mapper.update(studentprofile)

    def delete_profile(self, studentprofile):
        with StudentprofileMapper() as mapper:
            mapper.delete(studentprofile)

    def get_matches(self):
        matches = [
            {
                "first_name": "string",
                "last_name": "string",
                "age": 0,
                "semester": 0,
                "major": "string",
                "hobbys": "string",
                "interests": "string",
                "personality": "0",
                "learnstyle": "string",
                "studytime": "string",
                "studyplace": "string",
                "studyfrequence": 0,
                "workexperience": "string",
                "id": 1
            },
            {
                "first_name": "Gomez",
                "last_name": "Mario",
                "age": 22,
                "semester": 1,
                "major": "WI7",
                "hobbys": "kayak fahren",
                "interests": "sport",
                "personality": "4",
                "learnstyle": "kommunikativ",
                "studytime": "abends",
                "studyplace": "Universität",
                "studyfrequence": 1,
                "workexperience": "Ausbildung",
                "id": 2
            },
            {
                "first_name": "string",
                "last_name": "UPDATE",
                "age": 0,
                "semester": 0,
                "major": "string",
                "hobbys": "string",
                "interests": "string",
                "personality": "0",
                "learnstyle": "string",
                "studytime": "string",
                "studyplace": "string",
                "studyfrequence": 0,
                "workexperience": "string",
                "id": 4
            },
            {
                "first_name": "UPDATE",
                "last_name": "string",
                "age": 0,
                "semester": 0,
                "major": "string",
                "hobbys": "string",
                "interests": "string",
                "personality": "0",
                "learnstyle": "string",
                "studytime": "string",
                "studyplace": "string",
                "studyfrequence": 0,
                "workexperience": "string",
                "id": 5
            },
            {
                "first_name": "MEROS",
                "last_name": "TOM",
                "age": 55,
                "semester": 4,
                "major": "WI7",
                "hobbys": "string",
                "interests": "string",
                "personality": "0",
                "learnstyle": "string",
                "studytime": "string",
                "studyplace": "string",
                "studyfrequence": 0,
                "workexperience": "string",
                "id": 7
            },
            {
                "first_name": "string",
                "last_name": "string",
                "age": 0,
                "semester": 5,
                "major": "ID7",
                "hobbys": "string",
                "interests": "string",
                "personality": "5",
                "learnstyle": "kommunikativ",
                "studytime": "Abends",
                "studyplace": "Universität",
                "studyfrequence": 5,
                "workexperience": "string",
                "id": 8
            }
        ]
        return matches
