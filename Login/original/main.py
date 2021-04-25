from matchmaking.original.loader import load_file
from matchmaking.original.Matchmaker import Matcher


def main():
    """
    Main entry point for the application.
    """

    data = load_file("sample_data2.json")

    matcher = Matcher(data)

    for seller in matcher.get_matches():
        seller.print_matches()


if __name__ == "__main__":
    main()

