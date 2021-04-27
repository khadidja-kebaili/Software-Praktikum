from matchmaking_V.loader import load_file
from matchmaking_V.Matchmaker import Matcher


def main():
    """
    Main entry point for the application.
    """

    data = load_file("sample_data2.json")

    matcher = Matcher(data)


    # for fragender in matcher.get_matches():
    #     fragender.print_matches()

    for fragender in matcher.get_matches_of_id(5):
        fragender.print_matches()



if __name__ == "__main__":
    main()

