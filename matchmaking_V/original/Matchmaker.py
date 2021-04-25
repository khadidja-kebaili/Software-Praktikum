from matchmaking.original.Participant import Participant


class Matcher(object):
    """
    Base class for matching participants to each other.

    `get_matches` can be overridden to easily provide different logic for
    ranking matches.

    By default, gefragte are ranked by the total number of commonalities they
    share with the fragender, given that they share at least one geography_id and
    industry_id.
    """

    fragende = set()
    gefragte = set()

    def __init__(self, data):
        self._validate_data(data)
        self._parse_participants()

    def _validate_data(self, data):
        # TODO: Check the format of the data. For now we just check there is
        # something there.
        assert data
        self.data = data

    def _parse_participants(self):

        for item in self.data:

            if item.get('type') == 'fragender':
                self.fragende.add(Participant(item))

            elif item.get('type') == 'gefragter':
                self.gefragte.add(Participant(item))

    def get_matches(self):
        for fragender in self.fragende:
            fragender.match(self.gefragte)

        return self.fragende


class SellerToBuyerIndustryMatcher(Matcher):
    """
    Matches fragende to gefragte, focusing on industry-based matches.

    gefragte are ranked by the total number of common industries they share with
    the fragender, given that they share at least one geography_id and industry_id.

    The gefragter with the best domain knowledge of the company being sold has the
    best chance of successfully moving forward with the company.
    """

    def get_matches(self):
        for fragender in self.fragende:
            fragender.match(self.gefragte, geography_weight=0, industry_weight=1)

        return self.fragende


class SellerToBuyerGeographyMatcher(Matcher):
    """
    Matches fragende to gefragte, focusing on geography-based matches.

    gefragte are ranked by the total number of common geography ids they share
    with the fragender, given that they share at least one geography_id and industry_id.

    The gefragter with the best local knowledge of the company being sold has the
    best chance of successfully moving forward with the company.
    """

    def get_matches(self):
        for fragender in self.fragende:
            fragender.match(self.gefragte, geography_weight=1, industry_weight=0)

        return self.fragende