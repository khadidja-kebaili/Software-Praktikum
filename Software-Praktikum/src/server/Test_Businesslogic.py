
# from src.server.db.Test_ProfileMapper import StudentprofilMapper
from server.db.Test_ProfileMapper import StudentprofilMapper
from server.bo.Test_Profil import Studentprofil


class Businesslogik (object):

    def __init__(self):
        pass


    def create_profil(self, name, vorname, alter, semester, studiengang, hobbies, interessen,
                      persönlichkeit, lerntyp, lernzeitraum, lernort, lernfrequenz, berufserfahrung, email, passwort):
        studentprofil = Studentprofil()
        studentprofil.set_name(name)
        studentprofil.set_vorname(vorname)
        studentprofil.set_alter(alter)
        studentprofil.set_semester(semester)
        studentprofil.set_studiengang(studiengang)
        studentprofil.set_hobbies(hobbies)
        studentprofil.set_interessen(interessen)
        studentprofil.set_persönlichkeit(persönlichkeit)
        studentprofil.set_lerntyp(lerntyp)
        studentprofil.set_lernzeitraum(lernzeitraum)
        studentprofil.set_lernort(lernort)
        studentprofil.set_lernfrequenz(lernfrequenz)
        studentprofil.set_berufserfahrung(berufserfahrung)
        studentprofil.set_email(email)
        studentprofil.set_passwort(passwort)

        with StudentprofilMapper() as mapper:
            return mapper.insert(studentprofil)

    def get_profil_by_id(self, number):
        with StudentprofilMapper() as mapper:
            return mapper.find_by_key(number)

    def save_profil(self, studentprofil):
        with StudentprofilMapper() as mapper:
            mapper.update(studentprofil)

    def delete_profil(self, studentprofil):
        with StudentprofilMapper() as mapper:
            mapper.delete(studentprofil)

    def get_all_profiles(self):
        """Alle Benutzer auslesen."""
        with StudentprofilMapper() as mapper:
            return mapper.find_all()

#####################################################################
    def set_score(self, profile1, profile2):
        newList = 0
        no_match = 0
        list1 = [self.get_learning_habbits(profile2)]
        list2 = [self.get_learning_habbits(profile1)]
        for element in list1:
                if element in list2:
                    newList += 1
                elif element not in list2:
                    no_match += 1
        score = newList - no_match
        return score

    def get_learning_habbits(self, id):
        profile = self.get_profil_by_id(id)
        learning_habbits = [profile.get_lernzeitraum(), profile.get_semester(), profile.get_lernort(), profile.get_lerntyp(),
                profile.get_hobbies(), profile.get_studiengang(), profile.get_lernfrequenz()]
        return learning_habbits


    # def print_set_score(self, student1, student2):
    #     print("")
    #     print("Hier sind die Matches für den Studenten mit der ID: ", int(student1))
    #     # print(self)
    #     print("\t%s: %s" % (self.set_score(student1, student2), self.get_profil_by_id(student2)))

    # def into_list(self, profile1):
    #     length = len(self.get_all_profiles())
    #     list = []
    #     for element in range(1, length + 1):
    #         self.print_matches_for_id(profile1, element)


    def into_list(self, id):
        list = []
        profiles = []
        for element in range(1,9):
            list.append(self.set_score(element, id))
        for element in self.get_all_profiles():
            profiles.append(element)
        dic = dict(zip(profiles, list))
        matches = sorted(dic.items(), key=lambda x: x[1], reverse=True)
        return matches


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

# BL = Businesslogik()
# match = BL.into_list(2)
# print(BL.set_score(3,4))
# print(match)