class Participant(object):

    def __init__(self, item=None, learntype_weight=1, learnfreq_weight=1, learnplace_weight=1, semester_weight=1,
                 fakultaet_weight=1, **kwargs):

        if item == None:
            item = {}

        self.matches = {}

        self.type = item.get('type', kwargs.get('type'))
        self.id = item.get('id', kwargs.get('id'))

        details = item.get('details', {})
        self.learnfreq_ids = set(details.get('learnfreq_ids', kwargs.get('learnfreq_ids')))
        self.learntype_ids = set(details.get('learntype_ids', kwargs.get('learntype_ids')))
        self.learnplace_id = set(details.get("learnplace_id", kwargs.get("learnplace_id")))
        self.semester_id = set(details.get("semester_id", kwargs.get("semester_id")))
        self.fakultaet = set(details.get("fakultaet", kwargs.get("fakultaet")))

        self.learntype_weight = learntype_weight
        self.learnfreq_weight = learnfreq_weight
        self.learnplace_weight = learnplace_weight
        self.fakultaet_weight = fakultaet_weight
        self.semester_weight = semester_weight

    def set_learntype_weight(self, num):
        self.learntype_weight = num

    def set_leanfreq_weight(self, num):
        self.learnfreq_weight = num

    def set_learnyplace_weight(self, num):
        self.learnplace_weight = num

    def set_fakultaet_weight(self, num):
        self.fakultaet_weight = num

    def set_semester_weight(self, num):
        self.semester_weight = num

    def __str__(self):
        return "[id=%s learnfreq_ids=%s learntype_ids=%s learnplace_id=%s semester_id=%s fakultaet=%s]" % (
            self.id, self.learnfreq_ids, self.learntype_ids, self.learnplace_id, self.semester_id,
            self.fakultaet)

    def match(self, possible_matches):

        for possible_match in possible_matches:
            self.matches[possible_match] = self.weigh_match(possible_match)

    def sort_matches(self):

        return sorted(self.matches, key=self.matches.get, reverse=True)


    def print_matches(self):

        print("")
        print("Hier sind die Matches für den Studenten mit der ID: " + self.id)
        print(self)
        for match in self.sort_matches():
            print("\t%s: %s" % (self.weigh_match(match), match))


    def weigh_match(self, match):
        return self.score_weighing(match)

    def score_weighing(self, match):

        matches = []
        misses = []

        for element in self.id:
            if self.semester_id == match.semester_id or self.fakultaet == match.fakultaet or \
                    self.learnfreq_ids == match.learnfreq_ids or self.learnplace_id == match.learnplace_id \
                    or self.learntype_ids == match.learntype_ids and self.id != match.id:
                matches.append(element)
            elif self.id != match.id:
                continue
            else:
                misses.append(element)
        if len(matches) > len(misses):
            match_score = len(matches) - len(misses)
            return match_score * self.semester_weight * self.fakultaet_weight * self.learnfreq_weight \
                   * self.learnplace_weight * self.learntype_weight
        else:
            return 0