from matchmaking.original.loader import load_file
from matchmaking.original.Matchmaker import Matcher
from matchmaking.original.Matchmaker import SellerToBuyerGeographyMatcher
from matchmaking.original.Matchmaker import SellerToBuyerIndustryMatcher

import pytest


@pytest.fixture
def data():
    return load_file("./data/sample_data.json")


class TestMatcher(object):

    def test_default_matcher(self, data):

        matcher = Matcher(data)

        for seller in matcher.get_matches():
            weight = -1
            for match in seller.sort_matches():
                match_weight = seller.weigh_match(match)
                if weight == -1:
                    weight = match_weight
                else:
                    assert match_weight <= weight
                    weight = match_weight

    def test_geography_matcher(self, data):

        matcher = SellerToBuyerGeographyMatcher(data)

        for seller in matcher.get_matches():
            weight = -1
            for match in seller.sort_matches():
                match_weight = seller.weigh_match(match)
                if weight == -1:
                    weight = match_weight
                else:
                    assert match_weight <= weight
                    weight = match_weight

    def test_industry_matcher(self, data):

        matcher = SellerToBuyerIndustryMatcher(data)

        for seller in matcher.get_matches():
            weight = -1
            for match in seller.sort_matches():
                match_weight = seller.weigh_match(match)
                if weight == -1:
                    weight = match_weight
                else:
                    assert match_weight <= weight
                    weight = match_weight