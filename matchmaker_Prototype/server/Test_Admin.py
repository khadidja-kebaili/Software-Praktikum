from matchmaker_Prototype.server.BO.Profil import Studentprofil

from matchmaker_Prototype.server.db.ProfileMapper import StudentprofilMapper


class Businesslogik (object):

    def __init__(self):
        pass

    learntype_weight = 0
    learnfreq_weight = 0
    learnplace_weight = 0
    fakultaet_weight = 0
    semester_weight = 0

    fragende = []
    gefragte = []
    matches = {}

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
        studentprofil.set_requested_by= None

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


    def set_types(self):
        for element in self.get_all_profiles():
            self.fragende.append(element)
        for element in self.get_all_profiles():
            self.gefragte.append(element)


    def get_matches(self):
        for element in self.fragende:
            element.match(self.gefragte)
        return self.fragende

    # def get_matches_of_id(self, id):
    #     for element in self.fragende:
    #         if int(element.id[0]) == id:
    #             element.match(self.gefragte)
    #     return self.fragende

    # def return_self_fragende(self):
    #     for match in self.fragende:
    #         print(match)

    def match(self, possible_matches):
        match_list = []
        for element in possible_matches:
            self.matches[element] = self.get_score(element)
            match_list.append(element)
        return match_list

    def sort_matches(self):
        return sorted(self.matches, key=self.matches.get, reverse=True)

    def print_matches(self):

        print("")
        for student in self.get_all_profiles():
            # print("Hier sind die Matches für den Studenten mit der ID: " + self.get_profil_by_id(student))
            print(student)
        for match in self.sort_matches():
                print("\t%s: %s" % (self.get_score(match), match))

    # def print_match(self, id):
    #
    #     print("")
    #     print("Hier sind die Matches für den Studenten mit der ID: " + self.get_profil_by_id(int(id)))
    #     # print(self.id)
    #     for match in self.sort_matches():
    #         print("\t%s: %s" % (self.get_score(match), match))

    def get_score(self, match):
        return self.set_score(match)

    def set_score(self):

        matches = []
        misses = []
        get_all = self.get_all_profiles()
        match = Studentprofil()

        for element in get_all:
            if element.get_lernzeitraum() == match.get_lernzeitraum():
                self.learnfreq_weight += 1

            if element.get_studiengang() == match.get_studiengang():
                self.semester_weight += 1

            if  element.get_lernort == match.get_lernort():
                self.learnplace_weight += 1

            if element.get_lerntyp() == match.get_lerntyp():
                self.learntype_weight += 1

            if element.get_semester() == match.get_semester():
                self.semester_weight += 1

            score = self.learntype_weight + self.learnfreq_weight + self.learnplace_weight + self.semester_weight

            if score != 0 and element.get_id[0] != match.get_id:
                matches.append(element)

            elif element.get_id() == match.get_id:
                continue
            else:
                misses.append(element)
        if len(matches) > len(misses):
            match_score = len(matches) - len(misses)
            return match_score + self.semester_weight + self.fakultaet_weight + self.learnfreq_weight \
                   + self.learnplace_weight + self.learntype_weight
        else:
            return 0

