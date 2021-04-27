class Participant(object):

    def __init__(self, item=None, learntype_weight=1, learnfreq_weight=1, learnplace_weight=1, semester_weight=1,
                 fakultaet_weight=1, **kwargs):

        if item == None:
            item = {}

        self.matches = {}

        self.type = item.get('type', kwargs.get('type'))
        self.id = [item.get('id', kwargs.get('id'))]

        details = item.get('details', {})
        self.learnfreq_ids = [details.get("learnfreq_ids", kwargs.get("learnfreq_ids"))]
        self.learntype_ids = [details.get('learntype_ids', kwargs.get('learntype_ids'))]
        self.learnplace_id = [details.get("learnplace_id", kwargs.get("learnplace_id"))]
        self.semester_id = [details.get("semester_id", kwargs.get("semester_id"))]
        self.fakultaet = [details.get("fakultaet", kwargs.get("fakultaet"))]

        self.learntype_weight = learntype_weight
        self.learnfreq_weight = learnfreq_weight
        self.learnplace_weight = learnplace_weight
        self.fakultaet_weight = fakultaet_weight
        self.semester_weight = semester_weight

    def __str__(self):
        return "[id=%s learnfreq_ids=%s learntype_ids=%s learnplace_id=%s semester_id=%s fakultaet=%s]" % (
            self.id, self.learnfreq_ids, self.learntype_ids, self.learnplace_id, self.semester_id,
            self.fakultaet)

    def match(self, possible_matches):
        match_list = []
        for element in possible_matches:
            self.matches[element] = self.get_score(element)
            match_list.append(element)

        # print(type(match_list))
        return match_list

    def sort_matches(self):

        return sorted(self.matches, key=self.matches.get, reverse=True)


    def print_matches(self):

        print("")
        print("Hier sind die Matches für den Studenten mit der ID: " + self.id[0])
        # print(self)
        for match in self.sort_matches():
                print("\t%s: %s" % (self.get_score(match), match))


    def print_match(self, id):

        print("")
        print("Hier sind die Matches für den Studenten mit der ID: " + self.id[id])
        # print(self.id)
        for match in self.sort_matches():
            print("\t%s: %s" % (self.get_score(match), match))



    def get_score(self, match):
        return self.set_score(match)


    def set_score(self, match):

        matches = []
        misses = []

        for element in self.id:
            if self.semester_id == match.semester_id or self.fakultaet == match.fakultaet or \
                    self.learnfreq_ids == match.learnfreq_ids or self.learnplace_id == match.learnplace_id \
                    or self.learntype_ids == match.learntype_ids and self.id[0] != match.id:
                matches.append(element)
            elif self.id[0] == match.id:
                continue
            else:
                misses.append(element)
        if len(matches) > len(misses):
            match_score = len(matches) - len(misses)
            return match_score * self.semester_weight * self.fakultaet_weight * self.learnfreq_weight \
                   * self.learnplace_weight * self.learntype_weight
        else:
            return 0
